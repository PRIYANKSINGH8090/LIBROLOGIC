const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Filter out invalid entries
students = students.filter(s => s.id && s.name && s.department && s.email && s.phone);
localStorage.setItem("students", JSON.stringify(students));

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

    // 🔹 Get values
    const id = document.getElementById("studentId").value.trim();
    const nameVal = document.getElementById("studentName").value.trim();
    const dept = document.getElementById("department").value.trim();
    const mail = document.getElementById("email").value.trim();
    const phoneNo = document.getElementById("phone").value.trim();

    /* ---------- VALIDATION ---------- */

    // Empty fields
    if (!id || !nameVal || !dept || !mail || !phoneNo) {
        alert("All fields are required!");
        return;
    }

    // Name validation: only letters and spaces, at least 2 characters (no numbers, hyphens, or apostrophes)
    if (!/^[a-zA-Z\s]{2,}$/.test(nameVal)) {
        alert("Enter a valid name (only letters and spaces, at least 2 characters, no numbers, hyphens, or apostrophes)!");
        return;
    }

    // Department validation: at least 2 characters
    if (dept.length < 2) {
        alert("Department must be at least 2 characters!");
        return;
    }

    // Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(mail)) {
        alert("Enter a valid email address!");
        return;
    }

    // Phone number (10 digits)
    if (!/^[0-9]{10}$/.test(phoneNo)) {
        alert("Phone number must be 10 digits!");
        return;
    }

    // Duplicate Student ID
    if (students.some(s => s.id === id)) {
        alert("Student ID already exists!");
        return;
    }

    /* ---------- SAVE DATA ---------- */

    const student = {
        id,
        name: nameVal,
        department: dept,
        email: mail,
        phone: phoneNo
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    form.reset();
    renderStudents();
});

renderStudents();
