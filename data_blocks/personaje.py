

from models import Opera


def load_personaje():
    personaje_list = [
        (Opera.cu_titlu("O scrisoare pierdută"),
            [
                {"nume": "Nae Cațavencu",  "rol": {"nume": "influent proprietar de ziar", "nev": ""}},
                {"nume": "Zaharia Trahanache",  "rol": {"nume": "președinte partidului la putere", "nev": ""}},
                {"nume": "Zoe Trahanache",  "rol": {"nume": "soția lui Zaharia și iubitul lui Tipătescu", "nev": ""}},
                {"nume": "Ghiță Pristanda",  "rol": {"nume": "polițistul orașului", "nev": ""}},
                # {"nume": "Cetățeanul turmentat",  "rol": {"nume": "", "nev": ""}},
                # {"nume": "Agamemnon Dandanache",  "rol": {"nume": "", "nev": ""}},
                # {"nume": "Tache Farfuridi",  "rol": {"nume": "", "nev": ""}},        
                # {"nume": "Iordache Brânzovenescu",  "rol": {"nume": "", "nev": ""}},        
                {"nume": "Ștefan Tipătescu",  "rol": {"nume": "prefectul în funcție", "nev": "jelenlegi prefektus"}},        
                {"nume": "Ionescu și Popescu",  "rol": {"nume": "dascăli, partidul de opoziție", "nev": "tanítók, ellenzéki párt"}},        
            ]
        )
    ]
    return personaje_list
