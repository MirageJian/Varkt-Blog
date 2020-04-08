from handlers.main import MainHandler
from handlers.dashboard import DashboardHandler
from handlers.something import SomethingHandler
from handlers.about import AboutHandler
from handlers.blog_admin.login import LoginHandler
from handlers.blog_admin.image import ImageHandler
from handlers.article import ArticleHandler
from handlers.comment import CommentHandler
from handlers.blog_admin.comment_managing import CommentManagingHandler
from handlers.category import CategoryHandler
from handlers.searching import SearchingHandler
from handlers.blog_admin.password import PasswordHandler
from handlers.files_management.public_files import PublicFilesHandler

from handlers.py.py_auth import AuthorizationHandler
from handlers.py.py_record import PyRecordHandler
from handlers.py.py_user import PyUserHandler
from handlers.py.py_code import PyCodeHandler

api_url = r"/api"

path = [
    (api_url + r"/", MainHandler),
    (api_url + r"/dashboard", DashboardHandler),
    (api_url + r"/something", SomethingHandler),
    (api_url + r"/about", AboutHandler),
    (api_url + r"/login", LoginHandler),
    (api_url + r"/image", ImageHandler),
    (api_url + r"/article", ArticleHandler),
    (api_url + r"/comment", CommentHandler),
    (api_url + r"/comment_managing", CommentManagingHandler),
    (api_url + r"/category", CategoryHandler),
    (api_url + r"/searching", SearchingHandler),
    (api_url + r"/password", PasswordHandler),
    (api_url + r"/public_files", PublicFilesHandler),

    (api_url + r"/authorization", AuthorizationHandler),
    (api_url + r"/authorisation", AuthorizationHandler),
    (api_url + r"/py_record", PyRecordHandler),
    (api_url + r"/py_user", PyUserHandler),
    (api_url + r"/py_code", PyCodeHandler),
]

