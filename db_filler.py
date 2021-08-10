import pony.orm as pny
from models import Atribut, Extra, Gen, CurentLiterar, Opera, OperaDramatica, OperaEpica, Rima, OperaLirica, Sentiment, Tema, Trasatura
from data_blocks.opere import load_opere
from data_blocks.trasaturi import trasaturi_list
from data_blocks.sentimente import sentimente_list
from data_blocks.teme import teme_list
from data_blocks.cuvinte_din_o_scrisoare import cuvinte_din_o_srisoare
from data_blocks.cuvinte_din_enigma_otiliei import cuvinte_din_enigma_otiliei


def add_update_rows(table, lista, atributa):

    for instance in lista:
        if row:= table.get(**{atributa: instance[atributa]}):
            row.set(**instance)
        else:
            print("new instance added: ", instance)
            table(**instance)

def add_update_cuvinte(cuvinte):
    for table, search_val_func, atributa, lista in cuvinte:
        # print("listabaaaaaaaaaaaaaaaaan")
        for instance in lista:
            instance["search_value"] = search_val_func(instance)
            if row:= table.get(**{atributa: instance[atributa]}):
                row.set(**instance)
            else:
                print("new instance added: ", instance)
                table(**instance)

@pny.db_session
def add_data():
    # genurile
    genuri_list = [
            {"nume": "epic"},
            {"nume": "liric"},
            {"nume": "dramatic"},
            ]

    add_update_rows(Gen, genuri_list, "nume")

    #curente literare  
    curente_list = [
            {"nume": "simbolism"},
            {"nume": "modernism"},
            {"nume": "romantism"},
            {"nume": "romantic realism"},
            {"nume": "realism"},
            {"nume": "modernism, realism"}
            
            ]
    add_update_rows(CurentLiterar, curente_list, "nume")


    #rime  
    rime_list = [
            {"nume": "îmbrățișată", "formula": "abba"},
            {"nume": "împerecheată", "formula": "abcd"},
            {"nume": "liberă", "formula": "-"},
            ]

    add_update_rows(Rima, rime_list, "nume")
    add_update_rows(Tema, teme_list, "nume")
    add_update_rows(Sentiment, sentimente_list, "nume")
    add_update_rows(Trasatura, trasaturi_list, "nume")
    opere_lirice_list, opere_epice_list, opere_dramatice_list = load_opere()
    add_update_rows(OperaLirica, opere_lirice_list, "titlu")
    add_update_rows(OperaEpica, opere_epice_list, "titlu")
    add_update_rows(OperaDramatica, opere_dramatice_list, "titlu")

    add_update_cuvinte(cuvinte_din_o_srisoare)
    add_update_cuvinte(cuvinte_din_enigma_otiliei)

    print("Data Successfully updated.")


if __name__=="__main__":
    add_data()
    