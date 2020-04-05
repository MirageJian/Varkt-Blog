from database import Database
from seeds.default_user import create_default_user, create_default_category, create_default_blog_about


# Generate something when database is empty
def seed_default_db():
    create_default_user(Database())
    create_default_blog_about(Database())
    create_default_category(Database())
