//for authentication
$(document).ready(() => {

    //connect to sign up form
    const signUpForm = $("form.signUpForm");
    const firstNameInput = $("input#firstName");
    const lastNameInput = $("input#lastName");
    const usernameInput = $("input#username");
    const emailInput = $("input#email");
    const passwordInput = $("input#password");

    signUpForm.on("submit", event => {
        //wait to submit until functions run
    event.preventDefault();
    const userData = {
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim(),
        username: usernameInput.val().trim(),
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
    };
    //run signUp when all data is input
    signUp(userData.firstName, userData.lastName, userData.username, userData.email, userData.password);
        //get values of all input
        firstNameInput.val("");
        lastNameInput.val("");
        usernameInput.val("");
        emailInput.val("");
        passwordInput.val("")
    });

    signUp(firstName, lastName, username, email, password => {
        //post to signUp
        $.post("/api/signUp", {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        //redirect to profile page once logged in
        }) .then(() => { 
            // window.location.replace("/PROFILE.html HERE***")
        });
    });
});