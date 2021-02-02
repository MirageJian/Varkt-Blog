from sqlalchemy.orm import Session

from database import User, About, Category

# user default seed
username = 'admin'
password = 'e10adc3949ba59abbe56e057f20f883e'
email = username + '@yourdomain.com'


def create_default_user(session: Session) -> User:
    user = session.query(User).first()
    if not user:
        user = User(id=1, username=username, password=password, email=email, isAdmin=True)
        session.add(user)
        session.commit()
    return user


# about default seed
about_content = 'Insert your about information here, any thing you want.' \
                ' You also can edit this about in admin dashboard'


def create_default_blog_about(session: Session, user: User):
    abouts = session.query(About).all()
    if not abouts or len(abouts) < 1:
        session.add(About(idUser=user.id, content=about_content))
        session.commit()


# category default seed
category = 'New Category'
icon = 'add'


def create_default_category(session: Session, user: User):
    categories = session.query(Category).all()
    if not categories or len(categories) < 1:
        session.add(Category(idUser=user.id, label=category, icon=icon))
        session.commit()
