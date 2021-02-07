import decimal
import json
from datetime import datetime, date, timedelta
from typing import List, Type

from sqlalchemy.ext.declarative import DeclarativeMeta

from database import BaseColumn


def create_alchemy_encoder(extent_fields: List[BaseColumn] = None):

    class AlchemyEncoder(json.JSONEncoder):
        def default(self, o):
            # Alchemy encoder for columns
            if isinstance(o, tuple):
                data = {}
                for obj in o:
                    data.update(self.parse_sqlalchemy_object(obj))
                return data

            if isinstance(o.__class__, DeclarativeMeta):
                return self.parse_sqlalchemy_object(o)

            return json.JSONEncoder.default(self, o)

        def parse_sqlalchemy_object(self, o):
            data = {}
            fields = o.__json__() if hasattr(o, '__json__') else dir(o)
            for field in [f for f in fields if
                          not f.startswith('_') and f not in ['metadata', 'query', 'query_class']]:
                value = o.__getattribute__(field)
                try:
                    # Object not array to expand
                    if extent_fields and any(isinstance(value, e) for e in extent_fields):
                        data[field] = self.default(value)
                    # Primitive encoder
                    elif isinstance(value, decimal.Decimal):
                        data[field] = float(value)
                    elif isinstance(value, datetime) or isinstance(value, date):
                        data[field] = value.isoformat()
                    elif isinstance(value, timedelta):
                        data[field] = str(value)
                    # Other types
                    else:
                        json.dumps(value)
                        data[field] = value
                except TypeError:
                    data[field] = None
            return data

    return AlchemyEncoder


class PrimitiveEncoder(json.JSONEncoder):
    def default(self, obj):
        # Primitive encoder
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        elif isinstance(obj, datetime) or isinstance(obj, date):
            return obj.isoformat()
        elif isinstance(obj, timedelta):
            return str(obj)
