from sqlalchemy.orm import joinedload

from database import Category, Article, User
from handlers.base import BaseHandler


class SomethingHandler(BaseHandler):
    async def get(self):
        category_str = self.get_argument("category")
        # Find category first
        category_obj = self.session.query(Category).filter(Category.label == category_str).first()
        if not category_obj:
            self.send_error(400, reason="Cannot find category" + category_str)
            return
        # Search
        search_str = '%' + category_str + '%'
        data = self.session.query(Article) \
            .filter(Article.category.like(search_str))\
            .options(joinedload(Article.user)) \
            .order_by(Article.createdAt.desc()) \
            .all()
        self.write_json(data)
