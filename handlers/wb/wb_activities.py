from handlers.base import BaseHandler


class WbActivitiesHandler(BaseHandler):
    def get(self):
        self.get_login_user()
        id_project = self.get_argument("id_project", None)
        id_activity = self.get_argument("id", None)
        if not id_project and not id_activity:
            self.db.cursor.execute(
                "SELECT a.*,p.theme AS project FROM wb_activity a JOIN wb_project p ON a.id_project = p.id "
                "ORDER BY a.date DESC")
            data = self.db.cursor.fetchall()
        elif not id_activity:
            self.db.cursor.execute(
                "SELECT a.*,p.theme AS project FROM wb_activity a JOIN wb_project p ON a.id_project = p.id "
                "WHERE a.id_project=%s ORDER BY date DESC, time_start DESC;", id_project)
            data = self.db.cursor.fetchall()
        else:
            self.db.cursor.execute(
                "SELECT a.*,p.theme AS project FROM wb_activity a JOIN wb_project p ON a.id_project = p.id "
                "WHERE a.id=%s", id_activity)
            data = self.db.cursor.fetchone()
        json = self.json_encode(data)
        self.write(json)

    def post(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = self.json_decode(self.request.body)
        try:
            self.db.cursor.execute("UPDATE wb_activity SET id_project=%s,title=%s,date=%s,time_start=%s,time_end=%s,"
                                   "interruption=%s,net_time=%s,num_week=%s,remark=%s WHERE id=%s", (
                                    body["id_project"], body["title"], body["date"], body["time_start"],
                                    body["time_end"], body["interruption"], body["net_time"], body["num_week"],
                                    body["remark"], body["id"]))
            self.db.conn.commit()
        except():
            self.write_res(-1, "some bad happened" + str(Exception), None)
        self.write_res(0, "post success", None)

    def put(self, *args, **kwargs):
        id_user = self.get_login_user()
        body = self.json_decode(self.request.body)
        try:
            self.db.cursor.execute("REPLACE INTO wb_activity(id,id_project,title,date,time_start,time_end,interruption,"
                                   "net_time,num_week,remark) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (
                                    body["id"], body["id_project"], body["title"], body["date"], body["time_start"],
                                    body["time_end"], body["interruption"], body["net_time"], body["num_week"],
                                    body["remark"]))
            self.db.conn.commit()
        except():
            self.write_res(-1, "some bad happened" + str(Exception), None)
        self.write_res(0, "put success", None)

    def delete(self):
        self.get_login_user()
        id_activity = self.get_argument("id")
        self.db.cursor.execute("DELETE FROM wb_activity WHERE id=%s", id_activity)
        self.db.conn.commit()
        self.write_res(0, "Delete Success!", None)
