from models import Substantiv, Verb, StructAlt


cuvinte_din_enigma_otiliei = [
    [Substantiv,
        lambda cuvant:cuvant["singular"]["nume"],
        "search_value",
        [
            {"singular": {"nume": "unchi", "nev": "nagybácsi"}},
            {"singular": {"nume": "moșier", "nev": "földbirtokos"}},
            {"singular": {"nume": "înțelegere", "nev": "megértés"}},
            {"singular": {"nume": "dreptate", "nev": "igazság"}},
            # {"singular": {"nume": "", "nev": ""}},
        ]
    ],
    [Verb,
        lambda cuvant:cuvant["infinitiv"]["nume"],
        "search_value",
        [
            {"infinitiv": {"nume": "a prelucra", "nev": "feldolgozni"}},
            {"infinitiv": {"nume": "a se dezvolta", "nev": "fejlődni"}},
            {"infinitiv": {"nume": "a satisface", "nev": "eleget tenni"}},
            {"infinitiv": {"nume": "avocat", "nev": "ügyész"}},
            # {"infinitiv": {"nume": "", "nev": ""}},
        ]
    ],
    [StructAlt,
        lambda cuvant:"",
        "nume",
        [
            {"nume": "ostil", "nev": "ellenséges"},
            {"nume": "primire rece", "nev": "hideg fogadtatás"},
            {"nume": "îl primește cu drag", "nev": "kedvesen fogadja"},
            {"nume": "face cunoștință", "nev": "megismerkedik"},
            {"nume": "poftă pentru lux", "nev": "luxusvágy"},
            {"nume": "bogat", "nev": "gazdag"},
            {"nume": "pune mâna pe", "nev": "ráteszi a kezét"},
            {"nume": "îi fură banii", "nev": "ellopja a pénzét"},
            {"nume": "iubire adevărată", "nev": "igaz szerelem"},
            {"nume": "reușit în viață", "nev": "sikeres az életben"},
            {"nume": "situație enigmatică", "nev": "rejtélyes helyzet"},
            {"nume": "martorul evenimentelor", "nev": "az események tanúja"},
            # {"nume": "", "nev": ""},
        ]
    ],
]