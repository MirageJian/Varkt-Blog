from handlers.base import BaseHandler
from tools import file_helper


class ImageHandler(BaseHandler):
    def prepare(self):
        super(ImageHandler, self).prepare()
        self.get_login_user()

    def post(self, *args, **kwargs):
        file_metas = self.request.files["imgUpload"]
        folder = self.get_argument("folder")
        url = file_helper.write_upload_img(file_metas[0], 'img_'+folder)
        self.write_res(0, "post successfully", url)
