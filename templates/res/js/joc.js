teme = {{teme|safe}}
sentimente = {{sentimente|safe}}
morale = {{morale|safe}}
fizice = {{fizice|safe}}


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

function evaluate_solution(answer_count){
    if (game_options.answer_id==answer_count){
        game_options.punctaj +=1;
    }
    new_word()
}

function add_answer_child(parent, content, answer_count){
    let new_dom = document.createElement("p");
    new_dom.textContent = content;
    // new_dom.setAttribute("answer-count", answer_count);
    new_dom.onclick=()=>evaluate_solution(answer_count);
    parent.appendChild(new_dom);
}


function new_word(){
    question_dom = document.getElementById("question")
    answers_dom = document.getElementById("answer-options")

    let question = ranlist(teme);
    game_options.answer_id = ~~(Math.random() * game_options.answer_count)
    // let answer_id = 3
    let answers = [];
    let temp_option = undefined;
    for (let i=0; i<game_options.answer_count; i++){
        if (i==game_options.answer_id){
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
    for (let i=0; i<game_options.answer_count; i++){
        add_answer_child(answers_dom, answers[i].nume, i);
    }
}

// window.addEventListener("load", );