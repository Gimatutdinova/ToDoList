const key = 'tasks';
const nullTasks = '<p class="list__items_null">Нет активых задач</p>';
const tasks = document.querySelector('#tasks'); // Блок с задачами
const mes = document.querySelector('.list__message'); // Сообщение при добавление задачи без названия
const addBtn = document.querySelector('#addBtn'); // Кнопка добавление задачи
const input = document.querySelector('#title'); // input (название задачи)
const selectBtn = document.querySelectorAll('.select'); // Кнопки изменения блока с задачами
const removeBtn = document.querySelectorAll('.remove'); // Кнопки удаления задач

// Проверка данных в local storage
if (localStorage.getItem(key)) { 
    tasks.innerHTML = localStorage.getItem(key); 
};

// Обработка нажатия на кнопку добавление задачи

addBtn.addEventListener('click', () => {
    if (input.value != 0) {
        mes.classList.remove('_block');
        addTask(input.value);
    } else {
        mes.classList.add('_block');
    }
});

// Функция для добавление задачи

function addTask(title) {
    let newTask = document.createElement('div');
    newTask.classList.add('list__item')
    newTask.innerHTML = 
        `<label class="list__item_label" for="checkbox_${Date.now()}"></label>
        <input type="checkbox" class="list__item_checkbox" id="checkbox_${Date.now()}">
        <p class="list__item_title">${title}</p>
        <button class="list__item_remove">&#215;</button>`;
    if (tasks.firstChild.classList.contains('list__items_null')) {
        tasks.firstChild.remove();
    }
    tasks.prepend(newTask);
    localStorage.setItem(key, tasks.innerHTML); 
    input.value = '';
};

// Обработчик нажатия на кнопку удаления задачи

document.addEventListener('click', function(btn) {
    if(btn.target.classList.contains('list__item_remove')) {
        btn.target.parentElement.remove();
        if (tasks.innerHTML.trim() === '') {
            tasks.innerHTML = nullTasks;
        };
        localStorage.setItem(key, tasks.innerHTML); 
    };
});

// Обработчик нажатия на checkbox (выделение, что задача выполнена)
document.addEventListener('change', function(checkbox) {
    if(checkbox.target.classList.contains('list__item_checkbox')) {
        let parent = checkbox.target.parentElement;
        parent.classList.toggle('_ready');
        parent.remove();
        parent.classList.contains('_ready') ? tasks.append(parent) : tasks.prepend(parent);
        localStorage.setItem(key, tasks.innerHTML);
    };
});

// Обработка нажатия на кнопки выделения задач

selectBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        tasks.classList.remove('even', 'odd');
        tasks.classList.add(`${btn.id}`);
    });
});

// Обработка нажатия на кнопки удаления задач

removeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        removeTask(btn.id);
        localStorage.setItem(key, tasks.innerHTML);
    });
});

function removeTask(id) {
    switch (id) {
        case 'firstTask': 
            tasks.removeChild(tasks.firstElementChild);
            break;
        case 'lastTask': 
            tasks.removeChild(tasks.lastElementChild);
            break;
        case 'readyTasks': 
            let readyTasks = document.querySelectorAll('._ready');
            readyTasks.forEach(elem => {
                elem.remove();
            });
            break;
        default: 
            tasks.innerHTML = nullTasks;
    };
    if (tasks.innerHTML === '') {
        tasks.innerHTML = nullTasks;
    };
};