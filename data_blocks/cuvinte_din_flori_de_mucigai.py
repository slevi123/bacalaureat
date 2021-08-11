from models import Substantiv, Verb, StructAlt


cuvinte_din_flori_de_mucigai = [
    [Substantiv,
        lambda cuvant:cuvant["singular"]["nume"],
        "search_value",
        [
            {"singular": {"nume": "condamnat", "nev": "elítélt"}},
            {"singular": {"nume": "speranță", "nev": "remény"}},
            {"singular": {"nume": "blestemat", "nev": "elátkozott"}},
            # {"singular": {"nume": "damnat", "nev": "elátkozott"}},
            {"singular": {"nume": "mijloc", "nev": "eszköz"}},
            {"singular": {"nume": "infern", "nev": "pokol"}},
            {"singular": {"nume": "menire", "nev": "hivatás"}},
            {"singular": {"nume": "divinitate", "nev": "istenség"}},
            # {"singular": {"nume": "", "nev": ""}},
        ]
    ],
    [Verb,
        lambda cuvant:cuvant["infinitiv"]["nume"],
        "search_value",
        [
            {"infinitiv": {"nume": "a constrânge", "nev": "kényszeríteni"}},
            {"infinitiv": {"nume": "a arunca", "nev": "hajítani"}},
            # {"infinitiv": {"nume": "", "nev": ""}},
        ]
    ],
    [StructAlt,
        lambda cuvant:"",
        "nume",
        [
            {"nume": "la un anume moment", "nev": "egy adott pillanatban"},
            # {"nume": "sta la ", "nev": ""},
            {"nume": "în cele din urmă", "nev": "a végén"},
            {"nume": "îi stau la indemână", "nev": "keze ügyében vannak"},
            {"nume": "nu are încotro", "nev": "nincs mit tegyen"},
            {"nume": "e constrâns", "nev": "kényszerítve van"},
            {"nume": "le este sete", "nev": "szomjasak"},
            {"nume": "le este foame", "nev": "éhesek"},
            {"nume": "suferă de frig", "nev": "fázik"},
            {"nume": "diavolesc", "nev": "ördögi"},
            # {"nume": "", "nev": ""},
        ]
    ],
]