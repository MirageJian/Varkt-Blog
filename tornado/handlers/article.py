import json

from sqlalchemy.orm import joinedload

from database import Article, User
from handlers.base import BaseHandler, auth_user


class ArticleHandler(BaseHandler):
    async def get(self):
        id_article = self.get_argument("id", None)
        if not id_article:
            data = self.session.query(Article) \
                .options(joinedload(Article.user)) \
                .order_by(Article.createdAt.desc()) \
                .all()
        else:
            data = self.session.query(Article) \
                .options(joinedload(Article.user)) \
                .filter(Article.id == id_article) \
                .order_by(Article.createdAt.desc()) \
                .first()
        self.write_json(data, [User])

    @auth_user
    async def put(self):
        body = self.loads_request_body()
        # Check if categories is normal
        if not len(json.loads(body["category"])) > 0:
            self.send_error(400, reason="Categories cannot be empty")
            return
        article = self.session.query(Article).filter(
            Article.idUser == self.user_id and Article.id == body["id"]).first()
        article.title = body["title"]
        article.img = body["img"]
        article.subhead = body["subhead"]
        article.content = body["content"]
        article.category = body["category"]
        article.stick = body["stick"]
        article.collection = body["collection"]
        self.session.commit()

    @auth_user
    async def post(self):
        body = self.loads_request_body()
        # Check if categories is normal
        if not len(body["category"]) > 0:
            self.write_error(400, reason="Categories cannot be empty")
            return
        new_article = Article(idUser=self.user_id, title=body["title"], img=body["img"], subhead=body["subhead"],
                              content=body["content"], category=body["category"], stick=body["stick"],
                              collection=body["collection"])
        self.session.add(new_article)
        self.session.commit()
        self.write_json(new_article)

    @auth_user
    def delete(self):
        id_article = self.get_argument("id", None)
        article = self.session.query(Article).filter(Article.id == id_article).first()
        self.session.delete(article)
        self.session.commit()
