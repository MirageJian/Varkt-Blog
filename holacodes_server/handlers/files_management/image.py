from handlers.base import BaseHandler
from tools import file_helper


class ImageHandler(BaseHandler):
    def prepare(self):
        self.get_login_user()

    async def post(self):
        file_metas = self.request.files["imgUpload"]
        url = file_helper.write_upload_img(file_metas[0], 'images')
        await self.write_res(0, "Post successfully", url)
