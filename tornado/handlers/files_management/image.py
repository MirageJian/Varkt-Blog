from handlers.base import BaseHandler
from tools import file_helper


class ImageHandler(BaseHandler):
    def prepare(self):
        self.auth_user()

    async def post(self):
        file_metas = self.request.files["imgUpload"]
        url = file_helper.write_upload_img(file_metas[0], 'images')
        self.write(url)
