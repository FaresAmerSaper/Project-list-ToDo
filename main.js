/****************/
if (window.localStorage.getItem('class')) {
    document.body.classList.add(window.localStorage.getItem('class'))
}
let div = document.querySelector('.top .cont1 div');
div.onclick = () =>  {
    document.body.classList.toggle('dark')
    if (document.body.classList.contains('dark')) {
        window.localStorage.setItem('class', 'dark')
        div.textContent = 'light'
    } else {
        window.localStorage.removeItem('class')
        div.textContent = 'dark'
    }
}
if (document.body.classList.contains('dark')) {
    div.textContent = 'light'
} else {
    div.textContent = 'dark'
}


let inputContent = document.querySelector("input[name='content']");
let addTask = document.querySelector('.cont2 span');
let tasks = document.querySelector('.tasks');
let taskLength = document.querySelector('.info .first');
let num = 0;


function createTask() {
    let task = document.createElement('div');
    task.setAttribute('class', `task ${num++}`);
    let innerTask = document.createElement('div');
    innerTask.className = "done"
    innerTask.textContent = inputContent.value;
    task.appendChild(innerTask);
    let iDiv = document.createElement('div');
    iDiv.setAttribute('class', 'delete')
    let iContent1 = document.createElement('span');
    let iContent2 = document.createElement('span');
    iDiv.appendChild(iContent1)
    iDiv.appendChild(iContent2)
    task.appendChild(iDiv);
    tasks.appendChild(task);
}
for (let i = 0; i <= window.localStorage.length; i++) {
    if (window.localStorage.getItem(`task ${i}`)) {
        let task = document.createElement('div');
        task.setAttribute('class', `task ${num++}`);
        tasks.appendChild(task);
        task.innerHTML = window.localStorage.getItem(`task ${i}`);
    }
}
tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove()
        // window.localStorage.removeItem(e.target.parentElement.getAttribute('class'));
        taskLength.textContent = `${tasks.children.length} item left`;
        for (let i = 0; i <= tasks.children.length; i++) {
            window.localStorage.removeItem(`task ${i}`)
        }
        for (let i = 0; i < tasks.children.length; i++) {
            window.localStorage.setItem(`task ${i}`, tasks.children[i].innerHTML)
        }
    }
    if (e.target.classList.contains('done')) {
        e.target.classList.toggle("compelete")
        for (let i = 0; i < tasks.children.length; i++) {
            window.localStorage.setItem(`task ${i}`, tasks.children[i].innerHTML)
        }
    }
})
addTask.addEventListener('click', () => {
    if (!inputContent.value == "") {
        createTask()
        for (let i = 0; i < tasks.children.length; i++) {
            window.localStorage.setItem(`task ${i}`, tasks.children[i].innerHTML)
        }
        taskLength.textContent = `${tasks.children.length} item left`
        inputContent.value = ""
    }
})
window.onload = () => {
    for (let i = 0; i < tasks.children.length; i++) {
        window.localStorage.removeItem(`task ${i}`)
        if (tasks.children.length >= 1) {
            window.localStorage.setItem(`task ${i}`, tasks.children[i].innerHTML)
        }
    }
}
taskLength.textContent = `${tasks.children.length} item left`;

////////////////info///////////////////////////////////////
let allLa = document.querySelectorAll('.info .second span')
let all = document.querySelector('.info .second span:first-child')
let active = document.querySelector('.info .second span:nth-child(2)')
let compelete = document.querySelector('.info .second span:nth-child(3)')

all.onclick = () => {
    Array.from(tasks.children, (e) => {
        e.style.display = 'flex'
    })
    allLa.forEach((el) => {
        el.classList.remove('active')
    })
    all.classList.add('active');
}
active.onclick = () => {
    Array.from(tasks.children, (e) => {
        !e.children[0].classList.contains('compelete') ? e.style.display = 'flex' : e.style.display = 'none' 
    })
    allLa.forEach((el) => {
        el.classList.remove('active')
    })
    active.classList.add('active')
}
compelete.onclick = () => {
    Array.from(tasks.children, (e) => {
        e.children[0].classList.contains('compelete') ? e.style.display = 'flex' : e.style.display = 'none' 
    })
    allLa.forEach((el) => {
        el.classList.remove('active')
    })
    compelete.classList.add('active')
}

