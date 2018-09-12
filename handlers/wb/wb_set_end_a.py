from handlers.base import BaseHandler


class SetEndAHandler(BaseHandler):
    def post(self, *args, **kwargs):
        self.get_login_user()
        id_activity = self.get_argument("id")
        body = self.json_decode(self.request.body)
        self.db.cursor.execute("UPDATE wb_activity SET time_end=%s,interruption=%s,net_time=%s WHERE id=%s", (
            body["time_end"], body["interruption"], body["net_time"], id_activity))
        self.db.conn.commit()
        self.write_res(0, "post success", None)
