from handlers.base import BaseHandler
import datetime

from tools import json_helper


class WbProjectsHandler(BaseHandler):
    def get(self):
        id_user = self.get_login_user()
        id_project = self.get_argument("id", None)
        if not id_project:
            self.db.cursor.execute("SELECT * FROM wb_project WHERE id_user=%s", id_user)
            data = self.db.cursor.fetchall()
        else:
            self.db.cursor.execute("SELECT * FROM wb_project WHERE id=%s", id_project)
            data = self.db.cursor.fetchone()
        json = json_helper.dumps(data)
        self.write(json)

    def post(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = json_helper.loads(self.request.body)
        try:
            self.db.cursor.execute("UPDATE wb_project SET id_user=%s,theme=%s,date_start=%s,date_end=%s,remark=%s "
                                   "WHERE id=%s", (
                                       id_user, body["theme"], body["date_start"], body["date_end"],
                                       body["remark"], body["id"]))
            self.db.conn.commit()
        except():
            self.write_res(-1, "some bad happened" + str(Exception), None)
        self.write_res(0, "post success", None)

    def put(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = json_helper.loads(self.request.body)
        try:
            self.db.cursor.execute("INSERT INTO wb_project(id_user,theme,date_start,date_end,remark) "
                                   "VALUES(%s,%s,%s,%s,%s)", (
                                       id_user, body["theme"], body["date_start"], body["date_end"],
                                       body["remark"]))
            self.db.conn.commit()
        except():
            self.write_res(-1, "some bad happened" + str(Exception), None)
        self.write_res(0, "put success", None)

    def delete(self):
        self.get_login_user()
        id_project = self.get_argument("id")
        self.db.cursor.execute("DELETE FROM wb_project WHERE id=%s", id_project)
        self.db.conn.commit()
        self.write_res(0, "Delete Success!", None)
