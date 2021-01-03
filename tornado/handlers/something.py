from handlers.base import BaseHandler


class SomethingHandler(BaseHandler):
    async def get(self):
        category_str = self.get_argument("category")
        # Find category first
        self.db.cursor.execute("SELECT * FROM category WHERE label=%s", category_str)
        category_obj = self.db.cursor.fetchone()
        if not category_obj:
            self.send_error(400, reason="Cannot find category" + category_str)
            return
        # Search
        search_str = '%' + category_str + '%'
        self.db.cursor.execute(
            "SELECT a.id,a.title,a.category,a.img,a.subhead,a.time,u.username as author FROM article a "
            "JOIN user u on a.id_user = u.id WHERE a.category LIKE %s ORDER BY a.time DESC", search_str)
        data = self.db.cursor.fetchall()
        self.write_json(data)
