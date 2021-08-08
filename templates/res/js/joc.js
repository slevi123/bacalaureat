teme = {{teme|safe}}
sentimente = {{sentimente|safe}}
morale = {{morale|safe}}
fizice = {{fizice|safe}}
opere = {{opere|safe}}
opere_curente = {{opere_curente|safe}}
opere_perioade = {{opere_perioade|safe}}
cuvinte_din_compuneri = {{cuvinte_din_compuneri|safe}}

function check_form(answer){
    let lookup = {
        "á": "a",
        "é": "e",
        "ö": "o",
        "ő": "o",
        "ú": "u",
        "ü": "u",
        "ű": "u",
        "í": "i",
        "ă": "a",
        "î": "i",
        "â": "a",
        "ș": "s",
        "ț": "t",
    }

    let formatted = "";
    for (letter of answer){
        if (letter in lookup) formatted += lookup[letter]
        else formatted += letter;
    }
    return formatted;
}

function children_enabler(checkbox, children_ids){
    children_ids.forEach((child_id)=>{
        console.log(child_id)
        child_dom = document.getElementById(child_id);
        child_dom.checked = checkbox.checked;
        child_dom.disabled= !checkbox.checked;
        // console.log("child disabled: ", child_dom)
        child_dom.dispatchEvent(new Event("change"));
    })
}

class TemaKor {
    static derived = [];

    // static 
    static list = [];
    // static mixable = true;
    // static possibles = {}

    static question = "";
    static question_possible = "";
    static answer_possible = "";
    static enabled = true;

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
        // console.log(this.question_possible)
        // console.log(this.possibles[this.question_possible])
        return this.possibles[this.question_possible];
    }

    static bind(checkbox){
            // console.log("state changed: ", checkbox.checked)
            // console.log(this)
            this.enabled = checkbox.checked;
    }

    // static asem_render(thing, possible){
    //     if (thing.asemanatori && thing.asemanatori[possible]) return ranlist(thing[possible])
    //     else return thing[possible];
    // }

    static answer_form(answer){
        return answer[this.answer_possible];
    }

    // draw_tematica

    static get question_formula(){
        return this.question_extension["pre"] + this.question[this.question_possible] + this.question_extension["post"];
    }

    static generate_random_round(){
        // console.log(this.derived, this)
            let enabled_deriveds = [];
            this.derived.forEach((deriv)=>{
                // console.log(deriv.enabled)
                if (deriv.enabled) enabled_deriveds.push(deriv);
            })
            console.log(enabled_deriveds)
            if (enabled_deriveds){
                return ranlist(enabled_deriveds).new_word();
            } else window.alert("Selectează mai multe opțiuni!")
    }

    static generate_possibles(){
        let keys  = Object.keys(this.possibles);
        this.question_possible = ranlist(keys);
        do{
            this.answer_possible = ranlist(keys);
        } while (this.answer_possible==this.question_possible);
    }

    static generate_round() {
        this.question =  ranlist(this.list);
        // console.log("after_creation: ", this.question_possible)
        game_options.answer_id = ~~(Math.random() * Math.min(game_options.answer_count, this.list.length))

        this.generate_possibles();
        game_options.correct_answer = this.answer_form(this.question);
        this.answers = [];
        let temp_option = undefined;

        for (let i=0; i<game_options.answer_count; i++){
            if (i >= this.list.length) break;
            if (i==game_options.answer_id){
                this.answers.push(this.question);
            } else{
                do{
                    temp_option = ranlist(this.list);
                    // console.log(temp_option)
                } while(this.answers.includes(temp_option) || this.question==temp_option);
                this.answers.push(temp_option);
            }
        }
        // console.log("round generated");
    }

    static new_word(){
        let question_dom = document.getElementById("question");
        let answer_doms = document.getElementById("answer-options");
        let typeins_dom = document.getElementById("typeins")
        let typein_answer_dom = document.getElementById("typein-answer")
    
        // let answer_id = 3
        this.generate_round()
        question_dom.textContent = this.question_formula;
        // console.log(answers)

        let answer_mode = ~~(Math.random()*2)
        if (answer_mode){
            answer_doms.style.display = "none";
            typeins_dom.style.border = "";
            typein_answer_dom.value = '';
            typeins_dom.style.display = "";
            typein_answer_dom.focus();
        } else {
            answer_doms.style.display = "";
            typeins_dom.style.display = "none";
            remove_children(answer_doms)
            for (let i=0; i<game_options.answer_count; i++){
                if (!this.answers[i]) break;
                add_answer_child(answer_doms, this.answer_form(this.answers[i]), i);
            }
        }
    }
}

