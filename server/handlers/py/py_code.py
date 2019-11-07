from handlers.base import BaseHandler
import hashlib
import random
import string


class PyCodeHandler(BaseHandler):
    def prepare(self):
        super(PyCodeHandler, self).prepare()
        self.get_login_user()

    # admin
    def get(self, *args, **kwargs):
        self.db.cursor.execute("SELECT * FROM py_code ORDER BY id DESC;")
        data = self.db.cursor.fetchall()
        self.write(self.json_encode(data))

    def put(self, *args, **kwargs):
        body = self.json_decode(self.request.body)
        random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
        code = hashlib.md5(random_string.encode('utf-8')).hexdigest()
        self.db.cursor.execute('INSERT INTO py_code(`code`, times) VALUES (%s,%s);', (code, body["times"]))
        self.db.conn.commit()
        self.write_res(1, 'Put Successfully', None)

    def delete(self, *args, **kwargs):
        id_code = self.get_argument('id')
        self.db.cursor.execute('DELETE FROM py_code WHERE id=%s;', id_code)
        self.db.conn.commit()
        self.write_res(1, 'Delete Successfully', None)
