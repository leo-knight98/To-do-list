class Element {
    name = ["List"];
    date = [new Date()];
    importance = ["mild"];

    showElements() {
        let elements = '';
        for(let i = 0; i < this.name.length; i++) {
            elements += `<div class="element" id="list-${i}"><input type="checkbox" id="done-${i}" name="done" class="done" /><p>${this.name[i]}</p><input type="date" id="date-${i}" value="${this.date[i]}" class="date" /><select name="tag-${i}" id="tag-${i}" class="tag">`;

            switch(this.importance[i]) {
                case "important":
                    elements += `<option value="urgent">Urgent</option><option value="important" selected>Important</option><option value="mild">Mild importance</option><option value="not">Not important</option></select></div>`
                    break;
                case "urgent":
                    elements += `<option value="urgent" selected>Urgent</option><option value="important">Important</option><option value="mild">Mild importance</option><option value="not">Not important</option></select></div>`
                    break;
                case "mild":
                    elements += `<option value="urgent">Urgent</option><option value="important">Important</option><option value="mild" selected>Mild importance</option><option value="not">Not important</option></select></div>`
                    break;
                case "not":
                    elements += `<option value="urgent">Urgent</option><option value="important">Important</option><option value="mild">Mild importance</option><option value="not" selected>Not important</option></select></div>`
                    break;
                default:
                    elements += `<option value="urgent">Urgent</option><option value="important">Important</option><option value="mild">Mild importance</option><option value="not">Not important</option></select></div>`
                    break;
            }
        }
        
        return elements;
    }    
}

let list = document.getElementById("list");
let formAdd = document.getElementById("add-element");
let inputAdd = document.getElementById("elementToAdd");
let inputsDone = document.getElementsByClassName("done");
let elements = load();

window.onload = function() {
    let text = elements.showElements();
    list.innerHTML = text;
    setColors(elements)

    formAdd.addEventListener('submit', function() {
        event.preventDefault();
        let input = inputAdd.value;
        inputAdd.value = "";
        elements.name.push(input);
        elements.date.push(new Date());
        elements.importance.push("important");

        input.value = "";
        text = elements.showElements();
        list.innerHTML = text;
        setColors(elements)
        save(elements);
    })

    document.addEventListener('click', function() {
        if(event.target.classList.contains('done')) {
            event.preventDefault()
            let id = event.target.id.split('-')
            let num = parseInt(id[1])
            elements.name.splice(num, 1)
            elements.date.splice(num, 1)
            elements.importance.splice(num, 1)
            text = elements.showElements()
            list.innerHTML = text
            setColors(elements)
            save(elements)
        }
    })

    document.addEventListener('change', function() {
        let id = event.target.id.split('-')
        let num = parseInt(id[1])

        if(event.target.classList.contains("tag")) {
            elements.importance[num] = event.target.value
            setColors(elements)
        } else if(event.target.classList.contains("date")) {
            elements.date[num] = event.target.value 
        }

        text = elements.showElements()
        list.innerHTML = text
        setColors(elements)
        save(elements)
    })
}
function save(el) {
    let list = JSON.stringify(el)
    window.localStorage.setItem('list', list);
}

function load() {
    let jsonList = window.localStorage.getItem('list');
    let list = JSON.parse(jsonList);
    let elements = new Element()
    if(list != null && typeof list != 'undefined') {
        elements.name = list.name;
        elements.date = list.date;
        elements.importance = list.importance;
        return elements;
    }

    return elements;
}

function setColors(elements) {
    for(let i = 0; i < elements.name.length; i++) {
        let el = document.getElementById(`list-${i}`)
        if(elements.importance[i] == 'urgent') {
            el.style.backgroundColor = "#d45b5f"
        } else if(elements.importance[i] == 'important') {
            el.style.backgroundColor = "#ffdc82"
        } else if(elements.importance[i] == 'mild') {
            el.style.backgroundColor = "#f5fa64"
        } else if(elements.importance[i] == 'not') {
            el.style.backgroundColor = "#74e06e"
        }
    }
}