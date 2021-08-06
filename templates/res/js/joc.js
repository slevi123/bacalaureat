teme = {{teme|safe}}
sentimente = {{sentimente|safe}}
morale = {{morale|safe}}
fizice = {{fizice|safe}}


class TemaKor {
    constructor(){
        this.list = fizice;
        this.question = "";
        this.possibles = {
            "nev": {"pre": "Ce înseamnă: ", post:"?"},
            "nume": {"pre": "Mit jelent: ", post:"?"},

        }
        this.question_possible = "";
        this.answer_possible = "";
    }

    get question_extension(){
        return this.possibles[this.question_possible];
    }

    answer_form(answer){
        return answer[this.answer_possible];
    }

    get question_formula(){
        return this.question_extension["pre"] + this.question[this.question_possible] + this.question_extension["post"];
    }

    generate_round(question) {
        this.question =  ranlist(this.list);
        this.question_possible = ranlist(this.possibles.keys());
        do{
            this.answer_possible = ranlist(this.possibles.keys());
        } while (this.answer_possible==this.question_possible);

        let answers = [];
        let temp_option = undefined;
        if (this.list.length > game_options.answer_count){
            for (let i=0; i<game_options.answer_count; i++){
                if (i==game_options.answer_id){
                    answers.push(question);
                } else{
                    do{
                        temp_option = ranlist(this.list);
                    } while(answers.includes(temp_option) || question==temp_option);
                    answers.push(temp_option);
                }
            }
        } else {
            answers = this.list; 
        }
        return answers;
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