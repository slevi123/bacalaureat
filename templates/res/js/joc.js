teme = {{teme|safe}}
sentimente = {{sentimente|safe}}
morale = {{morale|safe}}
fizice = {{fizice|safe}}

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