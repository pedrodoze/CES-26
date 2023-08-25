document.addEventListener("DOMContentLoaded", function() {
    const adminButtons = document.querySelectorAll(".admin-button");
    const adminText = document.querySelector(".admin-text");

    adminButtons.forEach(button => {
        button.addEventListener("click", function() {
            adminText.textContent = this.getAttribute("data-text");
            adminText.style.display = "block";
        });
    });
});