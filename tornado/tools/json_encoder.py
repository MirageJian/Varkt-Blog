import json

from sqlalchemy.ext.declarative import DeclarativeMeta


def create_alchemy_encoder(extent_fields):

    class AlchemyEncoder(json.JSONEncoder):
        def default(self, o):
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
                    else:
                        json.dumps(value)
                        data[field] = value
                except TypeError:
                    data[field] = None
            return data

    return AlchemyEncoder
