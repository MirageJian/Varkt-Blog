import json
from typing import Any, Optional, List

import tornado.web
from sqlalchemy.orm import Session

from database import SessionWithEngine, BaseColumn
from tools.json_encoder import create_alchemy_encoder


class BaseHandler(tornado.web.RequestHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self.user_id = None
        # Database initialization
        self.session: Session = SessionWithEngine()

    # When data received, it will be called before PUT and POST
    def data_received(self, chunk):
        pass

    # The connection start
    def prepare(self):
        pass

    def set_default_headers(self) -> None:
        self.set_header("Content-Type", "application/json")

    def on_finish(self):
        # Close cursor and connection of db
        if self.session:
            self.session.close()

    # Override write_error with customization one. Use send_error to set error status and write error.
    def write_error(self, status_code: int, **kwargs: Any) -> None:
        self.finish("%(code)d: %(message)s" % {"code": status_code, "message": self._reason})
        raise tornado.web.Finish

    def write_json(self, data, expanded_fields: List[BaseColumn] = None):
        self.write(json.dumps(data, cls=create_alchemy_encoder(expanded_fields)))

    def loads_request_body(self):
        return json.loads(s=self.request.body)

    # If in the development, may need this function. For server side render
    # def set_default_headers(self):
    #     self.set_header("Access-Control-Allow-Origin", "http://localhost:4200")
    #     self.set_header("Access-Control-Allow-Headers", "x-requested-with")
    #     self.set_header('Access-Control-Allow-Methods', 'GET, OPTIONS')

    def get_current_user(self) -> Optional[int]:
        return self.get_secure_cookie("_user", None)


def auth_user(func):
    def wrapper(self: BaseHandler):
        # if no login send 403, else return id
        id_user = self.get_current_user()
        if not id_user:
            self.write_error(403)
            self.user_id = None
        else:
            self.user_id = id_user
        return func(self)
    return wrapper
