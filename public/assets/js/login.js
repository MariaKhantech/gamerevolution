//for authentication

$(document).ready(() => {
    const loginForm = $("form.login");
    const emailInput = $("input#emailInput");
    const passwordInput = $("input#passwordInput");

    //on click event for login submission
    loginForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        //if criteria missing, do not proceed
        if (!userData.email || !userData.password) {
            return;
        }

        //then login user
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");

    });

        //direct user to profile once logged in
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(() => {
            window.location.replace("/profile");
        });
    };




});