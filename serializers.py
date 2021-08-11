from json import dumps, loads
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

    def dict_instance_serialize(self, instance):
        pythonic = self.picking(instance)
        return dumps(pythonic, ensure_ascii=False)

    def dict_instance_deserialize(self, json_dict):
        # pythonic = self.picking(instance)
        return loads(json_dict, ensure_ascii=False)

class CuvantSerializer(SimpleSerializerBase):
    @staticmethod
    def substantive_query_loader(query):
        return [cuvant.singular for cuvant in query if cuvant.singular] +\
            [cuvant.plural for cuvant in query if cuvant.plural]

    @staticmethod
    def verb_query_loader(query):
        return [cuvant.infinitiv for cuvant in query]

    @staticmethod
    def structalt_query_loader(query):
        return [{"nume": cuvant.nume, "nev": cuvant.nev} for cuvant in query]

    @staticmethod
    def motive_query_loader(liric_query):
        lista = []
        for opera in liric_query:
            for motiv in opera.motive_specifice.split(", "):
                roman, magyar = motiv.split(":")
                lista.append({"nume":   roman, "nev": magyar})
        return lista
            


    def query_serialize(self, substantive_query, verb_query, structalt_query, opere_lirice_query):
        pythonic = self.substantive_query_loader(substantive_query)
        pythonic += self.verb_query_loader(verb_query)
        pythonic += self.structalt_query_loader(structalt_query)
        pythonic += self.motive_query_loader(opere_lirice_query)
        return dumps(pythonic, ensure_ascii=False)


class AsemSerializerBase(SimpleSerializerBase):
    # asem_field = ""

    def query_serialize(self, query):
        pythonic = defaultdict(lambda:[])
        for curent, opera in query:
            pythonic[curent].append(self.picking(opera.to_dict()))
        return dumps(pythonic, ensure_ascii=False)


class OperaAsemSerializer(AsemSerializerBase):
    include = ["titlu", "anul", "artist"]
#     asem_field = "curent"

# class OperaPerioadaSerializer(AsemSerializerBase):
#     asem_field = "perioada"
#     include = ["titlu", "anul", "artist"]

class NevNumeSerializer(SimpleSerializerBase):
    include = ["nev", "nume"]

class OperaSerializer(SimpleSerializerBase):
    include = ["titlu", "anul", "artist", "specie"]

class OperaLiricaSerializer(SimpleSerializerBase):
    include = ["titlu", "ritm", "rima", "masura"]

class SzoalakSerializer(SimpleSerializerBase):
    include = ["nume", "nev"]



# def simple_query_serializer(query):
#     pythonic = list(map(lambda instance:instance.to_dict(), query))
#     return dumps(pythonic)
