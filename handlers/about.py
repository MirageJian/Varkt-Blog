from handlers.base import BaseHandler
from tools import common_helper


class AboutHandler(BaseHandler):
    def get(self):
        self.db.cursor.execute("SELECT * FROM about")
        data = self.db.cursor.fetchone()
        json = self.json_encode(data)
        self.write(json)

    def put(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = self.json_decode(self.request.body)
        self.db.cursor.execute(
            "UPDATE about SET content=%s,update_time=%s WHERE id=%s AND id_user=%s", (
                body["content"], common_helper.get_now(), body["id"], id_user
            ))
        self.db.conn.commit()
        self.write_res(0, "put successfully", None)
