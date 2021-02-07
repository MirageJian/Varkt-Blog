import logging
from datetime import datetime

import pymysql
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship


class Database:

    def __init__(self):
        # 每次数据库被实例的时候，打开数据库连接，加上charset='utf8'可以读取中文
        try:
            self.conn = pymysql.connect(
                host="localhost",
                user="root",
                password="17931793",
                database="varkt",
            )
            # 使用 cursor() 方法创建一个返回为字典游标对象。不加pymysql.cursors.DictCursor，返回为数组
            self.cursor = self.conn.cursor(pymysql.cursors.DictCursor)
        except():
            print(Exception)

    # # 下面的句子不安全，所以弃用
    # def get_one(self, sql):
    #     try:
    #         # 使用 execute()  方法执行 SQL 查询
    #         self.cursor.execute(sql)
    #         # 使用 fetchone() 方法获取单条数据.
    #         data = self.cursor.fetchone()
    #     except():
    #         data = None
    #         print(str(Exception))
    #     # 关闭数据库连接
    #     self.conn.close()
    #     # json化数据
    #     return data
    #
    # def get_all(self, sql):
    #     try:
    #         self.cursor.execute(sql)
    #         data = self.cursor.fetchall()
    #     except():
    #         data = None
    #         print(str(Exception))
    #     self.conn.close()
    #     return data
    #
    # def commit(self, sql):
    #     try:
    #         # 执行SQL语句
    #         self.cursor.execute(sql)
    #         # 提交到数据库执行
    #         self.conn.commit()
    #     except():
    #         # 发生错误时回滚
    #         self.conn.rollback()
    #         print(str(Exception))
    #     self.conn.close()


engine = create_engine("mysql+pymysql://root:17931793@localhost/varkt")  # , echo=True
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
