function mobile_table_tag_loader(){
    tables = document.getElementsByTagName("table");
    // console.log("table labeling ", tables)
    Array.from(tables).forEach((table)=>{
        // console.log("preparing table data: ", table)
        table_structs = table.children;
        let headers = table_structs[0].children[0].children;
        data_rows = table_structs[1].children;
        console.log("data_headers: ", headers)
        console.log("data_rows: ", data_rows)
        for (let data_row_index=0; data_row_index<data_rows.length; data_row_index++){
            let data_row_children = data_rows[data_row_index].children;
            console.log("data_row_children: ", data_row_children)
            for (let column_index=0; column_index<data_row_children.length; column_index++){
                data_row_children[column_index].setAttribute( "data-label", headers[column_index].textContent)
                console.log("setting header: ", headers[column_index].textContent, ", on: ", data_row_children[column_index])
            }
        } 
    })
}

function translate(element){
    var other = element.getAttribute("limb");
    element.setAttribute("limb", element.textContent);
    element.textContent = other;
}

function sorted(){
    let containers = document.getElementsByClassName;
    Array.from(containers).forEach((container) =>{
        children = container?.children?.sort((a,b)=>{
            let cond = a.getAttribute("count") < b.getAttribute("count");
            if (cont) return 1
            else return -1;
        })

    })
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
    mobile_table_tag_loader();

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

