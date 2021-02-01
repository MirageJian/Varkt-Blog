import decimal
import json
from datetime import datetime, date, timedelta
from typing import Any, Optional

import tornado.web
from sqlalchemy.orm import Session

from database import Database, SessionWithEngine


class BaseHandler(tornado.web.RequestHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        # Database initialization
        self.db = Database()
        self.session: Optional[Session] = None

    # When data received, it will be called before PUT and POST
    def data_received(self, chunk):
        pass

    # The connection start
    def prepare(self):
        self.session = SessionWithEngine()

    def set_default_headers(self) -> None:
        self.set_header("Content-Type", "application/json")

    def on_finish(self):
        # Close cursor and connection of db
        self.db.cursor.close()
        self.db.conn.close()
        self.session.close()

    # Override write_error with customization one. Use send_error to set error status and write error.
    def write_error(self, status_code: int, **kwargs: Any) -> None:
        self.finish("%(code)d: %(message)s" % {"code": status_code, "message": self._reason})

    def write_json(self, data):
        self.write(json.dumps(data, cls=CJsonEncoder, ensure_ascii=False))

    def loads_request_body(self):
        return json.loads(s=self.request.body)

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


class CJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        elif isinstance(obj, datetime) or isinstance(obj, date):
            return obj.isoformat()
        elif isinstance(obj, timedelta):
            return str(obj)
        else:
            return json.JSONEncoder.default(self, obj)