from handlers.base import BaseHandler
from tools import json_helper


class SomethingHandler(BaseHandler):
    async def get(self):
        category = '%' + self.get_argument("category") + '%'
        self.db.cursor.execute(
            "SELECT a.id,a.title,a.category,a.img,a.subhead,a.time,u.username as author FROM article a "
            "JOIN user u on a.id_user = u.id WHERE a.category LIKE %s ORDER BY a.time DESC", category)
        data = self.db.cursor.fetchall()
        json = json_helper.dumps(data)
        self.write(json)
