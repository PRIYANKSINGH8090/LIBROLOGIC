// ---------- ISSUE / RETURN BOOK ----------
const issuedList = document.getElementById("issuedList");

// Load issued books from storage
let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
renderIssuedBooks();

function issueBook() {
    const bookName = document.getElementById("issueBookName").value.trim();
    const studentName = document.getElementById("issueStudentName").value.trim();

    if (!bookName || !studentName) {
        alert("Please enter book and student name!");
        return;
    }

    issuedBooks.push({
        book: bookName,
        student: studentName,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
    renderIssuedBooks();

    document.getElementById("issueBookName").value = "";
    document.getElementById("issueStudentName").value = "";
}

function returnBook() {
    const bookName = document.getElementById("returnBookName").value.trim();

    if (!bookName) {
        alert("Enter book name to return!");
        return;
    }

    issuedBooks = issuedBooks.filter(item => item.book !== bookName);

    localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
    renderIssuedBooks();

    document.getElementById("returnBookName").value = "";
}

function renderIssuedBooks() {
    if (!issuedList) return;

    issuedList.innerHTML = "";
    issuedBooks.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>
                📖 <b>${item.book}</b><br>
                👤 ${item.student}<br>
                📅 ${item.date}
            </span>
        `;
        issuedList.appendChild(li);
    });
}
