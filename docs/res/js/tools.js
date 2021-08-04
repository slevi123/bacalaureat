function translate(element){
    var other = element.getAttribute("limb");
    element.setAttribute("limb", element.textContent);
    element.textContent = other;
}


function last(list){
    return list[list.length-1];
}

function click_switch(children){
    if (last(children).style.display == "block"){
        last(children).style.display = "none";
        children[0].style.display = "block";
    } else {
        var to_on = false;
        children.every(child => {
            if (child.style.display == "block"){
                to_on = true;
                child.style.display = "none";
                // console.log("from: ", child)
            } else if (to_on==true){
                child.style.display = "block";
                // console.log("switched to child: ", child)
                return true;
            }
            return true;
        })
    }
}


window.onload = function bind(){
    // translate
    var motive = (document.getElementById("motive")||{"children":[]}).children;
    
    translants = Array.from(motive)
    translants.push(...document.getElementsByTagName("trans"))
    translants.push(...document.getElementsByClassName("trans"))

    translants.forEach(translant => {
        translant.addEventListener("mouseover", () => translate(translant));
        translant.addEventListener("mouseout", () => translate(translant));
    });

    // switch
    var elements = document.getElementsByTagName("switch");

    // console.log(elements)
    Array.from(elements).forEach( element =>{
        // console.log(element.children[0].style.display);
        var children = Array.from(element.children)
        children.forEach(child => {
            child.style.display = "none";
        })
            
        element.addEventListener("click", () => click_switch(children))
        children[0].style.display="block";
    })
}

