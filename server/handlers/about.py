from handlers.base import BaseHandler
from tools import common_helper, json_helper


class AboutHandler(BaseHandler):
    async def get(self):
        self.db.cursor.execute("SELECT * FROM about")
        data = self.db.cursor.fetchone()
        json = json_helper.dumps(data)
        self.write(json)

    async def put(self):
        self.get_login_user()

        body = json_helper.loads(self.request.body)
        self.db.cursor.execute("SELECT * FROM about")
        data = self.db.cursor.fetchone()
        if not data:
            await self.write_res(1, "There is about info, please restart server", None)
            return
        # Insert old article for backup
        self.db.cursor.execute("INSERT INTO about(content, creation_time, update_time) VALUES (%s, %s, %s)",
                               (data["content"], data["creation_time"], data["update_time"]))
        self.db.conn.commit()
        # Update about
        self.db.cursor.execute(
            "UPDATE about SET content=%s,update_time=%s WHERE id=%s", (
                body["content"], common_helper.get_now(), body["id"]
            ))
        self.db.conn.commit()
        await self.write_res(0, "put successfully", None)
