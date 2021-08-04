function ranlist(list){
    return list[~~(Math.random() * list.length)];
}


function place(){
    magyar_card = document.getElementById("a")
    roman_card = document.getElementById("b")

    var tema = ranlist(teme)
    // var 

    var szo_p = document.createElement("p");
    var cuvant_p = document.createElement("p");

    szo_p.textContent = tema.nev
    cuvant_p.textContent = tema.nume

    magyar_card.appendChild(szo_p);
    roman_card.appendChild(cuvant_p)
}

window.addEventListener("load", place);