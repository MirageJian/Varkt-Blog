from handlers.base import BaseHandler
from tools import json_helper


class CategoryHandler(BaseHandler):
    async def get(self):
        self.db.cursor.execute("SELECT * FROM category ORDER BY id DESC")
        data = self.db.cursor.fetchall()
        json = json_helper.dumps(data)
        self.write(json)

    async def put(self, *args, **kwargs):
        self.get_login_user()
        body = json_helper.loads(self.request.body)
        self.db.cursor.execute("INSERT INTO category (label, icon) VALUES (%s,%s)", (
            body["label"], body["icon"]
        ))
        self.db.conn.commit()
        await self.write_res(0, "post successfully", None)

    async def delete(self, *args, **kwargs):
        self.get_login_user()
        id_category = self.get_argument("id", None)
        self.db.cursor.execute("DELETE FROM category WHERE id=%s", id_category)
        self.db.conn.commit()
        await self.write_res(0, "delete successfully", None)

