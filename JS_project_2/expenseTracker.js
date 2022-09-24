let expenseAmount = document.querySelector('.expense_amount');
let expenseType = document.querySelector('#expense_type');
let description = document.querySelector('.description');

let form = document.querySelector('.expense_form');
let ul = document.querySelector('.expense_list');

form.addEventListener('submit', add);
ul.addEventListener('click', modify);
addEventListener('DOMContentLoaded', displayExpenseData);

function add(e) {

    e.preventDefault();

    let li = document.createElement('li');
    let text = document.createTextNode(expenseAmount.value + "-" + expenseType.value + "-" + description.value);
    // console.log(text);

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

    axios.post('https://crudcrud.com/api/7667491dfa66490ab9e90bf20017aea2/expenseData', expenseObject)
    .then(() => {console.log('Expense Data was posted successfully')})
    .catch((err) => {console.log(err)});

    expenseAmount.value = '';
    expenseType.value = '';
    description.value = '';
}

function displayExpenseData(e) {

    axios.get('https://crudcrud.com/api/7667491dfa66490ab9e90bf20017aea2/expenseData')
    .then((expenses) => {
        expenses.data.forEach((expense) => {

            let li = document.createElement('li');
            let text = document.createTextNode(expense.expenseAmount + "-" + expense.expenseType + "-" + expense.description);

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

        })
    })
    .catch((err) => {console.log(err)});
    
}



function modify(e) {
    if (e.target.classList.contains('edit_btn')) {

        let data = e.target.parentElement.childNodes[0].nodeValue;

        axios.get('https://crudcrud.com/api/7667491dfa66490ab9e90bf20017aea2/expenseData')
        .then((expenses) => {
            expenses.data.forEach((expense) => {
                expenseAmount.value = expense.expenseAmount;
                expenseType.value = expense.expenseType;
                description.value = expense.description;
                if(data.includes(expense.expenseAmount) && data.includes(expense.expenseType) && data.includes(expense.description)) {
                    axios.delete(`https://crudcrud.com/api/7667491dfa66490ab9e90bf20017aea2/expenseData/${expense._id}`)
                    .then(() => {console.log('Expense data got deleted, please update the with new one')})
                    .catch((err) => {console.log(err)})
                }
            })
        })
        .catch((err) => {console.log(err)});

        ul.removeChild(e.target.parentElement);
    }

    if (e.target.classList.contains('del_btn')) {

        let data = e.target.parentElement.childNodes[0].nodeValue;
        // console.log(data);
        
        axios.get('https://crudcrud.com/api/7667491dfa66490ab9e90bf20017aea2/expenseData')
        .then((expenses) => {
            expenses.data.forEach((expense) => {
                if(data.includes(expense.expenseAmount) && data.includes(expense.expenseType) && data.includes(expense.description)) {
                    axios.delete(`https://crudcrud.com/api/7667491dfa66490ab9e90bf20017aea2/expenseData/${expense._id}`)
                    .then(() => {console.log('Expense data got deleted')})
                    .catch((err) => {console.log(err)})
                }
            })
        })
        .catch((err) => {console.log(err)});

        ul.removeChild(e.target.parentElement);
    }
}