class AsemTemaKor extends TemaKor{
    static asem_possible = "";
    static dict = {}
    // static asem_possible_extensions = {}

    static is_asem_question_possible = 0;
    static other_possible = "";

    // static asem_render(thing, possible){
    //     if (possible==this.asem_possible) return ranlist(thing[possible])
    //     else return thing[possible];
    // }

    static generate_possibles(){
        let keys  = Object.keys(this.possibles);
        this.other_possible = ranlist(keys);
    }
    
    static answer_form(answer){
        let answer_body = answer;
        if (this.is_asem_question_possible){
            answer_body=ranlist(this.dict[answer])[this.other_possible];
        }
        return answer_body;
    }
    
    static get question_extension(){
        if (this.is_asem_question_possible){
            return this.asem_possible_extensions;
        } else return this.possibles[this.other_possible];
    }

    static get question_formula(){
        let question_body = this.question;
        if (!this.is_asem_question_possible){
            question_body=ranlist(this.dict[this.question])[this.other_possible];
        }
        return this.question_extension["pre"] + question_body + this.question_extension["post"];
    }

    static generate_round() {
        this.is_asem_question_possible = ~~(Math.random*2);
        this.list = Object.keys(this.dict);
        super.generate_round();
    }

}

class Anul extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = opere;
    static mixable = false;
    static possibles = {
        "titlu": {"pre": 'Anul apariției operei "', "post":'"?'},
        "anul": {"pre": "Operă apărută în ", "post":"?"}, 
    }
}

// class NotMixableTemaKor extends TemaKor{

// }


class AnulAutor extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = opere;
    static mixable = false;
    static possibles = {
        "artist": {"pre": 'Apariția operei scrisă de ', "post":'?'},
        "anul": {"pre": "Autorul operei apărută în ", "post":"?"}, 
    }
}

class Curente extends AsemTemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static dict = opere_curente;
    static mixable = false;
    static possibles = {
        "titlu": {"pre": 'Curentul literar a operei "', "post":'"?'},
    }
    static asem_possible_extensions = {"pre": "Operă care se încadrează în ", "post":"?"}
}

class Perioade extends AsemTemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static dict = opere_perioade;
    static mixable = false;
    static possibles = {
        "titlu": {"pre": 'Perioada operei "', "post":'"?'},
    }

    static asem_possible_extensions = {"pre": "Operă care se încadrează în ", "post":"?"}
}

class Artiste extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = opere;
    static mixable = false;
    static possibles = {
        "titlu": {"pre": 'Autorul operei "', "post":'"?'},
        "artist": {"pre": "Operă scrisă de ", "post":"?"}, 
    }
}


class CuvinteDinCompuneri extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = cuvinte_din_compuneri;
}
class Sentimente extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = sentimente;
}
class Morale extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = morale;
}
class Fizice extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = fizice;
}
class Teme extends TemaKor {
    static dummy = TemaKor.derived.push(this);
    static enabled = true;

    static list = teme;
}



class GameOptions {
    constructor(){
        this.answer_count = 4;
        this.answer_id = undefined;
        this.timp = 0;
        this._punctaj = 0;

        this.timer = undefined;
        this.correct_answer = undefined;

        this.__punctaj_dom__ = undefined;
        this.__corect_dom__ = undefined;
        this.__incorect_dom__ = undefined;
    }

    get punctaj(){
        return this._punctaj;
    }

    set punctaj(new_value){
        this._punctaj = new_value;
        if (this.__punctaj_dom__) this.__punctaj_dom__.textContent = "punctaj: " + this._punctaj;
    }

    get corect(){
        return this._corect;
    }

