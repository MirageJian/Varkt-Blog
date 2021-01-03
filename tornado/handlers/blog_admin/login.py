from handlers.base import BaseHandler


class LoginHandler(BaseHandler):
    async def get(self):
        # Request the _xsrf cookies interface.
        if self.xsrf_token:
            # Check user logged or not
            if self.get_current_user():
                # Get user information
                self.db.cursor.execute("SELECT * FROM user WHERE id=%s", self.get_secure_cookie("_user"))
                user = self.db.cursor.fetchone()
                if user:
                    self.write_json({'username': user["username"]})
                else:
                    self.send_error(400, reason='User does not exist')
            else:
                self.send_error(200, reason="No logged in user")
        else:
            self.send_error(200, reason="No xsrf token, request denied")

    async def post(self):
        body = self.loads_request_body()
        self.db.cursor.execute("SELECT * FROM user WHERE username = %s OR email = %s", (
            body["account"], body["account"]))
        user = self.db.cursor.fetchone()
        if not user:
            self.send_error(404, reason='User not found')
            return
        # hashed_password = yield executor.submit(
        #     bcrypt.hashpw, tornado.escape.utf8(self.get_argument("password")),
        #     tornado.escape.utf8(author.hashed_password))
        if str(body["password"]) == str(user["password"]):
            # Set_secure_cookie, which cannot be get by browser
            self.set_secure_cookie("_user", str(user["id"]), 3, httponly=True, secure=False)
            self.write_json({'username': user["username"]})
            # self.redirect(self.get_argument("next", "/"))
        else:
            self.send_error(400, reason='Incorrect password')

    async def delete(self):
        self.clear_cookie("_user")
