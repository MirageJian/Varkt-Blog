from handlers.base import BaseHandler


class LoginHandler(BaseHandler):
    def get(self, *args, **kwargs):
        if not self.get_current_user():
            self.write_res(403, "Forbidden", False)
        else:
            self.db.cursor.execute("SELECT * FROM user WHERE id=%s",
                                   self.get_secure_cookie("admin_user"))
            user = self.db.cursor.fetchone()
            self.write_res(0, "Success", user["username"])

    def post(self):
        self.set_header("Content-Type", "text/plain")
        body = self.json_decode(self.request.body)
        self.db.cursor.execute("SELECT * FROM user WHERE username = %s || email = %s", (
            body["account"], body["account"]))
        user = self.db.cursor.fetchone()
        if not user:
            self.write_res(2, "user not found", None)
            return
        # hashed_password = yield executor.submit(
        #     bcrypt.hashpw, tornado.escape.utf8(self.get_argument("password")),
        #     tornado.escape.utf8(author.hashed_password))
        if str(body["password"]) == str(user["password"]):
            # set_secure_cookie
            self.set_secure_cookie("admin_user", str(user["id"]), 3, httponly=True, secure=False)
            self.write_res(0, "Hello " + user["username"], user["username"])
            # self.redirect(self.get_argument("next", "/"))
        else:
            self.write_res(1, "incorrect password", None)

    def delete(self):
        self.clear_cookie("admin_user")
