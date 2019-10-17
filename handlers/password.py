from handlers.base import BaseHandler


class PsswordHandler(BaseHandler):

    def put(self, *args, **kwargs):
        user_id = self.get_login_user()
        body = self.json_decode(self.request.body)
        self.db.cursor.execute("SELECT * FROM user WHERE id=%s", user_id)
        user = self.db.cursor.fetchone()
        if user and user["password"] == body["oldPassword"]:
            self.db.cursor.execute("UPDATE user SET password=%s WHERE id=%s", (body["newPassword"], user_id))
            self.db.conn.commit()
            self.write_res(1, "password update successfully", None)
        else:
            self.write_res(0, "the user cannot be found or password is wrong", None)
