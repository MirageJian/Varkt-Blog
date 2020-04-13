from handlers.base import BaseHandler


# request the _xsrf cookies interface.
class MainHandler(BaseHandler):
    async def get(self):
        if self.xsrf_token:
            await self.write_res(0, "success", None)
        else:
            await self.write_res(-1, "Something bad happened.", None)
