// client/script.js
const form = document.getElementById('employeeForm');
const employeeList = document.getElementById('employeeList');

async function fetchEmployees() {
    const response = await fetch('http://localhost:5000/employees');
    const employees = await response.json();
    employeeList.innerHTML = '';
    employees.forEach(emp => {
        const li = document.createElement('li');
        li.textContent = `${emp.name} - ${emp.position} - ${emp.department}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.onclick = () => deleteEmployee(emp._id);
        li.appendChild(deleteBtn);
        employeeList.appendChild(li);
    });
}

async function addEmployee(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    
    await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, position, department })
    });

    form.reset();
    fetchEmployees();
}

async function deleteEmployee(id) {
    await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'DELETE'
    });
    fetchEmployees();
}

form.addEventListener('submit', addEmployee);
fetchEmployees();
