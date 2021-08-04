import datetime
from enum import unique
from re import S
from jinja2 import defaults
import pony.orm as pny
from pony.orm.core import Required

database = pny.Database("sqlite",
                        "test46.sqlite",
                        create_db=True)

class Gen(database.Entity):
    nume = pny.PrimaryKey(pny.unicode)
    opere = pny.Set("Opera")

    @classmethod
    def e(cls, gen:str):
        return cls.get(nume=gen)

class CurentLiterar(database.Entity):
    """
    Pony ORM model of the Artist table
    """
    nume = pny.PrimaryKey(pny.unicode)
    opere = pny.Set("Opera")

    @classmethod
    def cu_nume(cls, curent):
        return cls.get(nume=curent) 

class Atribut(database.Entity):
    scurt = pny.Required(str)
    lung = pny.Optional(str) 
    rovid = pny.Optional(str) 
    hosszu = pny.Optional(str) 

    opera_semnificatia_titlului = pny.Optional("Opera", reverse="semnificatia_titlului")
    opera_tema = pny.Optional("Opera", reverse="tema")
    opera_explicare_structurii = pny.Optional("OperaLirica", reverse="explicare_structurii")
    opera_discurs_liric = pny.Optional("OperaLirica", reverse="discursul_liric")
    opera_moduri_de_expunere = pny.Optional("OperaLirica", reverse="moduri_de_expunere")


class Extra(database.Entity):
    scurt = pny.Required(str)
    lung = pny.Optional(str) 
    rovid = pny.Optional(str) 
    hosszu = pny.Optional(str)

    opera = pny.Optional("Opera")

class Opera(database.Entity):
    """
    Pony ORM model of album table
    """
    artist = pny.Required(str)
    titlu = pny.PrimaryKey(str)
    curent = pny.Required(CurentLiterar)
    gen = pny.Required(Gen)
    anul = pny.Optional(int)
    revista = pny.Optional(str, default="...")
    # revista = pny.Optional(str)

    tema = pny.Required(Atribut)
    semnificatia_titlului = pny.Required(Atribut)

    specie = pny.Optional(str)  # TODO: own table
    perioada = pny.Optional(str)

    extras = pny.Set(Extra)

    #TODO: structura


    linkuri = pny.Optional(pny.unicode)

class Rima(database.Entity):
    nume = pny.PrimaryKey(pny.unicode)
    formula = pny.Required(pny.unicode)
    Opere = pny.Set("OperaLirica")

    @classmethod
    def e(cls, rima:str):
        return cls.get(nume=rima)


class OperaLirica(Opera):

    #prozodia
    rima = pny.Required(Rima)
    masura = pny.Required(pny.unicode)
    ritm = pny.Optional(pny.unicode)
    strofe = pny.Optional(str)


    explicare_structurii = pny.Set(Atribut, reverse="opera_explicare_structurii")

    creatia = pny.Optional(str)

    discursul_liric = pny.Optional(Atribut, reverse="opera_discurs_liric")
    moduri_de_expunere = pny.Optional(Atribut, reverse="opera_moduri_de_expunere")

    figuri_de_stil = pny.Set("FiguraDeStil")
    motive_specifice = pny.Optional(str, default="")

class FiguraDeStil(database.Entity):
    opera = pny.Required(OperaLirica)
    tip = pny.Required(str)
    citat = pny.Required(str)

    incepe = pny.Optional(int)
    sfarsit = pny.Optional(int)


class Tema(database.Entity):
    nume = pny.Required(str)
    nev = pny.Required(str)

    sinonim = pny.Optional(str)


class Sentiment(Tema):
    mood = pny.Optional(str, default="neutru")


class Trasatura(database.Entity):
    nume = pny.Required(str)
    nev = pny.Required(str)
    tip = pny.Required(str)  # fizice, morale

class OperaEpica(Opera):
    pass



# pny.sql_debug(True)
# map the models to the database 
# and create the tables, if they don't exist
database.generate_mapping(create_tables=True)