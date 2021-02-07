from database import Category
from handlers.base import BaseHandler, auth_user


class CategoryHandler(BaseHandler):
    async def get(self):
        data = self.session.query(Category).order_by(Category.id.asc()).all()
        self.write_json(data)

    @auth_user
    async def post(self):
        body = self.loads_request_body()
        self.session.add(Category(idUser=self.user_id, label=body["label"], icon=body["icon"]))
        self.session.commit()

    @auth_user
    async def put(self):
        pass
        # Change category, it will search category and article for changing

    @auth_user
    async def delete(self):
        id_category = self.get_argument("id", None)
        category = self.session.query(Category).filter(Category.id == id_category).first()
        self.session.delete(category)
        self.session.commit()
