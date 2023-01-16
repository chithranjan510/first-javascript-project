let expenseAmount = document.querySelector('.expense_amount');
let expenseType = document.querySelector('#expense_type');
let description = document.querySelector('.description');

let form = document.querySelector('.expense_form');
let submitButton = document.querySelector('.add_expense_btn');
let ul = document.querySelector('.expense_list');

// console.log(submitButton.textContent === 'Add Expense');

form.addEventListener('submit', add);
addEventListener('DOMContentLoaded', displayExpenseData);

async function add(e) {
  e.preventDefault();

  let expenseObject = {
    expenseAmount: expenseAmount.value,
    expenseType: expenseType.value,
    description: description.value,
  };

  try {
    let expenses;
    if (submitButton.textContent.toLowerCase() === 'edit') {
      expenses = await axios.put(
        `http://localhost:3000/expense/edit-expense/${e.target.id}`,
        expenseObject
      );
      submitButton.textContent = 'Add Expense';
      console.log(expenses);
    } else {
      expenses = await axios.post(
        'http://localhost:3000/expense/add-expense',
        expenseObject
      );
    }

    expenseAmount.value = '';
    expenseType.value = '';
    description.value = '';

    let list = `<li id=${expenses.data.id}>${
      expenses.data.amount +
      '-' +
      expenses.data.category +
      '-' +
      expenses.data.description
    }
        <button class=edit_btn onClick="edit(event,'${expenses.data.id}','${
      expenses.data.amount
    }','${expenses.data.category}','${
      expenses.data.description
    }')">Edit</button>
        <button class=del_btn onClick="del(event, ${
          expenses.data.id
        }')">Delete</button>
        </li>`;

    ul.innerHTML += list;
  } catch (err) {
    console.log(err);
  }
}

async function displayExpenseData(e) {
  try {
    let expenses = await axios.get(
      'http://localhost:3000/expense/get-expenseList'
    );
    // console.log(expenses);
    expenses.data.forEach((expense) => {
      let list = `<li id=${expense.id}>${
        expense.amount + '-' + expense.category + '-' + expense.description
      }
            <button class=edit_btn onClick="edit(event, '${expense.id}', '${
        expense.amount
      }','${expense.category}','${expense.description}')">Edit</button>
            <button class=del_btn onClick="del(event, '${
              expense.id
            }')">Delete</button>
            </li>`;

      ul.innerHTML += list;
    });
  } catch (err) {
    console.log(err);
  }
}

async function edit(e, id, amount, type, desc) {
  ul.removeChild(e.target.parentElement);
  expenseAmount.value = amount;
  expenseType.value = type;
  description.value = desc;
  form.id = id + '';
  submitButton.textContent = 'Edit';
}

async function del(e, id) {
  try {
    await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`);
    ul.removeChild(e.target.parentElement);
  } catch (err) {
    console.log(err);
  }
}
