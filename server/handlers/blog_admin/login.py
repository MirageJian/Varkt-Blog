from handlers.base import BaseHandler
from tools import json_helper


class LoginHandler(BaseHandler):
    async def get(self, *args, **kwargs):
        if not self.get_current_user():
            await self.write_res(403, "Forbidden", False)
        else:
            self.db.cursor.execute("SELECT * FROM user WHERE id=%s",
                                   self.get_secure_cookie("_user"))
            user = self.db.cursor.fetchone()
            await self.write_res(0, "Success", user["username"])

    async def post(self):
        self.set_header("Content-Type", "text/plain")
        body = json_helper.loads(self.request.body)
        self.db.cursor.execute("SELECT * FROM user WHERE username = %s OR email = %s", (
            body["account"], body["account"]))
        user = self.db.cursor.fetchone()
        if not user:
            await self.write_res(2, "User not found", None)
            return
        # hashed_password = yield executor.submit(
        #     bcrypt.hashpw, tornado.escape.utf8(self.get_argument("password")),
        #     tornado.escape.utf8(author.hashed_password))
        if str(body["password"]) == str(user["password"]):
            # set_secure_cookie
            self.set_secure_cookie("_user", str(user["id"]), 3, httponly=True, secure=False)
            await self.write_res(0, "Hello " + user["username"], user["username"])
            # self.redirect(self.get_argument("next", "/"))
        else:
            await self.write_res(1, "Incorrect password", None)

    async def delete(self):
        self.clear_cookie("_user")
