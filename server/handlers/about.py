import time

from handlers.base import BaseHandler
from tools import common_helper


class AboutHandler(BaseHandler):
    async def get(self):
        self.db.cursor.execute("SELECT * FROM about")
        # time.sleep(10)
        data = self.db.cursor.fetchone()
        json = self.json_encode(data)
        self.write(json)

    async def put(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = self.json_decode(self.request.body)
        self.db.cursor.execute("SELECT * FROM about")
        # time.sleep(10)
        data = self.db.cursor.fetchone()
        if not data:
            self.write_res(0, "There is about info, please restart server", None)
        self.db.cursor.execute(
            "UPDATE about SET content=%s,update_time=%s WHERE id=%s", (
                body["content"], common_helper.get_now(), body["id"]
            ))
        self.db.conn.commit()
        self.write_res(1, "put successfully", None)
