from json import dumps
from collections import defaultdict

class SimpleSerializerBase:
    include = []

    def __init__(self) -> None:
        pass

    def picking(self, instance_dict):
        return {attrib: instance_dict[attrib] for attrib in self.include}

    def query_serialize(self, query):
        pythonic = list(map(lambda instance:self.picking(instance.to_dict()), query))
        return dumps(pythonic, ensure_ascii=False)

class AsemSerializerBase(SimpleSerializerBase):
    asem_field = ""

    def query_serialize(self, query):
        pythonic = defaultdict(lambda:[])
        for curent, opera in query:
            pythonic[curent].append(self.picking(opera.to_dict()))
        return dumps(pythonic, ensure_ascii=False)


class OperaCurentSerializer(AsemSerializerBase):
    asem_field = "curent"
    include = ["titlu", "anul", "artist"]

class OperaPerioadaSerializer(AsemSerializerBase):
    asem_field = "perioada"
    include = ["titlu", "anul", "artist"]

class NevNumeSerializer(SimpleSerializerBase):
    include = ["nev", "nume"]

class OperaSerializer(SimpleSerializerBase):
    include = ["titlu", "anul", "artist"]



# def simple_query_serializer(query):
#     pythonic = list(map(lambda instance:instance.to_dict(), query))
#     return dumps(pythonic)
