from handlers.base import BaseHandler, auth_user
from tools import file_helper


class ImageHandler(BaseHandler):
    @auth_user
    def prepare(self):
        pass

    async def post(self):
        file_metas = self.request.files["imgUpload"]
        url = file_helper.write_upload_img(file_metas[0], 'images')
        self.write(url)
