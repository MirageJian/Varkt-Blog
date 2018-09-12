from datetime import date
from datetime import datetime
from datetime import timedelta
import decimal
import json


# 这里构造一个字典，加入传输中所需要的各种值
# transfer_object = {'data': None, 'permit': "admin"}

def dumps(data):
    # self.transfer_object['data'] = data
    # 这里的cls是序列化时间，ensure_ascii是不使用ascii编码。
    return json.dumps(data, cls=CJsonEncoder, ensure_ascii=False)


def loads(param):
    return json.loads(s=param)


# datetime类型先变为string，在给json.dumps去序列化
class CJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        elif isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        elif isinstance(obj, timedelta):
            return str(obj)
        else:
            return json.JSONEncoder.default(self, obj)

# return obj.strftime('%Y-%m-%d')
# elif isinstance(obj, timedelta):
# .strftime('%H:%M:%S')
