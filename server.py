import tornado
from tornado import web, ioloop, httpserver
from tornado.options import define, options

import seeds
from url import path
import os


define("port", default=8888, help="run on the given port", type=int)


class Application(tornado.web.Application):
    def __init__(self):
        settings = dict(
            cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
            xsrf_cookies=True,
            login_url="/login",
            debug=True,
            static_path=os.path.join(os.path.dirname(__file__), "static"),
        )
        super(Application, self).__init__(path, **settings)


if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    # operations and information before starting
    seeds.seed_default_db()
    print("The server is now on http://localhost:8888")
    tornado.ioloop.IOLoop.instance().start()
