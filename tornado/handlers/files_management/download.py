from handlers.base import BaseHandler


class ResponsesDownloadHandler(BaseHandler):
    def get(self):
        filename = 'This_File_Name'
        self.set_header('Content-Type', 'application/octet-stream')
        self.set_header('Content-Disposition', f'attachment; filename="{filename}"')
