from handlers.base import BaseHandler


class PasswordHandler(BaseHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self.user_id = None

    def prepare(self):
        self.user_id = self.get_login_user()

    async def put(self):
        body = self.loads_request_body()
        self.db.cursor.execute("SELECT * FROM user WHERE id=%s", self.user_id)
        user = self.db.cursor.fetchone()
        if user and user["password"] == body["oldPassword"]:
            self.db.cursor.execute("UPDATE user SET password=%s WHERE id=%s", (body["newPassword"], self.user_id))
            self.db.conn.commit()
        else:
            self.send_error(400, reason="The user cannot be found or password is wrong")
