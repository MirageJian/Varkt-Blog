import pymysql


class Database:

    def __init__(self):
        # 每次数据库被实例的时候，打开数据库连接，加上charset='utf8'可以读取中文
        try:
            self.conn = pymysql.connect("localhost", "root", "1793", "varkt", charset='utf8')
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
