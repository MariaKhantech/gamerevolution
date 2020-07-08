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
        console.log(userData);

            //checks if user enetered all criteria - returns if not
            // if (!userData.firstName || !userData.lastName || !userData.username || !userData.email || !userData.password) {
            //     return;
            // }

    //run signUp when all data is input
    signUp(userData.firstName, userData.lastName, userData.username, userData.email, userData.password);
        //get values of all input
        // firstNameInput.val("");
        // lastNameInput.val("");
        // usernameInput.val("");
        // emailInput.val("");
        // passwordInput.val("");
    });

    function signUp(firstNameParam, lastNameParam, usernameParam, emailParam, passwordParam) {
        console.log(firstNameParam, lastNameParam, usernameParam, emailParam, passwordParam);
        // post to signUp
        $.post("/api/signup", {
            firstName: firstNameParam,
            lastName: lastNameParam,
            username: usernameParam,
            email: emailParam,
            password: passwordParam
        //redirect to profile page once logged in
        }).then(() => { 
            console.log("It somewhat works! :)");
            // window.location.replace("/profile");
        }).catch(err => {
            if (err) {
                throw (err);
            };    
        })
    };
});