teme = [{"nev": "természet", "nume": "natură"}, {"nev": "emberi élet", "nume": "viață omului"}, {"nev": "születés", "nume": "naștere"}, {"nev": "szerelem, szeretet", "nume": "iubire"}, {"nev": "nevelés", "nume": "educație"}, {"nev": "öregkor", "nume": "bătrânețe"}, {"nev": "halál", "nume": "moarte"}, {"nev": "emberi sors", "nume": "destin uman"}, {"nev": "vallás", "nume": "religie"}, {"nev": "hit", "nume": "credință"}, {"nev": "művészet", "nume": "artă"}, {"nev": "kultúra", "nume": "cultură"}, {"nev": "idő", "nume": "timp"}, {"nev": "haza", "nume": "patrie"}, {"nev": "művészi alkotás", "nume": "creație artistică"}]
sentimente = [{"nev": "boldogság", "nume": "fericire"}, {"nev": "vidámság", "nume": "veselie"}, {"nev": "öröm", "nume": "bucurie"}, {"nev": "szerelem, szeretet", "nume": "dragoste"}, {"nev": "vágy", "nume": "dor"}, {"nev": "vágyakozás", "nume": "dorință"}, {"nev": "szomorúság", "nume": "tristețe"}, {"nev": "sajnálat", "nume": "părerea de rău"}, {"nev": "lelki fájdalom", "nume": "durere sufletească"}, {"nev": "szenvedés", "nume": "suferință"}, {"nev": "melankólia", "nume": "melancolie"}, {"nev": "nosztalgia", "nume": "nostalgie"}, {"nev": "depresszió", "nume": "depresie"}, {"nev": "létfélelem", "nume": "spaimă existențială"}, {"nev": "harag", "nume": "supărare"}, {"nev": "gyász", "nume": "jale"}, {"nev": "magány", "nume": "singurătate"}, {"nev": "szenvedély", "nume": "pasiune"}, {"nev": "gyűlölet", "nume": "ură"}, {"nev": "irigység", "nume": "gelozie"}]
morale = [{"nev": "jó", "nume": "bun"}, {"nev": "rossz", "nume": "rău"}, {"nev": "okos", "nume": "deștept"}, {"nev": "szerető", "nume": "iubitor"}, {"nev": "tapintatos", "nume": "amabil"}, {"nev": "idétlen", "nume": "urâcios"}]
fizice = [{"nev": "magas", "nume": "înalt"}, {"nev": "gyenge", "nume": "slab"}, {"nev": "rövid", "nume": "scund"}, {"nev": "kövér", "nume": "gras"}, {"nev": "szőke", "nume": "blond"}, {"nev": "göndör", "nume": "creț"}, {"nev": "barna", "nume": "saten"}]
opere = [{"titlu": "Povestea lui Harap-Alb", "anul": 1877, "artist": "Ion Creangă"}, {"titlu": "Moara cu noroc", "anul": 1881, "artist": "Ioan Slavici"}, {"titlu": "O scrisoare pierdută", "anul": 1884, "artist": "Ion Luca Caragiale"}, {"titlu": "Sara pe deal", "anul": 1885, "artist": "Mihai Eminescu"}, {"titlu": "Plumb", "anul": 1916, "artist": "George Bacovia"}, {"titlu": "Ultima noapte de dragoste, întâia noapte de război", "anul": 1930, "artist": "Camil Petrescu"}, {"titlu": "Flori de mucigai", "anul": 1931, "artist": "Tudor Arghezi"}, {"titlu": "Enigma Otiliei", "anul": 1938, "artist": "George Călinescu"}]
opere_curente = {"simbolism": [{"titlu": "Plumb", "anul": 1916, "artist": "George Bacovia"}], "romantism": [{"titlu": "Sara pe deal", "anul": 1885, "artist": "Mihai Eminescu"}], "modernism": [{"titlu": "Flori de mucigai", "anul": 1931, "artist": "Tudor Arghezi"}, {"titlu": "Ultima noapte de dragoste, întâia noapte de război", "anul": 1930, "artist": "Camil Petrescu"}], "romantic realism": [{"titlu": "Povestea lui Harap-Alb", "anul": 1877, "artist": "Ion Creangă"}], "realism": [{"titlu": "O scrisoare pierdută", "anul": 1884, "artist": "Ion Luca Caragiale"}, {"titlu": "Moara cu noroc", "anul": 1881, "artist": "Ioan Slavici"}], "modernism, realism": [{"titlu": "Enigma Otiliei", "anul": 1938, "artist": "George Călinescu"}]}
opere_perioade = {"antebelică": [{"titlu": "Plumb", "anul": 1916, "artist": "George Bacovia"}], "epoca marilor clasici": [{"titlu": "Sara pe deal", "anul": 1885, "artist": "Mihai Eminescu"}, {"titlu": "Povestea lui Harap-Alb", "anul": 1877, "artist": "Ion Creangă"}, {"titlu": "O scrisoare pierdută", "anul": 1884, "artist": "Ion Luca Caragiale"}, {"titlu": "Moara cu noroc", "anul": 1881, "artist": "Ioan Slavici"}], "interbelică": [{"titlu": "Flori de mucigai", "anul": 1931, "artist": "Tudor Arghezi"}, {"titlu": "Enigma Otiliei", "anul": 1938, "artist": "George Călinescu"}, {"titlu": "Ultima noapte de dragoste, întâia noapte de război", "anul": 1930, "artist": "Camil Petrescu"}]}

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
        this._punctaj = 0;

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




window.addEventListener("load", ()=>{
    let option_dom = document.getElementById("optiuni");
    Array.from(option_dom.children).forEach((label)=>{
        input_dom = label.children[0];
        if (input_dom?.type=="checkbox") input_dom.checked=false;
    })
    document.getElementById("curent-option").checked=true
    TemaKor.derived.forEach((kor)=>{
        kor.enabled = false;
    })
    Curente.enabled = true;
});