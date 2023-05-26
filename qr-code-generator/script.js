const wrapper = document.querySelector(".wrapper"),
    qrInput = wrapper.querySelector(".form input"),
    generateBtn = wrapper.querySelector(".form button"),
    qrImg = wrapper.querySelector(".qr-code-wrapper img");

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue) return;
    generateBtn.innerText = "Generating QR Code...";

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR code";
    });
});

qrInput.add("keyup", () => {
    if (!qrInput.value) {
        wrapper.classList.remove("active");
    }
});
