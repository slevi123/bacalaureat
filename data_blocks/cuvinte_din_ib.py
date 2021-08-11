from models import Substantiv, Verb, StructAlt


cuvinte_din_ib = [
    [Substantiv,
        lambda cuvant:cuvant["singular"]["nume"],
        "search_value",
        [
            {"singular": {"nume": "peisaj", "nev": ""}},
            {"singular": {"nume": "călător", "nev": ""}},
            {"singular": {"nume": "familia", "nev": ""}},
            {"singular": {"nume": "alegere", "nev": ""}},
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
            {"infinitiv": {"nume": "a influența", "nev": ""}},
            {"infinitiv": {"nume": "a exista", "nev": ""}},
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
            {"nume": "traseu educațional", "nev": ""},
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