// ---------- QR GENERATOR ----------
function generateQR() {
    const qrContainer = document.getElementById("qrCode");
    const text = document.getElementById("bookInput").value;

    qrContainer.innerHTML = "";

    if (text.trim() === "") {
        alert("Enter book information!");
        return;
    }

    new QRCode(qrContainer, {
        text: text,
        width: 180,
        height: 180
    });
}

// ---------- QR SCANNER ----------
const bookList = document.getElementById("bookList");

let lastScannedText = "";
let scanCooldown = false;

function onScanSuccess(decodedText) {
    // Prevent rapid duplicate scans
    if (scanCooldown || decodedText === lastScannedText) {
        return;
    }

    scanCooldown = true;
    lastScannedText = decodedText;

    // Add scanned book to list
    const li = document.createElement("li");
    li.textContent = decodedText;
    bookList.appendChild(li);

    // Cooldown time (2 seconds)
    setTimeout(() => {
        scanCooldown = false;
    }, 2000);
}

const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        html5QrCode.start(
            devices[0].id,
            {
                fps: 5,        // slower scanning
                qrbox: 200
            },
            onScanSuccess
        );
    }
}).catch(err => {
    console.error(err);
});
