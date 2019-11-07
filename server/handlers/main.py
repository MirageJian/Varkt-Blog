from handlers.base import BaseHandler


# request the _xsrf cookies interface.
class MainHandler(BaseHandler):
    def get(self, *args, **kwargs):
        if self.xsrf_token:
            self.write_res(0, "success", None)
        else:
            self.write_res(-1, "Something bad happened.", None)
