from datetime import datetime

from database import About
from handlers.base import BaseHandler


class AboutHandler(BaseHandler):
    async def get(self):
        data = self.session.query(About).first()
        self.write_json(data)

    async def put(self):
        self.get_login_user()

        body = self.loads_request_body()
        data = self.session.query(About).first()
        if not data:
            self.send_error(500, reason="There is about info, please restart server")
            return
        # Insert old article for backup
        self.session.add(About(content=data["content"], createdAt=data["creation_time"], updatedAt=data["update_time"]))
        data.content = body["content"]
        data.updatedAt = datetime.utcnow()
        # Update about
        self.session.commit()
