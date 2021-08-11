from models import Atribut, Extra, Gen, CurentLiterar, Opera, OperaDramatica, OperaEpica, Rima, OperaLirica, Sentiment, Tema, Trasatura
from pathlib import Path
import pony.orm as pny
def citire_poeziei(titlu):
    creatie_path = Path("./templates/texte/poezii")
    # creatie_path = creatie_path.resolve()
    # print("\n\n\n\n\n\n\n\n\n\n\n")
    # print((creatie_path/f"{titlu}.txt").read_text(encoding="utf-8"))
    # print("\n\n\n\n\n\n\n\n\n\n\n")
    return ((creatie_path/f"{titlu}.txt").read_text(encoding="utf-8"))
    # .replace('/n', '<br>/n')


def load_opere():
    # print("\n\n\n\n\n\n\n\n\n\n\n")
    # q = pny.select(cl for cl in CurentLiterar)
    # q.show()
    # print("\n\n\n\n\n\n\n\n\n\n\n")

    opere_lirice_list = [
        {"titlu": "Plumb", "artist": "George Bacovia", "curent": CurentLiterar.cu_nume("simbolism"), "gen": Gen.e("liric"), "anul": 1916, "tema": Atribut(scurt="--"), "semnificatia_titlului": Atribut(scurt="motivul central"),
            "perioada": "antebelică",
            "rima": Rima.e("îmbrățișată"), "masura": "10 silabe", "ritm": "iambic, amfibrah", "creatia": citire_poeziei("plumb"),
            "motive_specifice":"plumb:ólom, ploaie:eső, singurătate:magány, parc părăsit:elhagyott park, cimitir fantomic:szellemtemető, înmormântări desuete:elavult temetkezések", "revista":"Plumb", "perioada": "antebelică", "specie": "elegie (artă poetică)",
            "linkuri": "psihotrop,https://youtu.be/qqBhVh3ZaWg;5 minute pentru BAC,https://youtu.be/pS73lnXdoE4"},
        {"titlu": "Sara pe deal", "artist": "Mihai Eminescu", "curent": CurentLiterar.cu_nume("romantism"), "gen": Gen.e("liric"), "anul": 1885, "tema": Atribut(scurt="natura, iubirea"), "semnificatia_titlului": Atribut(scurt="locul și timpul întâlnirii intimă"),
            "rima": Rima.e("împerecheată"), "masura": "12 silabe", "ritm": "un coriamb, doi dactili şi un troheu", "creatia": citire_poeziei("sara_pe_deal"),
            "motive_specifice":"clopot:harang, stele:csillagok, salcâm:akácfa, cer:ég, deal:domb, fântână:kút", "revista":"Convorbiri literare", "perioada": "epoca marilor clasici", "specie": "idilă (cu elemente de pastel)",
            "linkuri": "1md.online-analiză,https://1md.online/versuri/comentariu/eminescu-sara-pe-deal"},
        {"titlu": "Flori de mucigai", "artist": "Tudor Arghezi", "curent": CurentLiterar.cu_nume("modernism"), "gen": Gen.e("liric"), "anul": 1931, 
            "tema": Atribut(scurt="condiția poetului", rovid="a költő szerepe", lung="Tema prezintă condiția poetului damnat care este contrâns să creeze artă eternă în cele mai grele condiții.", hosszu="A vers témája bemutatja az elítélt költő szerepét, aki arra kényszerül, hogy a legnehezebb körülmények között maradandót alkosson."), 
            "semnificatia_titlului": Atribut(scurt="metaforă/oximoron, frumosul din urât", lung="Titlul (metaforă/oximoron) sugerează că frumosul artistic poate crește și din urât, așa cum florile cresc deasupra mucegaiului.", rovid= "metafora/oximoron, szép a csúfból", hosszu="A cím sugallja, hogy a művészi szép a csúnyából is kinőhet, mintahogy a penészen is nőnek virágok."),
            "rima": Rima.e("liberă"), "masura": "variabilă", "ritm": "modern", "creatia": citire_poeziei("flori_de_mucigai"),
            "motive_specifice":"perete celulei:cellafalak, firidă:cella, întuneric:sötétség, groapă:gödör, ploaie:eső", "revista":"Flori de mucigai", "perioada": "interbelică",  "specie": "artă poetică",
            "linkuri": "psihotrop,https://youtu.be/r5BvyojeHqw;video-analiză,https://youtu.be/24rpox8HIRU",
            "discursul_liric": Atribut(scurt="profund suiectiv", rovid="erőteljesen szubiektív", lung="Discursul liric este dominat de un profund subiectivism.", hosszu="A versbeszédet mély szubiektivizmus uralja."),
            "moduri_de_expunere": Atribut(scurt="descriere artistică tip cadru și monolog liric interior", rovid="művészi keretleírás és belső lírai monológ", lung="Modurile de expunere prezente în poezie sunt descrierea artistică de tip cadru, interiorul închisorii și monolog liric interior aprofundat.", hosszu="A versben jelenlevő előadási módok a művészi keretleírás, a börtön belseje és az elmélyült belső lírai monológ."),
            "explicare_structurii": [
                Atribut(lung="În prima strofă eul liric descrie condiția dramatică a poetului pe care Dumnezeu l-a aruncat și l-a uitat în Infernul închisorii.\
                    Creatorul și în aceste condiții e blestemat să creeze prin toate mijloacele care îi stau la îndemână.\
                    El își scrie opera pe zidurile celulei zgâriind cu unghia de la mână în lipsa unui instrument de scris.\
                    \r\nNu este ajutat de divinitate care nu-i trimite animale sfinte ca evangheliștilor, cele trei animale sfinte, taurul, leul și vulturul apar ca simboluri religioase, semnificând jertfa.",
                hosszu="Az első versszakban a lírai én leírja a költő drámai helyzetét, akit Isten a börtön Poklába vetett és ott felejtett.\
                    Az alkotó ezek a feltételek között is arra van átkozva, hogy alkosson, minden keze ügyében levő eszközzel.\
                    Ő írja a művét, kezének körmével karcolva a cella falaiba íróeszköz hiányában.\
                    \r\nNem segíti őt Isten se, aki nem küld neki szent állatokat, mint az Evangelistáknak a három szent állatot, a bika, az oroszlán és a keselyű vallási szimbolumokként jelennek meg, az áldozatot jelképezve.",
                scurt="Prima strofă: condiția dramatică în închisoare, zgâriere cu ungii, animalele sfinte", rovid="Az első versszak: drámai helyzet a börtönben, körömmel karcolás, szent állatok"),
                Atribut(lung="Strofa a doua descrie caracteristicile unei asemenea opere literare , născută din durere, doliu, revoltă și lipsa de credință.\
                    E o poezie la fel ca și viața condamnaților.\
                    Versurilor le este sete, foame, suferă de frig și apar ca versurile morții, dar sunt eterne deoarece sunt născută prin jertfă.\
                    \r\nLa un anume moment dat creatorul vrea să-și completeze opera, dar îsi pierde instrumentul divin și nu are încotro trebuie să-și folosească unghiile de la mâna stângă, simbolul demonic, apelând la ajutorul forțelor negative pentru a-și termina opera.\
                    \r\nInstrumentul de scris este un simbol satanic, diavolesc care simbolizează în cele din urmă lipsa credinței în Dumnezeu.",
                hosszu="A második szakasz egy hasonló, fájdalomból, gyászból és hitvesztettségből született irodalmi alkotás jellemzőit írja le.\
                    A vers ugyanolyan, mint az elítéltek élete.\
                    A versorok szomjasak, éhesek, fáznak és a halál soraiként jelennek meg, de végtelenek, mivel áldozat által születtek.\
                    \r\nEgy adott pillantban az alkotó be szeretné fejezni művét, de elveszti az isteni eszközét és nincs amit tegyen, használnia kell a bal keze körmeit, démoni szibolum, negatív erők segítségét kéri, hogy befejezhesse művét.\
                    \r\nAz íróeszköz sátáni, ördögi szimbolum, amely a végén az Istenbe vetett hit hiányát szimbolizálja."
                ,scurt="Strofa a doua: lipsa credinței, versurile, jertfă, lipsa instrumentului divin, simbol satanic", rovid="Az második versszak: hitvesztettség, a verssorok, isteni eszköz hiánya, sátáni szimbolum."),

            ],
            "justificarea_incadrarii": {"scurt": "limbajul metaforic, modernitate elementelor de versificație", "rovid": "metaforikus nyelvezet, modern verselési elemek", "lung": "Modernismul fiind prezent în poezie prin folosirea limbajului metaforic și prin modernitatea elementelor de versificație, rima liberă și măsura inegală.", "hosszu": "A modernizmus megjelenik a metaforikus nyelvezet használatában és a verselési elemek modernségében, a szabadrím és a szabálytalan versmérték."},
            "extras": [
                Extra(lung="Tudor Arghezi unul dintre cei mai importanți reprezentați ai modernismului românesc.", hosszu="Tudor Arghezi egyike a román modernizmus legfontosabb képviselőinek.", scurt="Arghezi: important reprezentant", rovid="Arghezi: fontos képviselő"),
                Extra(scurt="artă poetică a esteticii urâtului", rovid="művészi hitvallása a csúf esztétikájának", lung="E o artă poetică a esteticii urâtului, estetică specifică creațiilor argheziene.", hosszu="Költői hitvallása a csúf esztétikájának, mely az Arghezi alkotások sajátos esztétikája."),
                Extra(scurt='inspirată de: "Les fluers du mal"', rovid='inspirálodott: "Romlás virágai"', lung='A fost inspirat de operă "Les fleurs du mal" scrisă de Baudelaire.', hosszu='Baudelaire "Romlás virágai" című alkotása inspirálta.'),
                Extra(scurt="motive vieții condamnaților", rovid="körlüményes élet motívumai", lung="Motive literare specifice a vieții condamnaților sugerează lipsa de libertate, lipsa de speranță și așteptarea morții.", hosszu="A körülményes élet sajátos irodalmi motívumai a szabadsáhiányát, a reményvesztettséget és a halál várását sugallják."),
                Extra(scurt='concluzie', rovid='következtetés', lung='În concluzie, se poate afirma că mesajul artistic al poeziei transmite viziunea specific argheziană despre creația artistică, un blestem care se naște din urât și care posedă trăsăturile condițiilor în care a fost creată, prin durere și sacrificiu.', hosszu='Következtetésképpen, kijelenthető, hogy vers művészi üzenete közvetíti a sajátos arghezista látomást a művészi alkotásról, egy átok, amely a csúfból születik és birtokolja a fájdalomból és áldozatból keletkezett művek jellemzőit.'),
                ]}
    ]

    opere_epice_list = [
        {"titlu": "Povestea lui Harap-Alb", "artist": "Ion Creangă", "curent": CurentLiterar.cu_nume("romantic realism"), "gen": Gen.e("epic"), "anul": 1877, "tema": Atribut(scurt="maturizarea"), "semnificatia_titlului": Atribut(scurt="numele personajului principal"),
            "perioada": "epoca marilor clasici", "specie": "basm cult", "revista": "Convorbiri literare",
            "linkuri": "psihotrop,https://youtu.be/t0BvXdPksi4"},
        {"titlu": "Enigma Otiliei", "artist": "George Călinescu", "curent": CurentLiterar.cu_nume("modernism, realism"), "gen": Gen.e("epic"), "anul": 1938, "tema": Atribut(scurt="iubirea, averea, moștenirea și viața socială"), "semnificatia_titlului": Atribut(scurt="misterul, simbolizează feminin etern"),
            "perioada": "interbelică", "specie": "roman modern, realist obiectiv", "revista": "",
            "linkuri": "psihotrop,https://youtu.be/v9QgsU1FM2s"},
        {"titlu": "Ultima noapte de dragoste, întâia noapte de război", "artist": "Camil Petrescu", "curent": CurentLiterar.cu_nume("modernism"), "gen": Gen.e("epic"), "anul": 1930, "tema": Atribut(scurt="iubirea și războiul"), "semnificatia_titlului": Atribut(scurt="două nopți"),
            "perioada": "interbelică", "specie": "roman psihologic, modern subiectiv", "revista": "",
            "linkuri": "psihotrop,https://youtu.be/1h8p0W_9cns"},
        {"titlu": "Moara cu noroc", "artist": "Ioan Slavici", "curent": CurentLiterar.cu_nume("realism"), "gen": Gen.e("epic"), "anul": 1881, "tema": Atribut(scurt="averea, familia, iubirea"), "semnificatia_titlului": Atribut(scurt="locul acțiunii, oximoron simbolic"),
            "perioada": "epoca marilor clasici", "specie": "nuvelă psihologică și realistă", "revista": "",
            "linkuri": "psihotrop,https://youtu.be/Vq3VaFsOtCU"},
    ]


    opere_dramatice_list = [
        {"titlu": "O scrisoare pierdută", "artist": "Ion Luca Caragiale", "curent": CurentLiterar.cu_nume("realism"), "gen": Gen.e("dramatic"), "anul": 1884, "tema": Atribut(scurt="politicieni corupți: viața politică și de familie"), "semnificatia_titlului": Atribut(scurt="leitmotiv, instrumentul șantajului"),
            "perioada": "epoca marilor clasici", "specie": "comedie",
            "linkuri": "psihotrop,https://youtu.be/Lk_u0qFOC4w;5 minute pentru BAC,https://youtu.be/ghWLmbX5bvg"},
    ]

    return opere_lirice_list, opere_epice_list, opere_dramatice_list