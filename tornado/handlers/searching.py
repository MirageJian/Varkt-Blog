from sqlalchemy.orm import joinedload

from database import Article, User
from handlers.base import BaseHandler


class SearchingHandler(BaseHandler):
    async def get(self):
        keyword = '%' + self.get_argument("keyword") + '%'
        if len(keyword) < 3:
            return
        data = self.session.query(Article) \
            .options(joinedload(Article.user)) \
            .filter(Article.category.like(keyword),
                    Article.title.like(keyword),
                    Article.subhead.like(keyword),
                    Article.content.like(keyword),
                    User.username.like(keyword)) \
            .order_by(Article.createdAt.desc()) \
            .all()
        self.write_json(data)
