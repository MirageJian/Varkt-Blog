from handlers.base import BaseHandler
from tools import common_helper


class ArticleHandler(BaseHandler):
    async def get(self, *args, **kwargs):
        id_article = self.get_argument("id", None)
        if not id_article:
            self.db.cursor.execute(
                "SELECT a.id,a.title,a.category,a.img,a.subhead,a.time,u.username AS author,a.update_time "
                "FROM article a JOIN user u on a.id_user = u.id  ORDER BY a.time DESC")
            data = self.db.cursor.fetchall()
        else:
            self.db.cursor.execute(
                "SELECT a.id,u.username AS author,a.title,a.content,a.category,a.time,a.stick,a.collection"
                ",a.update_time FROM article a JOIN user u on a.id_user = u.id where a.id=%s", id_article)
            data = self.db.cursor.fetchone()
        json = self.json_encode(data)
        self.write(json)

    async def post(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = self.json_decode(self.request.body)
        self.db.cursor.execute(
            "UPDATE article SET id_user=%s,title=%s,img=%s,subhead=%s,content=%s,category=%s,stick=%s,collection=%s,"
            "update_time=%s WHERE id=%s", (
                id_user, body["title"], body["img"], body["subhead"], body["content"], body["category"], body["stick"],
                body["collection"], common_helper.get_now(), body["id"]
            ))
        self.db.conn.commit()
        await self.write_res(0, "post successfully", None)

    async def put(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = self.json_decode(self.request.body)
        print(body)
        self.db.cursor.execute(
            "INSERT INTO article (id_user,title,img,subhead,content,category,stick,collection,time) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)", (
                id_user, body["title"], body["img"], body["subhead"], body["content"], body["category"], body["stick"],
                body["collection"], common_helper.get_now()
            ))
        self.db.conn.commit()
        await self.write_res(0, "put successfully", self.db.cursor.lastrowid)

    def delete(self, *args, **kwargs):
        self.get_login_user()
        id_article = self.get_argument("id", None)
        self.db.cursor.execute("DELETE FROM article WHERE id=%s", id_article)
        self.db.conn.commit()
        self.write_res(0, "delete successfully", None)
