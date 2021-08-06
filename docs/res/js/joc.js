teme = [{"nev": "természet", "nume": "natură"}, {"nev": "emberi élet", "nume": "viață omului"}, {"nev": "születés", "nume": "naștere"}, {"nev": "szerelem, szeretet", "nume": "iubire"}, {"nev": "nevelés", "nume": "educație"}, {"nev": "öregkor", "nume": "bătrânețe"}, {"nev": "halál", "nume": "moarte"}, {"nev": "emberi sors", "nume": "destin uman"}, {"nev": "vallás", "nume": "religie"}, {"nev": "hit", "nume": "credință"}, {"nev": "művészet", "nume": "artă"}, {"nev": "kultúra", "nume": "cultură"}, {"nev": "idő", "nume": "timp"}, {"nev": "haza", "nume": "patrie"}, {"nev": "művészi alkotás", "nume": "creație artistică"}]
sentimente = [{"nev": "boldogság", "nume": "fericire"}, {"nev": "vidámság", "nume": "veselie"}, {"nev": "öröm", "nume": "bucurie"}, {"nev": "szerelem, szeretet", "nume": "dragoste"}, {"nev": "vágy", "nume": "dor"}, {"nev": "vágyakozás", "nume": "dorință"}, {"nev": "halál", "nume": "tristețea"}, {"nev": "sajnálat", "nume": "părerea de rău"}, {"nev": "lelki fájdalom", "nume": "durere sufletească"}, {"nev": "szenvedés", "nume": "suferință"}, {"nev": "melankólia", "nume": "melancolie"}, {"nev": "nosztalgia", "nume": "nostalgie"}, {"nev": "depresszió", "nume": "depresie"}, {"nev": "létfélelem", "nume": "spaimă existențială"}, {"nev": "harag", "nume": "supărarea"}, {"nev": "gyász", "nume": "jale"}, {"nev": "magány", "nume": "singurătate"}, {"nev": "szenvedély", "nume": "pasiune"}, {"nev": "gyűlölet", "nume": "ură"}, {"nev": "irigység", "nume": "gelozie"}]
morale = [{"nev": "jó", "nume": "bun"}, {"nev": "rossz", "nume": "rău"}, {"nev": "okos", "nume": "deștept"}, {"nev": "szerető", "nume": "iubitor"}, {"nev": "tapintatos", "nume": "amabil"}, {"nev": "idétlen", "nume": "urâcios"}]
fizice = [{"nev": "magas", "nume": "înalt"}, {"nev": "gyenge", "nume": "slab"}, {"nev": "rövid", "nume": "scund"}, {"nev": "kövér", "nume": "gras"}, {"nev": "szőke", "nume": "blond"}, {"nev": "göndör", "nume": "creț"}, {"nev": "barna", "nume": "saten"}]


class TemaKor {
    constructor(){
        this.list = [];
    }

    get question(){
        return ranlist(this.list);
    }

    
}

class GameOptions {
    constructor(){
        this.answer_count = 4;
        this.answer_id = undefined;
        this._punctaj = 0;

        this.__punctaj_dom__ = undefined;
    }

    get punctaj(){
        return this._punctaj;
    }

    set punctaj(new_value){
        this._punctaj = new_value;
        if (this.__punctaj_dom__) this.__punctaj_dom__.textContent = "punctaj: " + this._punctaj;
    }

    bind(){
        this.__punctaj_dom__ = document.getElementById("punctaj");

        let answer_num_dom = document.getElementById("answer-num-option");
        this.answer_count = answer_num_dom.value;
        answer_num_dom.addEventListener("change", ()=> {
            this.answer_count = answer_num_dom.value;
        })
    }
}

let game_options = new GameOptions()

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
function setTime(timer_dom, timp){
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
}

function on_start(){
    game_options.bind();

    document.getElementById("start-button").style.display = "none";
    document.getElementById("game").style.display = "block";
    let timer_dom = document.getElementById("timer")
    let timp = 0;
    timer_dom.textContent="timpul: 0";
    setInterval(()=>{
        timp += 1;
        setTime(timer_dom, timp);
    }, 1000);
    new_word();
}

function evaluate_solution(user_answer_id){
    if (game_options.answer_id==user_answer_id){
        game_options.punctaj +=1;
    }

    answer_doms = document.getElementById("answer-options").children
    Array.from(answer_doms).forEach((answer_dom)=>{
        let count = answer_dom.getAttribute("answer-count");
        if (count==user_answer_id) answer_dom.style.border="3px solid red";;
        if (count==game_options.answer_id) answer_dom.style.border="3px solid green";        
    })

    window.setTimeout( new_word, 2000);
}

function add_answer_child(parent, content, answer_count){
    let new_dom = document.createElement("p");
    new_dom.textContent = content;
    new_dom.setAttribute("answer-count", answer_count);
    new_dom.onclick=()=>evaluate_solution(answer_count);
    parent.appendChild(new_dom);
}


function new_word(){
    let question_dom = document.getElementById("question")
    let answer_doms = document.getElementById("answer-options")

    let question = ranlist(teme);
    game_options.answer_id = ~~(Math.random() * game_options.answer_count)
    // let answer_id = 3
    let answers = [];
    let temp_option = undefined;
    if (teme.length > game_options.answer_count){
        for (let i=0; i<game_options.answer_count; i++){
            if (i==game_options.answer_id){
                answers.push(question);
            } else{
                do{
                    temp_option = ranlist(teme);
                } while(answers.includes(temp_option) || question==temp_option);
                answers.push(temp_option);
            }
        }
    } else {
        answers = teme;
        
    }

    question_dom.textContent = question.nev;

    remove_children(answer_doms)
    for (let i=0; i<game_options.answer_count; i++){
        if (!answers[i]) break;
        add_answer_child(answer_doms, answers[i].nume, i);
    }
}

// window.addEventListener("load", );