    set corect(new_value){
        this._corect = new_value;
        if (this.__corect_dom__) this.__corect_dom__.textContent = "corecte: " + this._corect;
    }

    get incorect(){
        return this._incorect;
    }

    set incorect(new_value){
        this._incorect = new_value;
        if (this.__incorect_dom__) this.__incorect_dom__.textContent = "greșite: " + this._incorect;
    }

    zero_all(){
        this.timp = 0;
        this.corect = 0;
        this.incorect = 0;
    }

    bind(){
        this.__punctaj_dom__ = document.getElementById("punctaj");
        this.__corect_dom__ = document.getElementById("raspuns-corect");
        this.__incorect_dom__ = document.getElementById("raspuns-incorect");
        this.corect = 0;
        this.incorect = 0;

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

function format_time(timp){
    let minutes = ~~(timp/60)
    if (minutes){
        let seconds = timp%60;
        let hours = ~~(minutes/60);
        if (hours){
            minutes = minutes%60;
            return "timpul: "+ hours + " h, " +minutes + " min, " + seconds +" sec";
            // TODO: gameover after an hour
        } else return "timpul: "+ minutes + " min, " + seconds +" sec";
    } else return "timpul: "+ timp + " sec";
}

function setTime(timer_dom, timp){
    timer_dom.textContent=format_time(timp);
}

function on_start(){
    game_options.bind();
    console.log(document.getElementById("scores-game-start").style.display);
    document.getElementById("scores-game-start").style.display = "none";
    // document.getElementById("start-button").style.display = "none";
    document.getElementById("game").style.display = "block";
    let timer_dom = document.getElementById("timer")
    game_options.zero_all();
    var game_mode = parseInt(document.getElementById("game-mode-switch").value);
    let final_time_dom = document.getElementById("time");
    if (game_mode){
        final_time_dom.style.display="none";
        game_options.timp = 180;
    } else final_time_dom.style.display="";

    timer_dom.textContent="timpul: " + game_options.timp;
    game_options.timer = setInterval(()=>{
        if (game_mode){
            game_options.timp -= 1;
            if (game_options.timp == 0) stop_game();
        } else game_options.timp += 1;
        setTime(timer_dom, game_options.timp);
    }, 1000);
    TemaKor.generate_random_round();
}

function evaluate_typein_solution(){
    let typein_answer_dom = document.getElementById("typein-answer");
    let typein_dom = document.getElementById("typeins");
    let answer = typein_answer_dom.value;
    if (check_form(answer)==check_form(game_options.correct_answer)){
        game_options.punctaj +=1;
        game_options.corect +=1;
        typein_dom.style.border="4px solid lawngreen"; 
    } else {
        game_options.incorect +=1;

        typein_dom.style.border="4px solid red"; 
    }       

    window.setTimeout( () => {TemaKor.generate_random_round()}, 2000);
}

function evaluate_solution(user_answer_id){
    if (game_options.answer_id==user_answer_id){
        game_options.punctaj +=1;
        game_options.corect +=1;
    } else game_options.incorect +=1;

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

function stop_game(){
    document.getElementById("game").style.display = "none";
    document.getElementById("eredmeny").style.display = "";
    document.getElementById("scores-game-start").style.display = "";

    document.getElementById("score").textContent = "scorul tău: " + game_options.punctaj;
    document.getElementById("time").textContent = format_time(game_options.timp);
    document.getElementById("corrects").textContent = "răspunsuri corecte: " + game_options.corect;
    document.getElementById("incorrects").textContent = "răspunsuri incorecte: " + game_options.incorect;

    clearInterval(game_options.timer);
    // game_options.
}

    

window.addEventListener("load", ()=>{
    //checkboxok bekapcsolasa
    let option_dom = document.getElementById("optiuni");
    Array.from(option_dom.children).forEach((label)=>{
        input_dom = label.children[0];
        if (input_dom?.type=="checkbox") input_dom.checked=true;
    })
    // document.getElementById("curent-option").checked=true
    // TemaKor.derived.forEach((kor)=>{
    //     kor.enabled = false;
    // })
    // Curente.enabled = true;


    //input enter bindolasa
    let input = document.getElementById("typein-answer")
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("typein-button").click();
        }
    });
});