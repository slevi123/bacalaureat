teme = [{"nev": "természet", "nume": "natură"}, {"nev": "emberi élet", "nume": "viață omului"}, {"nev": "születés", "nume": "naștere"}, {"nev": "szerelem, szeretet", "nume": "iubire"}, {"nev": "nevelés", "nume": "educație"}, {"nev": "öregkor", "nume": "bătrânețe"}, {"nev": "halál", "nume": "moarte"}, {"nev": "emberi sors", "nume": "destin uman"}, {"nev": "vallás", "nume": "religie"}, {"nev": "hit", "nume": "credință"}, {"nev": "művészet", "nume": "artă"}, {"nev": "kultúra", "nume": "cultură"}, {"nev": "idő", "nume": "timp"}, {"nev": "haza", "nume": "patrie"}, {"nev": "művészi alkotás", "nume": "creație artistică"}]
sentimente = [{"nev": "boldogság", "nume": "fericire"}, {"nev": "vidámság", "nume": "veselie"}, {"nev": "öröm", "nume": "bucurie"}, {"nev": "szerelem, szeretet", "nume": "dragoste"}, {"nev": "vágy", "nume": "dor"}, {"nev": "vágyakozás", "nume": "dorință"}, {"nev": "halál", "nume": "tristețea"}, {"nev": "sajnálat", "nume": "părerea de rău"}, {"nev": "lelki fájdalom", "nume": "durere sufletească"}, {"nev": "szenvedés", "nume": "suferință"}, {"nev": "melankólia", "nume": "melancolie"}, {"nev": "nosztalgia", "nume": "nostalgie"}, {"nev": "depresszió", "nume": "depresie"}, {"nev": "létfélelem", "nume": "spaimă existențială"}, {"nev": "harag", "nume": "supărarea"}, {"nev": "gyász", "nume": "jale"}, {"nev": "magány", "nume": "singurătate"}, {"nev": "szenvedély", "nume": "pasiune"}, {"nev": "gyűlölet", "nume": "ură"}, {"nev": "irigység", "nume": "gelozie"}]
morale = [{"nev": "jó", "nume": "bun"}, {"nev": "rossz", "nume": "rău"}, {"nev": "okos", "nume": "deștept"}, {"nev": "szerető", "nume": "iubitor"}, {"nev": "tapintatos", "nume": "amabil"}, {"nev": "idétlen", "nume": "urâcios"}]
fizice = [{"nev": "magas", "nume": "înalt"}, {"nev": "gyenge", "nume": "slab"}, {"nev": "rövid", "nume": "scund"}, {"nev": "kövér", "nume": "gras"}, {"nev": "szőke", "nume": "blond"}, {"nev": "göndör", "nume": "creț"}, {"nev": "barna", "nume": "saten"}]

function ranlist(list){
    return list[~~(Math.random() * list.length)];
}

function remove_children(dom_element){
    let child = dom_element.lastElementChild; 
    while (child) {
        dom_element.removeChild(child);
        child = dom_element.lastElementChild;
    }
}

function on_start(){
    document.getElementById("start-button").style.display = "none";
    document.getElementById("game").style.display = "block";
    let timer_dom = document.getElementById("timer")
    let timp = 0;
    timer_dom.textContent="timpul: 0";
    setInterval(()=>{
        timp += 1;
        let minutes = ~~(timp/60)
        if (minutes){
            let seconds = timp%60;
            let hours = ~~(minutes/60);
            if (hours){
                minutes = minutes%60;
                timer_dom.textContent="timpul: "+ hours + " h, " +minutes + " min, " + seconds +" sec";
                // TODO: gameover after an hour
            } else timer_dom.textContent="timpul: "+ minutes + " min, " + seconds +" sec";
        } else timer_dom.textContent="timpul: "+ timp + " sec";
    }, 1000);
    new_word();
}

function add_answer_child(parent, content, answer_count){
    let new_dom = document.createElement("p");
    new_dom.textContent = content;
    new_dom.setAttribute("answer-count", answer_count);
    parent.appendChild(new_dom);
}


function new_word(){
    question_dom = document.getElementById("question")
    answers_dom = document.getElementById("answer-options")

    let answer_count = 4;

    let question = ranlist(teme);
    let answer_id = ~~(Math.random * (answer_count))
    let answers = [];
    let temp_option = undefined;
    for (let i=0; i<answer_count; i++){
        if (i==answer_id){
            answers.push(question);
        } else{
            do{
                temp_option = ranlist(teme);
            } while(question==temp_option);
            answers.push(temp_option);
        }
    }

    question_dom.textContent = question.nev;

    remove_children(answers_dom)
    for (let i=0; i<answer_count; i++){
        add_answer_child(answers_dom, answers[i].nume, i);
    }
}

// window.addEventListener("load", );