from handlers.base import BaseHandler


class Homepage(BaseHandler):
    async def get(self):
        self.db.cursor.execute(
            "SELECT a.id,a.title,a.category,a.img,a.subhead,a.time,u.username as author FROM article a "
            "JOIN user u on a.id_user = u.id WHERE stick=1 ORDER BY time DESC")
        data = self.db.cursor.fetchall()
        self.write_json(data)
