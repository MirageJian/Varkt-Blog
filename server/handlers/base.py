import tornado.web
from database import Database
from tools import json_helper


class BaseHandler(tornado.web.RequestHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self.db: Database = Database()

    # When data received, it will be called before PUT and POST
    def data_received(self, chunk):
        pass

    # The connection start
    def prepare(self):
        self.set_header("Content-Type", "application/json")

    def on_finish(self):
        self.db.cursor.close()
        self.db.conn.close()

    # Standard response. success 0, fail other number.
    async def write_res(self, code, info=None, data=None):
        data = {"code": code, "message": info, "data": data}
        json = json_helper.dumps(data)
        # Unacceptable situation
        if code < 0:
            self.set_status(500, info)
        self.write(json)
        return json

    # If in the development, may need this function. For server side render
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "http://localhost:4200")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'GET, OPTIONS')

    def get_current_user(self):
        return self.get_secure_cookie("_user", None)

    # if no login send 403, else return id
    def get_login_user(self):
        id_user = self.get_current_user()
        if not id_user:
            return self.send_error(403)
        else:
            return id_user
