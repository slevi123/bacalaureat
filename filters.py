from models import Sentiment

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

def linkify(nume):
    return nume.lower().replace(" ", "_")
    
def register_filters(env):
    env.filters['new_liner'] = new_liner
    env.filters['e_sentiment'] = e_sentiment
    env.filters['sentiment_decor'] = sentiment_decor
    env.filters['linkify'] = linkify
