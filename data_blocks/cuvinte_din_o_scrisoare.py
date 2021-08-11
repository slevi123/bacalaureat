from models import Substantiv, Verb, StructAlt


cuvinte_din_o_scrisoare = [
    [Substantiv,
        lambda cuvant:cuvant["singular"]["nume"],
        "search_value",
        [
            {"singular": {"nume": "capodoperă", "nev": "remekmű"}},
            {"singular": {"nume": "râset", "nev": "nevetés"}},
            {"singular": {"nume": "leitmotiv", "nev": "visszatérő motívum"}},
            {"singular": {"nume": "șantaj", "nev": "zsarolás"}},
            {"singular": {"nume": "dascăl", "nev": "tanító"}},
            {"singular": {"nume": "adversar", "nev": "ellenfél"}},
            {"singular": {"nume": "dușman", "nev": "ellenség"}},
            {"singular": {"nume": "funcționar", "nev": "hivatalnok"}},
            {"singular": {"nume": "parvenitism", "nev": "nagyravágyás"}},
            # {"singular": {"nume": "", "nev": ""}},
        ]
    ],
    [Verb,
        lambda cuvant:cuvant["infinitiv"]["nume"],
        "search_value",
        [
            {"infinitiv": {"nume": "a râde", "nev": "nevetni"}},
            {"infinitiv": {"nume": "a sprijini", "nev": "támogatni"}},
            {"infinitiv": {"nume": "a împăca", "nev": "kibékülni"}},
            {"infinitiv": {"nume": "a spiona", "nev": "kémkedni"}},
            {"infinitiv": {"nume": "a atinge", "nev": "elérni"}},

        ]
    ],
    [StructAlt,
        lambda cuvant:"",
        "nume",
        [
            {"nume": "caracter moralizator", "nev": "erkölcsi jelleg"},
            {"nume": "partidul de guvernământ", "nev": "kormánypárt"},
            {"nume": "partidul de opoziție", "nev": "ellenzéki párt"},
            {"nume": "situații jenante", "nev": "szégyenletes helyzetek"},
            {"nume": "să spioneze", "nev": "hogy kémkedjen"},
            {"nume": "tipul încornoratului", "nev": "a felszarvazott tipusa"},
            {"nume": "tipul amorezului", "nev": "a nőcsábász tipusa"},
            {"nume": "tipul femeii ușoare", "nev": "a könnyű nő tipusa"},
            {"nume": "incult", "nev": "műveletlen"},
            {"nume": "contemporană", "nev": "jelenkori"},
            {"nume": "triunghiul conjugal", "nev": "szerelmi háromszög"},
            # {"nume": "", "nev": ""},
        ]
    ],
]