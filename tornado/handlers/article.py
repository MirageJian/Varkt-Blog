import json

from sqlalchemy.orm import joinedload

from database import Article, User
from handlers.base import BaseHandler


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

    async def put(self):
        id_user = self.auth_user()
        body = self.loads_request_body()
        # Check if categories is normal
        if not len(json.loads(body["category"])) > 0:
            self.send_error(400, reason="Categories cannot be empty")
            return
        article = self.session.query(Article).filter(Article.idUser == id_user and Article.id == body["id"]).first()
        article.title = body["title"]
        article.img = body["img"]
        article.subhead = body["subhead"]
        article.content = body["content"]
        article.category = body["category"]
        article.stick = body["stick"]
        article.collection = body["collection"]
        self.session.commit()

    async def post(self):
        id_user = self.auth_user()
        body = self.loads_request_body()
        # Check if categories is normal
        if not len(json.loads(body["category"])) > 0:
            self.send_error(400, reason="Categories cannot be empty")
            return

        self.session.add(Article(idUser=id_user, title=body["title"], img=body["img"], subhead=body["subhead"],
                                 content=body["content"], category=body["category"], stick=body["stick"],
                                 collection=body["collection"]))
        self.session.commit()

    def delete(self):
        self.auth_user()
        id_article = self.get_argument("id", None)
        article = self.session.query(Article).filter(Article.id == id_article).first()
        self.session.delete(article)
        self.session.commit()
