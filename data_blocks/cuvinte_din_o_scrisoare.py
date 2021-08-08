from models import Substantiv, Verb, StructAlt


cuvinte_din_o_srisoare = [
    [Substantiv,
        lambda cuvant:cuvant["singular"]["nume"],
        "search_value",
        [
            {"singular": {"nume": "capodoperă", "nev": "remekmű"}},
            {"singular": {"nume": "râset", "nev": "nevetés"}},
            {"singular": {"nume": "leitmotiv", "nev": "visszatérő motívum"}},
        ]
    ],
    [Verb,
        lambda cuvant:cuvant["infinitiv"]["nume"],
        "search_value",
        [
            {"infinitiv": {"nume": "a râde", "nev": "nevetni"}},

        ]
    ],
    [StructAlt,
        lambda cuvant:"",
        "nume",
        [
            {"nume": "caracter moralizator", "nev": "erkölcsi jelleg"},
        ]
    ],
]