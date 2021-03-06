from re import split
import pony.orm as pny
from models import Opera, OperaDramatica, OperaEpica, OperaLirica, Sentiment, StructAlt, Substantiv, Tema, Trasatura, Verb
from pathlib import Path
from filters import register_filters, linkify
from serializers import OperaAsemSerializer, CuvantSerializer, NevNumeSerializer, OperaLiricaSerializer, OperaSerializer
from jinja2 import Environment, FileSystemLoader, select_autoescape

def render():
    # pure_path = Path.cwd() / "sites"

    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape()
    )

    register_filters(env)

    def process(file_name, context={}, template_path=None):
        if not template_path:
            template_path = file_name

        pure_path = ""
        for _ in range(file_name.count("/")):
            pure_path += "../"
        if not pure_path:
            pure_path = "./"
        pure_path = pure_path[:-1]
        site = env.get_template(template_path).render(pure_path=pure_path, **context)
        (Path(f"./docs")/file_name).write_text(site, encoding='utf-8')    # sites


    with pny.db_session:
        opere_lirice = pny.select(opera for opera in OperaLirica)
        process("opere_lirice.html", context={"opere" : opere_lirice})
        opere_dramatice = pny.select(opera for opera in OperaDramatica)
        process("opere_dramatice.html", context={"opere" : opere_dramatice})
        opere_epice = pny.select(opera for opera in OperaEpica)
        process("opere_epice.html", context={"opere" : opere_epice})
        process("index.html")
        opere = pny.select(opera for opera in Opera).sort_by(Opera.anul)
        process("opere.html", context={"opere": opere})
        teme = pny.select(tema for tema in Tema)
        process("teme.html", context={"teme": teme})
        sentimente = pny.select(tema for tema in Sentiment)
        process("sentimente.html", context={"sentimente": sentimente})
        process("rolul_notatilor.html")
        process("perspectiva_narativa.html")
        process("modalitati_de_caracterizare.html")
        process("mijloacele_artistice.html")
        morale = pny.select(trasatura for trasatura in Trasatura if trasatura.tip=="moral??")
        fizice = pny.select(trasatura for trasatura in Trasatura if trasatura.tip=="fizic??")
        process("trasaturi.html", context={"morale": morale, "fizice": fizice})
        teme_fara_sentimente = pny.select(tema for tema in Tema if not isinstance(tema, Sentiment))
        nn_ser = NevNumeSerializer()
        op_ser = OperaSerializer()
        asem_ser = OperaAsemSerializer()
        # asem_ser = OperaCurentSerializer()
        cuv_ser = CuvantSerializer()
        op_lir_ser = OperaLiricaSerializer()

        opere_by_curent = pny.select((opera.curent.nume, opera) for opera in Opera)
        opere_by_perioada = pny.select((opera.perioada, opera) for opera in Opera)

        substantive = pny.select(sub for sub in Substantiv)
        verbe = pny.select(verb for verb in Verb)
        structalte = pny.select(sa for sa in StructAlt)


        process("jocuri/limb.html")
        process("res/js/joc.js", context={"teme": nn_ser.query_serialize(teme_fara_sentimente), "sentimente": nn_ser.query_serialize(sentimente), 
            "morale": nn_ser.query_serialize(morale), "fizice": nn_ser.query_serialize(fizice), "opere": op_ser.query_serialize(opere), "opere_curente": asem_ser.query_serialize(opere_by_curent),
            "opere_perioade": asem_ser.query_serialize(opere_by_perioada), "cuvinte_din_compuneri": cuv_ser.query_serialize(substantive, verbe, structalte, opere_lirice), "opere_lirice": op_lir_ser.query_serialize(opere_lirice)})

        for opera in opere_lirice:
            process(f"opera/{linkify(opera.titlu)}.html", context = {"opera": opera}, template_path="opera_lirica.html")
        
        print("Pages Successfully rendered.")

if __name__=="__main__":
    render()

