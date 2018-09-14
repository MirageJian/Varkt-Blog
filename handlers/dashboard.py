from handlers.base import BaseHandler
from tornado.escape import json_encode


class DashboardHandler(BaseHandler):
    def get(self):
        self.db.cursor.execute(
            "SELECT a.id,a.title,a.category,a.img,a.subhead,a.time,u.name as author FROM article a "
            "JOIN user u on a.id_user = u.id WHERE stick=1 ORDER BY time DESC")
        data = self.db.cursor.fetchall()
        json = self.json_encode(data)
        self.write(json)
