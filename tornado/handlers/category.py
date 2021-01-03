from handlers.base import BaseHandler


class CategoryHandler(BaseHandler):
    async def get(self):
        self.db.cursor.execute("SELECT * FROM category ORDER BY id DESC")
        data = self.db.cursor.fetchall()
        self.write_json(data)

    async def post(self):
        self.get_login_user()
        body = self.loads_request_body()
        self.db.cursor.execute("INSERT INTO category (label, icon) VALUES (%s,%s)", (
            body["label"], body["icon"]
        ))
        self.db.conn.commit()

    async def put(self):
        self.get_login_user()
        # Change category, it will search category and article for changing

    async def delete(self):
        self.get_login_user()
        id_category = self.get_argument("id", None)
        self.db.cursor.execute("DELETE FROM category WHERE id=%s", id_category)
        self.db.conn.commit()
