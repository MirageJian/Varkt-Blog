from handlers.comment import CommentHandler
from tools import common_helper


class CommentManagingHandler(CommentHandler):
    def prepare(self):
        super(CommentManagingHandler, self).prepare()
        self.get_login_user()

    def get(self):
        id_article = self.get_argument("id_article", None)
        if not id_article:
            self.db.cursor.execute("SELECT * FROM `comment` WHERE is_check=0")
        else:
            self.db.cursor.execute("SELECT * FROM `comment` WHERE id_article=%s", id_article)
        data = self.db.cursor.fetchall()
        for d in data:
            d["is_check"] = bool(d["is_check"])
        json = self.json_encode(data)
        self.write(json)

    def post(self, *args, **kwargs):
        body = self.json_decode(self.request.body)
        self.db.cursor.execute("UPDATE `comment` SET is_check=TRUE WHERE id=%s", (body["id"]))
        self.db.conn.commit()
        self.write_res(0, "post successfully", None)

    def delete(self, *args, **kwargs):
        id_comment = self.get_argument("id", None)
        self.db.cursor.execute("DELETE FROM `comment` WHERE id=%s", id_comment)
        self.db.conn.commit()
        self.write_res(0, "delete successfully", None)

