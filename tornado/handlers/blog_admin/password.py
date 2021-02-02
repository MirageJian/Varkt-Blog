from database import User
from handlers.base import BaseHandler


class PasswordHandler(BaseHandler):
    def prepare(self):
        self.user_id = self.auth_user()

    async def put(self):
        body = self.loads_request_body()
        user = self.session.query(User).filter(User.id == self.user_id).first()
        if user and user.password == body["oldPassword"]:
            user.password = body["newPassword"]
            self.session.commit()
        else:
            self.send_error(400, reason="The user cannot be found or password is wrong")
