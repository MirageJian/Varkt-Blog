from handlers.comment import CommentHandler


class CommentManagingHandler(CommentHandler):
    def prepare(self):
        super(CommentManagingHandler, self).prepare()
        self.get_login_user()

    async def get(self):
        id_article = self.get_argument("id_article", None)
        if not id_article:
            self.db.cursor.execute("SELECT * FROM `comment` WHERE is_check=0")
        else:
            self.db.cursor.execute("SELECT * FROM `comment` WHERE id_article=%s", id_article)
        data = self.db.cursor.fetchall()
        for d in data:
            d["is_check"] = bool(d["is_check"])
        self.write_json(data)

    async def post(self, *args, **kwargs):
        body = self.loads_request_body()
        self.db.cursor.execute("UPDATE `comment` SET is_check=TRUE WHERE id=%s", (body["id"]))
        self.db.conn.commit()

    async def delete(self, *args, **kwargs):
        id_comment = self.get_argument("id", None)
        self.db.cursor.execute("DELETE FROM `comment` WHERE id=%s", id_comment)
        self.db.conn.commit()

