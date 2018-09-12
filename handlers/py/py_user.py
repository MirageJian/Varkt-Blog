from handlers.base import BaseHandler
import tools.file_helper


class PyUserHandler(BaseHandler):
    def post(self, *args, **kwargs):
        request = self.json_decode(self.request.body)
        try:
            self.db.cursor.execute("select * from py_code where id=(select max(id) from py_code);")
        except():
            self.write_res("-1", str(Exception), None)
        data = self.db.cursor.fetchone()
        if data["code"] == request["code"]:
            if data["times"] > 0:
                try:
                    data["times"] -= 1
                    self.db.cursor.execute(
                        "UPDATE py_code SET times=%s WHERE id=%s;",(
                            data["times"], data["id"],
                        ))
                    self.db.cursor.execute(
                        "INSERT INTO py_user (imei,phone,py_name,id_py_code) VALUES (%s,%s,%s,%s);", (
                            request["imei"], request["phone"], request["name"], data["id"]
                        ))
                    self.db.conn.commit()
                    self.write_res("0", "注册成功！", None)
                except():
                    self.write_res("-1", str(Exception), None)
            else:
                self.write_res("2", "激活码可用次数已用完", None)
        else:
            self.write_res("1", "激活码无效", None)
            
    # admin get user
    def get(self):
        self.get_login_user()
        self.db.cursor.execute("SELECT * FROM py_user;")
        data = self.db.cursor.fetchall()
        self.write(self.json_encode(data))

    # admin upload apk
    def put(self, *args, **kwargs):
        self.get_login_user()
        file_metas = self.request.files["PoYoungApk"]
        tools.file_helper.write_upload_files(file_metas, "file")
        self.db.cursor.execute("UPDATE py_user SET phone=%s WHERE imei='apk';", '/' + file_metas[0]["filename"])
        self.db.conn.commit()
        self.write_res(0, "put successfully", None)

    # admin delete user
    def delete(self, *args, **kwargs):
        self.get_login_user()
        id_user = self.get_argument("id", None)
        self.db.cursor.execute("DELETE FROM py_user WHERE id=%s;", id_user)
        self.db.conn.commit()
        self.write_res(1, "delete successfully", None)
