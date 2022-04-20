const inputLogin = document.getElementById("login");
const inputPassword = document.getElementById("password");

document.getElementById("btn-submit").addEventListener("click", function (e) {
    if (validatorForm(inputLogin) && validatorForm(inputPassword)) {
        e.preventDefault();
    } else if (validatorForm(inputLogin)) {
        e.preventDefault();
    } else if (validatorForm(inputPassword)) {
        e.preventDefault();
    }
    return true;
});

function validatorForm(input) {
    if (input.value.trim().length <= 0) {
        input.style.borderBottomColor = "#f00";
        input.setAttribute("placeholder", "Preencha este Campo");
        return true;
    } else {
        input.style.borderBottomColor = "#ccc";
        input.removeAttribute("placeholder");
        return false;
    }
}
