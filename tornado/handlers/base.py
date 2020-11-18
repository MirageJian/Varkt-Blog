import json
from typing import Any

import tornado.web
from database import Database
from tools import json_helper
from tools.json_helper import CJsonEncoder


class BaseHandler(tornado.web.RequestHandler):
    # Database initialization
    db: Database = Database()

    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)

    # When data received, it will be called before PUT and POST
    def data_received(self, chunk):
        pass

    # The connection start
    def prepare(self):
        pass

    def set_default_headers(self) -> None:
        self.set_header("Content-Type", "application/json")

    def on_finish(self):
        pass

    # Override write_error with customization one. Use send_error to set error status and write error.
    def write_error(self, status_code: int, **kwargs: Any) -> None:
        self.finish("%(code)d: %(message)s" % {"code": status_code, "message": self._reason})

    def write_json(self, data):
        self.write(json.dumps(data, cls=CJsonEncoder, ensure_ascii=False))

    # Standard response. success 0, fail other number.
    async def write_res(self, code, info=None, data=None):
        data = {"code": code, "message": info, "data": data}
        json_data = json_helper.dumps(data)
        # Unacceptable situation
        if code < 0:
            self.set_status(500, info)
        self.write(json_data)
        return json_data

    # If in the development, may need this function. For server side render
    # def set_default_headers(self):
    #     self.set_header("Access-Control-Allow-Origin", "http://localhost:4200")
    #     self.set_header("Access-Control-Allow-Headers", "x-requested-with")
    #     self.set_header('Access-Control-Allow-Methods', 'GET, OPTIONS')

    def get_current_user(self):
        return self.get_secure_cookie("_user", None)

    # if no login send 403, else return id
    def get_login_user(self):
        id_user = self.get_current_user()
        if not id_user:
            return self.send_error(403)
        else:
            return id_user
