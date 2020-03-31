from handlers.base import BaseHandler


class SomethingHandler(BaseHandler):
    async def get(self):
        category = '%' + self.get_argument("category") + '%'
        self.db.cursor.execute(
            "SELECT a.id,a.title,a.category,a.img,a.subhead,a.time,u.username as author FROM article a "
            "JOIN user u on a.id_user = u.id WHERE a.category LIKE %s ORDER BY a.time DESC", category)
        data = self.db.cursor.fetchall()
        json = self.json_encode(data)
        self.write(json)
