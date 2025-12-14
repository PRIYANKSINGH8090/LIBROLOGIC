const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");


let students = JSON.parse(localStorage.getItem("students")) || [];


function renderStudents() {
tableBody.innerHTML = "";
students.forEach(s => {
const row = document.createElement("tr");
row.innerHTML = `
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.department}</td>
<td>${s.email}</td>
<td>${s.phone}</td>
`;
tableBody.appendChild(row);
});
}


form.addEventListener("submit", e => {
e.preventDefault();


const student = {
id: studentId.value,
name: name.value,
department: department.value,
email: email.value,
phone: phone.value
};


students.push(student);
localStorage.setItem("students", JSON.stringify(students));
form.reset();
renderStudents();
});


renderStudents();