from handlers.base import BaseHandler


class SearchingHandler(BaseHandler):
    async def get(self):
        keyword = '%' + self.get_argument("keyword") + '%'
        if len(keyword) < 3:
            self.write(self.json_encode(None))
            return
        self.db.cursor.execute(
            "SELECT a.id,a.title,a.category,a.img,a.subhead,a.time,u.username as author FROM article a "
            "JOIN user u on a.id_user = u.id "
            "WHERE a.category LIKE %s OR a.title LIKE %s OR u.username LIKE %s "
            "ORDER BY a.time DESC", (keyword, keyword, keyword)
        )
        data = self.db.cursor.fetchall()
        json = self.json_encode(data)
        self.write(json)
