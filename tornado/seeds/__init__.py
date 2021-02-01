from database import Database, SessionWithEngine
from seeds.default_user import create_default_user, create_default_category, create_default_blog_about


# Generate something when database is empty
def seed_default_db():
    session = SessionWithEngine()

    user = create_default_user(session)
    create_default_blog_about(session, user)
    create_default_category(session, user)

    session.close()
