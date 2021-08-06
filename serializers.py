from json import dumps


class SimpleSerializer:
    include = []

    def __init__(self) -> None:
        pass

    def picking(self, instance_dict):
        return {attrib: instance_dict[attrib] for attrib in self.include}

    def query_serialize(self, query):
        pythonic = list(map(lambda instance:self.picking(instance.to_dict()), query))
        return dumps(pythonic, ensure_ascii=False)

class NevNumeSerializer(SimpleSerializer):
    include = ["nev", "nume"]

class OperaSerializer(SimpleSerializer):
    include = ["titlu", "anul", "curent", "artist", "perioada"]


# def simple_query_serializer(query):
#     pythonic = list(map(lambda instance:instance.to_dict(), query))
#     return dumps(pythonic)
