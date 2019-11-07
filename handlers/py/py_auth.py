from handlers.base import BaseHandler
import tools.file_helper


class AuthorizationHandler(BaseHandler):
    def get(self):
        imei = self.get_argument("imei", "")
        try:
            self.db.cursor.execute("SELECT * FROM py_user WHERE imei=%s;", imei)
        except():
            print(Exception)
        data = self.db.cursor.fetchone()
        if data is None:
            self.write("")
        else:
            self.write(data["phone"])
