from handlers.base import BaseHandler


class AboutHandler(BaseHandler):
    def get(self):
        self.db.cursor.execute("SELECT * FROM article WHERE about=1 ORDER BY time DESC")
        data = self.db.cursor.fetchone()
        json = self.json_encode(data)
        self.write(json)
