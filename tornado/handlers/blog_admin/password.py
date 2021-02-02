from database import User
from handlers.base import BaseHandler


class PasswordHandler(BaseHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self.user_id = None

    def prepare(self):
        self.user_id = self.get_login_user()

    async def put(self):
        body = self.loads_request_body()
        user = self.session.query(User).filter(User.id == self.user_id).first()
        if user and user["password"] == body["oldPassword"]:
            user.password = body["newPassword"]
            self.session.commit()
        else:
            self.send_error(400, reason="The user cannot be found or password is wrong")
