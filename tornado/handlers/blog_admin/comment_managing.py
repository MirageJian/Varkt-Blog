from database import Comment
from handlers.comment import CommentHandler


class CommentManagingHandler(CommentHandler):
    def prepare(self):
        super(CommentManagingHandler, self).prepare()
        self.get_login_user()

    async def get(self):
        id_article = self.get_argument("id_article", None)
        data = self.session.query(Comment)\
            .filter(not Comment.isChecked if not id_article else Comment.idArticle == id_article)\
            .all()

        self.write_json(data)

    async def put(self, *args, **kwargs):
        body = self.loads_request_body()
        for r in self.session.query(Comment).filter(Comment.id == body["id"]):
            r.isChecked = True
        self.session.commit()

    async def delete(self):
        id_comment = self.get_argument("id", None)
        comment = self.session.query(Comment).filter(Comment.id == id_comment).first()
        self.session.delete(comment)
        self.session.commit()
