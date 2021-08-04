function shower(check, class_name){
    elements = document.getElementsByClassName(class_name)
    if (check.checked){
        var display = "table-cell";
    } else {
        var display = "none"
    }
    Array.from(elements).forEach(element => {
        element.style.display = display;
    });
}


window.onload = function bind(){
    var prozodia_check = document.getElementById("prozodia-check");
        shower(prozodia_check, "prozodie");
        prozodia_check.addEventListener("change", () => shower(prozodia_check, "prozodie"));
}
