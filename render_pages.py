from re import split
import pony.orm as pny
from models import Opera, OperaLirica, Sentiment, Tema, Trasatura
from pathlib import Path

# pure_path = Path.cwd() / "sites"

def new_liner(text):
    return "\n".join([f'<p class="szeles">{row}</p>' for row in text.replace("\n", "<br>\n").split("<br>\n<br>\n")])

def sentiment_decor(tema):
    if isinstance(tema, Sentiment):
        return "sentiment"
    else:
        return ""

def trasatura_decor(trasatura):
    if trasatura.tip == "morală":
        return "morala"
    else:
        return "fizica"


def e_sentiment(tema):
    if isinstance(tema, Sentiment):
        return "(sentiment)"
    else:
        return ""

# def split_by(text):


from jinja2 import Environment, FileSystemLoader, select_autoescape
env = Environment(
    loader=FileSystemLoader("templates"),
    autoescape=select_autoescape()
)

env.filters['new_liner'] = new_liner
env.filters['e_sentiment'] = e_sentiment
env.filters['sentiment_decor'] = sentiment_decor

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
    (Path(f"./sites")/file_name).write_text(site, encoding='utf-8')


with pny.db_session:
    opere_lirice = pny.select(opera for opera in OperaLirica)
    process("opere_lirice.html", context={"opere" : opere_lirice})
    process("index.html")
    opere = pny.select(opera for opera in Opera)
    process("opere.html", context={"opere": opere})
    teme = pny.select(tema for tema in Tema)
    process("teme.html", context={"teme": teme})
    sentimente = pny.select(tema for tema in Sentiment)
    process("sentimente.html", context={"sentimente": sentimente})
    process("rolul_notatilor.html")
    process("perspectiva_narativa.html")
    process("modalitati_de_caracterizare.html")
    process("mijloacele_artistice.html")
    morale = pny.select(trasatura for trasatura in Trasatura if trasatura.tip=="morală")
    fizice = pny.select(trasatura for trasatura in Trasatura if trasatura.tip=="fizică")
    process("trasaturi.html", context={"morale": morale, "fizice": fizice})
    process("jocuri/limb.html", context={"teme": teme})

    for opera in opere_lirice:
        process(f"opera/{opera.titlu.lower()}.html", context = {"opera": opera}, template_path="opera_lirica.html")


