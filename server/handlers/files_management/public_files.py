from handlers.base import BaseHandler
import tools.file_helper


class PublicFilesHandler(BaseHandler):
    def prepare(self):
        self.get_login_user()

    async def get(self, *args, **kwargs):
        files_list = tools.file_helper.list_files("public_files")
        await self.write_res(0, data=files_list)

    async def post(self, *args, **kwargs):
        file_metas = self.request.files["PublicFiles"]
        tools.file_helper.write_upload_files(file_metas, "public_files")
        await self.write_res(0, "Upload Successfully", None)

    async def delete(self, *args, **kwargs):
        filename = self.get_argument('filename')
        result = tools.file_helper.delete_file("public_files", filename)
        await self.write_res(0 if result else 1, "Delete Successfully" if result else "File Not Exist")
