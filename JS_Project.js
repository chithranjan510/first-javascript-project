let expenseAmount = document.querySelector('.expense_amount');
let expenseType = document.querySelector('#expense_type');
let description = document.querySelector('.description');

let form = document.querySelector('.expense_form');
let ul = document.querySelector('.expense_list');

form.addEventListener('submit', add);
ul.addEventListener('click', modify);

function add(e) {

    e.preventDefault();

    let li = document.createElement('li');
    let text = document.createTextNode(expenseAmount.value + "-" + expenseType.value + "-" + description.value);

    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    deleteButton.appendChild(document.createTextNode('Delete'));
    editButton.appendChild(document.createTextNode('Edit'));

    deleteButton.className = 'del_btn';
    editButton.className = 'edit_btn';

    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    
    let expenseObject = {
        expenseAmount: expenseAmount.value,
        expenseType: expenseType.value,
        description: description.value
    }

    let expenseObjectSerielized = JSON.stringify(expenseObject);

    localStorage.setItem(expenseAmount.value + "-" + expenseType.value + "-" + description.value, expenseObjectSerielized);

    expenseAmount.value = '';
    expenseType.value = '';
    description.value = '';
}


Object.keys(localStorage).forEach((key) => {
    let obj = JSON.parse(localStorage.getItem(key));
    display(obj);
})


function display(obj) {

    let li = document.createElement('li');
    let text = document.createTextNode(obj.expenseAmount + "-" + obj.expenseType + "-" + obj.description);

    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    deleteButton.appendChild(document.createTextNode('Delete'));
    editButton.appendChild(document.createTextNode('Edit'));

    deleteButton.className = 'del_btn';
    editButton.className = 'edit_btn';

    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);

}



function modify(e) {
    if (e.target.classList.contains('edit_btn')) {

        let data = e.target.parentElement.childNodes[0].nodeValue;
        // console.log(data);

        Object.keys(localStorage).forEach((key) => {
            // console.log(key);
            if (data.includes(key)) {

                let obj = JSON.parse(localStorage.getItem(key));
                expenseAmount.value = obj.expenseAmount;
                expenseType.value = obj.expenseType;
                description.value = obj.description;

                localStorage.removeItem(key);
            }

        })

        ul.removeChild(e.target.parentElement);
    }

    if (e.target.classList.contains('del_btn')) {

        let data = e.target.parentElement.childNodes[0].nodeValue;
        // console.log(data);

        Object.keys(localStorage).forEach((key) => {
            // console.log(key);
            if (data.includes(key)) {
                localStorage.removeItem(key);
            }

        })

        ul.removeChild(e.target.parentElement);
    }
}


