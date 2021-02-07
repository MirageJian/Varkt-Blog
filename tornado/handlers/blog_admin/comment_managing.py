from database import Comment
from handlers.base import auth_user
from handlers.comment import CommentHandler


class CommentManagingHandler(CommentHandler):
    @auth_user
    def prepare(self):
        super(CommentManagingHandler, self).prepare()

    async def get(self):
        data = self.session.query(Comment)\
            .filter(Comment.isChecked == 0)\
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
