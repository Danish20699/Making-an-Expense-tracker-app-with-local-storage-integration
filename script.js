// References
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categoryInput = document.getElementById('expense-category');
const addButton = document.getElementById('add-expense-btn');
const expenseList = document.getElementById('expense-list');
const toggleDarkBtn = document.getElementById('toggle-dark');

let expenses = [];

// Load from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('expenses');
  if (saved) {
    expenses = JSON.parse(saved);
    expenses.forEach(addExpenseToDOM);
  }
});

// Add Expense button click
addButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const category = categoryInput.value.trim();

  if (!name || isNaN(amount) || !category) {
    alert('Please fill in all fields correctly.');
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    category
  };

  expenses.push(expense);
  addExpenseToDOM(expense);
  saveExpenses();

  nameInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
});

// Function to add expense to DOM
function addExpenseToDOM(expense) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.dataset.id = expense.id;

  li.innerHTML = `
    <div>
      <strong>${expense.name}</strong> - ₹${expense.amount.toFixed(2)}
      <span class="badge bg-secondary ms-2">${expense.category}</span>
    </div>
    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
  `;

  li.querySelector('.delete-btn').addEventListener('click', () => {
    deleteExpense(expense.id);
  });

  expenseList.appendChild(li);
}

// Delete expense
function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  const el = expenseList.querySelector(`[data-id="${id}"]`);
  if (el) el.remove();
  saveExpenses();
}

// Save expenses to localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Dark mode toggle
toggleDarkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
