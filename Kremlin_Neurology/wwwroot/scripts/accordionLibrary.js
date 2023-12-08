window.addEventListener('DOMContentLoaded', () => {
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.height) {
                panel.style.height = null;
            } else {
                panel.style.height = panel.scrollHeight + "px";
            }
        })
    }
});