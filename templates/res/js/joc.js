teme = {{teme|safe}}
sentimente = {{sentimente|safe}}
morale = {{morale|safe}}
fizice = {{fizice|safe}}


class TemaKor {
    static derived = [];

    // static 
    static list = [];
    // static mixable = true;
    // static possibles = {}

    static question = "";
    static question_possible = "";
    static answer_possible = "";

    // static list = fizice;
    static mixable = true;
    static possibles = {
        "nev": {"pre": "Ce înseamnă: ", post:"?"},
        "nume": {"pre": "Mit jelent: ", post:"?"}, 
    }

    // static register(){
    //     this.derived.push(this);
    // }

    static get question_extension(){
        console.log(this.question_possible)
        console.log(this.possibles[this.question_possible])
        return this.possibles[this.question_possible];
    }

    static answer_form(answer){
        return answer[this.answer_possible];
    }

    // draw_tematica

    static get question_formula(){
        return this.question_extension["pre"] + this.question[this.question_possible] + this.question_extension["post"];
    }

    static generate_random_round(){
        console.log(this.derived, this)
        return ranlist(this.derived).new_word();
    }

    static generate_round() {
        let keys  = Object.keys(this.possibles);
        this.question =  ranlist(this.list);
        this.question_possible = ranlist(keys);
        console.log("after_creation: ", this.question_possible)
        game_options.answer_id = ~~(Math.random() * Math.min(game_options.answer_count, this.list.length))

        do{
            this.answer_possible = ranlist(keys);
        } while (this.answer_possible==this.question_possible);

        this.answers = [];
        let temp_option = undefined;

        for (let i=0; i<game_options.answer_count; i++){
            if (i >= this.list.length) break;
            if (i==game_options.answer_id){
                this.answers.push(this.question);
            } else{
                do{
                    temp_option = ranlist(this.list);
                } while(this.answers.includes(temp_option) || this.question==temp_option);
                this.answers.push(temp_option);
            }
        }
        console.log("round generated");
    }

    static new_word(){
        let question_dom = document.getElementById("question");
        let answer_doms = document.getElementById("answer-options");
    
        // let answer_id = 3
        this.generate_round()
        question_dom.textContent = this.question_formula;
        // console.log(answers)
        remove_children(answer_doms)
        for (let i=0; i<game_options.answer_count; i++){
            if (!this.answers[i]) break;
            add_answer_child(answer_doms, this.answer_form(this.answers[i]), i);
        }
    }
}

class Sentimente extends TemaKor {
    static dummy = TemaKor.derived.push(this);

    static list = sentimente;
}
class Morale extends TemaKor {
    static dummy = TemaKor.derived.push(this);

    static list = morale;
}
class Fizice extends TemaKor {
    static dummy = TemaKor.derived.push(this);

    static list = fizice;
}
class Teme extends TemaKor {
    static dummy = TemaKor.derived.push(this);

    static list = teme;
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
    // console.log(list)
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
    TemaKor.generate_random_round();
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

    window.setTimeout( () => {TemaKor.generate_random_round()}, 2000);
}

function add_answer_child(parent, content, answer_count){
    let new_dom = document.createElement("p");
    new_dom.textContent = content;
    new_dom.setAttribute("answer-count", answer_count);
    new_dom.onclick=()=>evaluate_solution(answer_count);
    parent.appendChild(new_dom);
}




// window.addEventListener("load", );