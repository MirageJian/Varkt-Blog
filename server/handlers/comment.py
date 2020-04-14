import asyncio

from handlers.base import BaseHandler
from tools import common_helper, json_helper


class CommentHandler(BaseHandler):
    async def get(self):
        id_article = self.get_argument("id_article")
        self.db.cursor.execute("SELECT * FROM comment WHERE id_article=%s", id_article)
        data = self.db.cursor.fetchall()
        await asyncio.sleep(5)
        json = json_helper.dumps(data)
        self.write(json)

    async def put(self, *args, **kwargs):
        body = json_helper.loads(self.request.body)
        self.db.cursor.execute("INSERT INTO comment (id_article, content, author, time) VALUES (%s,%s,%s,%s)", (
            body["id_article"], body["content"], body["author"], common_helper.get_now()
        ))
        self.db.conn.commit()
        await self.write_res(0, "put successfully", None)

    async def post(self, *args, **kwargs):
        body = json_helper.loads(self.request.body)
        self.db.cursor.execute("UPDATE comment SET likes=likes+1 WHERE id=%s", (body["id"]))
        self.db.conn.commit()
        await self.write_res(0, "post successfully", None)
