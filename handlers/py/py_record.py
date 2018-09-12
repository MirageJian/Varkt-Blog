from handlers.base import BaseHandler
import time


class PyRecordHandler(BaseHandler):
    def post(self, *args, **kwargs):
        self.check_xsrf_cookie()
        imei = self.get_argument("imei")
        ip = self.get_argument("ip")
        if ip == "":
            return
        self.db.cursor.execute("SELECT * FROM py_user WHERE imei=%s;", imei)
        py_user = self.db.cursor.fetchone()
        if not py_user:
            return
        self.db.cursor.execute(
            "INSERT INTO py_records(id_py_user, ip, time_log, remark) VALUES (%s,%s,%s,%s);", (
                py_user["id"], ip, time.strftime('%Y-%m-%d %H:%M:%S'), None))
        self.db.conn.commit()

    def check_xsrf_cookie(self):
        pass
    
    # admin get record
    def get(self, *args, **kwargs):
        self.get_login_user()
        self.db.cursor.execute(
            "SELECT r.id,r.ip,r.time_log,u.py_name,u.phone,r.remark "
            "FROM py_records r JOIN py_user u on r.id_py_user = u.id ORDER BY r.id;")
        data = self.db.cursor.fetchall()
        self.write(self.json_encode(data))

    # admin kick out
    def delete(self, *args, **kwargs):
        self.get_login_user()
        id_record = self.get_argument('id')
        self.db.cursor.execute("DELETE FROM py_records WHERE id=%s;", id_record)
        self.db.conn.commit()
        self.write_res(1, 'delete successfully', None)
