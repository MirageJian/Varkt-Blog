from database import Category
from handlers.base import BaseHandler


class CategoryHandler(BaseHandler):
    async def get(self):
        data = self.session.query(Category).order_by(Category.id.asc()).all()
        self.write_json(data)

    async def post(self):
        user_id = self.auth_user()
        body = self.loads_request_body()
        self.session.add(Category(idUser=user_id, label=body["label"], icon=body["icon"]))
        self.session.commit()

    async def put(self):
        self.auth_user()
        # Change category, it will search category and article for changing

    async def delete(self):
        self.auth_user()
        id_category = self.get_argument("id", None)
        category = self.session.query(Category).filter(Category.id == id_category).first()
        self.session.delete(category)
        self.session.commit()
