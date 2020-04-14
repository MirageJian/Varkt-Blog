from handlers.homepage import Homepage
from handlers.something import SomethingHandler
from handlers.about import AboutHandler
from handlers.blog_admin.login import LoginHandler
from handlers.files_management.image import ImageHandler
from handlers.article import ArticleHandler
from handlers.comment import CommentHandler
from handlers.blog_admin.comment_managing import CommentManagingHandler
from handlers.category import CategoryHandler
from handlers.searching import SearchingHandler
from handlers.blog_admin.password import PasswordHandler
from handlers.files_management.public_files import PublicFilesHandler


api_url = r"/api"


path = [
    (api_url + r"/dashboard", Homepage),
    (api_url + r"/something", SomethingHandler),
    (api_url + r"/about", AboutHandler),
    (api_url + r"/login", LoginHandler),
    (api_url + r"/image", ImageHandler),  # TODO need to delete
    (api_url + r"/article", ArticleHandler),
    (api_url + r"/comment", CommentHandler),
    (api_url + r"/comment_managing", CommentManagingHandler),
    (api_url + r"/category", CategoryHandler),
    (api_url + r"/searching", SearchingHandler),
    (api_url + r"/password", PasswordHandler),
    (api_url + r"/public_files", PublicFilesHandler),
]

