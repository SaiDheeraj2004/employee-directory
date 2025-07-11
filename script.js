let employees = [
  { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", department: "IT", role: "Developer" },
  { id: 3, firstName: "Charlie", lastName: "Lee", email: "charlie@example.com", department: "Finance", role: "Analyst" }
];

const list = document.getElementById("employee-list");
const addBtn = document.getElementById("add-employee-btn");
const formContainer = document.getElementById("employee-form-container");
const form = document.getElementById("employee-form");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search-input");

let editingId = null;

function renderEmployees(filteredEmployees) {
  list.innerHTML = "";
  filteredEmployees.forEach(emp => {
    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <p>ID: ${emp.id}</p>
      <p>Name: ${emp.firstName} ${emp.lastName}</p>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    list.appendChild(div);
  });
}

function showForm(edit = false) {
  formContainer.style.display = "block";
  document.getElementById("form-title").innerText = edit ? "Edit Employee" : "Add Employee";
}

function hideForm() {
  formContainer.style.display = "none";
  form.reset();
  editingId = null;
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const newEmp = {
    id: editingId || Date.now(),
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    department: form.department.value,
    role: form.role.value
  };
  if (editingId) {
    const idx = employees.findIndex(e => e.id === editingId);
    employees[idx] = newEmp;
  } else {
    employees.push(newEmp);
  }
  renderEmployees(employees);
  hideForm();
});

addBtn.addEventListener("click", () => {
  editingId = null;
  showForm(false);
});

cancelBtn.addEventListener("click", hideForm);

function editEmployee(id) {
  editingId = id;
  const emp = employees.find(e => e.id === id);
  form.firstName.value = emp.firstName;
  form.lastName.value = emp.lastName;
  form.email.value = emp.email;
  form.department.value = emp.department;
  form.role.value = emp.role;
  showForm(true);
}

function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  renderEmployees(employees);
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = employees.filter(e =>
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)
  );
  renderEmployees(filtered);
});

renderEmployees(employees);