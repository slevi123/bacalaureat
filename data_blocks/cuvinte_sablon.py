from models import Substantiv, Verb, StructAlt


cuvinte_din_enigma_otiliei = [
    [Substantiv,
        lambda cuvant:cuvant["singular"]["nume"],
        "search_value",
        [
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            {"singular": {"nume": "", "nev": ""}},
            # {"singular": {"nume": "", "nev": ""}},
        ]
    ],
    [Verb,
        lambda cuvant:cuvant["infinitiv"]["nume"],
        "search_value",
        [
            {"infinitiv": {"nume": "", "nev": ""}},
            {"infinitiv": {"nume": "", "nev": ""}},
            {"infinitiv": {"nume": "", "nev": ""}},
            {"infinitiv": {"nume": "", "nev": ""}},
            {"infinitiv": {"nume": "", "nev": ""}},
            {"infinitiv": {"nume": "", "nev": ""}},
            # {"infinitiv": {"nume": "", "nev": ""}},
        ]
    ],
    [StructAlt,
        lambda cuvant:"",
        "nume",
        [
            {"nume": "", "nev": ""},
            {"nume": "", "nev": ""},
            {"nume": "", "nev": ""},
            {"nume": "", "nev": ""},
            {"nume": "", "nev": ""},
            {"nume": "", "nev": ""},
            {"nume": "", "nev": ""},
            {"nume": "", "nev": ""},
            # {"nume": "", "nev": ""},
        ]
    ],
]