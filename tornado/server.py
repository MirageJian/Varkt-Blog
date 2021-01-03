import asyncio
import os
import sys

from tornado import web, ioloop, httpserver
from tornado.options import define, options

import seeds
from url import path

define("port", default=8888, help="run on the given port", type=int)
settings = dict(
    cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
    debug=sys.platform == 'win32',
    xsrf_cookies=True,
    xheaders=True,
    login_url="/login",
    static_path=os.path.join(os.path.dirname(__file__), "static"),
)


# Operations and information before starting
def before_starting():
    seeds.seed_default_db()


if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    # Accept args, such as port
    options.parse_command_line()
    # Make an application based on path and settings
    app = httpserver.HTTPServer(web.Application(path, **settings))
    app.listen(options.port)
    # For python3.8 change event adminloop policy for windows
    # # Use multiple processes
    # app.start(0)
    before_starting()
    # Start tornado server
    print("The server is now on http://localhost:" + str(options.port))
    ioloop.IOLoop.instance().start()
