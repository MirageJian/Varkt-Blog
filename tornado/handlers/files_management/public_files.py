import tools.file_helper
from handlers.base import BaseHandler, auth_user


class PublicFilesHandler(BaseHandler):
    @auth_user
    def prepare(self):
        pass

    async def get(self):
        files_list = tools.file_helper.list_files("public_files")
        self.write_json(files_list)

    async def post(self):
        file_metas = self.request.files["PublicFiles"]
        tools.file_helper.write_upload_files(file_metas, "public_files")

    async def delete(self):
        filename = self.get_argument('filename')
        result = tools.file_helper.delete_file("public_files", filename)
        if not result:
            self.send_error(400, reason="File Not Exist")
