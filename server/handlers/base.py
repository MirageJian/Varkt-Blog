import tornado.web
from database import DataBase
from tools import json_helper


class BaseHandler(tornado.web.RequestHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self.db: DataBase = DataBase()

    # When data received, it will be called before PUT and POST
    def data_received(self, chunk):
        pass

    # The connection start
    def prepare(self):
        pass

    def on_finish(self):
        self.db.cursor.close()
        self.db.conn.close()

    # to json data
    @staticmethod
    def json_encode(data):
        return json_helper.dumps(data)

    # to normal data
    @staticmethod
    def json_decode(params):
        return json_helper.loads(params)

    # standard response. success 0, fail other number.
    def write_res(self, code, info=None, data=None):
        data = {
            "errcode": code, "errmsg": info, "data": data
        }
        json = json_helper.dumps(data)
        self.write(json)
        return json

    # if in the development, you need this function.
    # def set_default_headers(self):
    #     self.set_header("Access-Control-Allow-Origin", "*")
    #     self.set_header("Access-Control-Allow-Headers", "x-requested-with")
    #     self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def get_current_user(self):
        return self.get_secure_cookie("admin_user", None)

    # if no login send 403, else return id
    def get_login_user(self):
        id_user = self.get_current_user()
        if not id_user:
            return self.send_error(403)
        else:
            return id_user
