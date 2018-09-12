from handlers.main import MainHandler
from handlers.dashboard import DashboardHandler
from handlers.something import SomethingHandler
from handlers.about import AboutHandler
from handlers.login import LoginHandler
from handlers.image import ImageHandler
from handlers.article import ArticleHandler
from handlers.comment import CommentHandler
from handlers.comment_managing import CommentManagingHandler
from handlers.category import CategoryHandler
from handlers.searching import SearchingHandler

from handlers.py.py_auth import AuthorisationHandler
from handlers.py.py_record import PyRecordHandler
from handlers.py.py_user import PyUserHandler
from handlers.py.py_code import PyCodeHandler
from handlers.wb.wb_projects import WbProjectsHandler
from handlers.wb.wb_activities import WbActivitiesHandler
from handlers.wb.wb_set_end_a import SetEndAHandler


path = [
    (r"/", MainHandler),
    (r"/dashboard", DashboardHandler),
    (r"/something", SomethingHandler),
    (r"/about", AboutHandler),
    (r"/login", LoginHandler),
    (r"/image", ImageHandler),
    (r"/article", ArticleHandler),
    (r"/comment", CommentHandler),
    (r"/comment_managing", CommentManagingHandler),
    (r"/category", CategoryHandler),
    (r"/searching", SearchingHandler),

    (r"/authorisation", AuthorisationHandler),
    (r"/py_record", PyRecordHandler),
    (r"/py_user", PyUserHandler),
    (r"/py_code", PyCodeHandler),

    (r"/wb_projects", WbProjectsHandler),
    (r"/wb_activities", WbActivitiesHandler),
    (r"/wb_set_end_a", SetEndAHandler),
]

