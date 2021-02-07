from database import User
from handlers.base import BaseHandler, auth_user


class PasswordHandler(BaseHandler):
    @auth_user
    def prepare(self):
        pass

    async def put(self):
        body = self.loads_request_body()
        user = self.session.query(User).filter(User.id == self.user_id).first()
        if user and user.password == body["oldPassword"]:
            user.password = body["newPassword"]
            self.session.commit()
        else:
            self.send_error(400, reason="The user cannot be found or password is wrong")
