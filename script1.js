function generateQR() {
    const qrContainer = document.getElementById("qrCode");
    const bookData = document.getElementById("bookInput").value;

    // Clear old QR
    qrContainer.innerHTML = "";

    if (bookData.trim() === "") {
        alert("Please enter book information!");
        return;
    }

    // Generate QR
    new QRCode(qrContainer, {
        text: bookData,
        width: 200,
        height: 200
    });
}
