from database import Category
from handlers.base import BaseHandler


class CategoryHandler(BaseHandler):
    async def get(self):
        data = self.session.query(Category).order_by(Category.id.asc()).all()
        self.write_json(data)

    async def post(self):
        self.get_login_user()
        body = self.loads_request_body()
        self.session.add(Category(label=body["label"], icon=body["icon"]))
        self.session.commit()

    async def put(self):
        self.get_login_user()
        # Change category, it will search category and article for changing

    async def delete(self):
        self.get_login_user()
        id_category = self.get_argument("id", None)
        category = self.session.query(Category).filter(Category.id == id_category).first()
        self.session.delete(category)
        self.session.commit()
