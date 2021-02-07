from datetime import datetime

from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

from seeds.const import mysql_conn_str

engine = create_engine(mysql_conn_str)  # , echo=True
BaseColumn = declarative_base()


class User(BaseColumn):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    isAdmin = Column(Boolean, default=False, nullable=False)

    # abouts = relationship("About", back_populates="user")
    # categories = relationship("Category", back_populates="user")
    # articles = relationship("Article", back_populates="user")

    def __repr__(self):
        return "<User(name='%s', email='%s')>" % (self.username, self.email)


class About(BaseColumn):
    __tablename__ = 'abouts'

    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'), nullable=False)
    content = Column(Text, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow(), nullable=False)
    updatedAt = Column(DateTime)

    user = relationship("User")


class Category(BaseColumn):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'), nullable=False)
    label = Column(String(45), nullable=False)
    icon = Column(String(45))

    user = relationship("User")


class Article(BaseColumn):
    __tablename__ = 'articles'

    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'), nullable=False)
    title = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow(), nullable=False)
    stick = Column(Boolean, nullable=False, default=True)
    collection = Column(Boolean, nullable=False, default=False)
    img = Column(Text)
    subhead = Column(Text)
    category = Column(JSON)
    updatedAt = Column(DateTime)

    # comments = relationship("Comment", back_populates="article")
    user = relationship("User")


class Comment(BaseColumn):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    idArticle = Column(Integer, ForeignKey('articles.id'), nullable=False)
    content = Column(Text, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow(), nullable=False)
    likes = Column(Integer, nullable=False, default=0)
    isChecked = Column(Boolean, nullable=False, default=False)
    author = Column(String(100))

    article = relationship("Article")


BaseColumn.metadata.create_all(engine)
SessionWithEngine = sessionmaker(bind=engine)
# logging.basicConfig()
# logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
