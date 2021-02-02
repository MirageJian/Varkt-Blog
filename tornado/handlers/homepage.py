
from sqlalchemy.orm import joinedload, selectinload
from typing import List

from database import Article, User, Comment
from handlers.base import BaseHandler


class Homepage(BaseHandler):
    async def get(self):
        data = self.session.query(Article) \
            .filter(Article.stick) \
            .options(joinedload(Article.user))\
            .order_by(Article.createdAt.desc()) \
            .all()
        self.write_json(data, [User])
