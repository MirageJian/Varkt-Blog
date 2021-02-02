from datetime import datetime

from database import Comment
from handlers.base import BaseHandler


class CommentHandler(BaseHandler):
    async def get(self):
        id_article = self.get_argument("id_article")
        data = self.session.query(Comment).filter(Comment.idArticle == id_article).all()
        self.write_json(data)

    async def put(self, *args, **kwargs):
        body = self.loads_request_body()
        comment = self.session.query(Comment).filter(Comment.id == body["id"]).first()
        if body["likes"] > comment.likes:
            comment.likes = comment.likes + 1
        self.session.commit()

    async def post(self, *args, **kwargs):
        body = self.loads_request_body()
        self.session.add(Comment(idArticle=body["id_article"], content=body["content"], author=body["author"],
                                 createdAt=datetime.utcnow()))
        self.session.commit()
