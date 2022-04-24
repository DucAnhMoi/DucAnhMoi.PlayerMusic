$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)

var btnSigninBox = $(".sign_form-main-btn-box-in"),
btnSignupBox = $(".sign_form-main-btn-box-up"),
btnSignin = $(".sign_form-main-btn-in"),
btnSignup = $(".sign_form-main-btn-up"),
form = $(".sign_form-main"),
signFormin = $(".sign_form-in"),
signFormup = $(".sign_form-up")

Validator({
    form: ".sign_form-in",
    errorSelector: ".sign_form-message",
    rules: [
        Validator.isRequired("#fullname"),
        Validator.isRequired("#password")
    ]
})
    // Validator sign up
Validator({
    form: ".sign_form-up",
    errorSelector: ".sign_form-message",
    rules: [
        Validator.isRequired("#fullname"),
        Validator.isRequired("#email"),
        Validator.isEmail("#email"),
        Validator.isRequired("#password"),
        Validator.minLength("#password", 6),
        Validator.isRequired("#password_confirmation"),
        Validator.isPasswordConfirmation("#password_confirmation", "#password", ".sign_form-up")
    ]
})
   
    
function start(){
    // runCode signin sign up
    btnChangeFormMain()
    handleOnTouchMove()
    // onclick fb, google, forgot pw
    $$(".sign_form-group-other-item").forEach(function (btn) {
        btn.onclick = () => {
            alert("Chả có gì đâu, ấn con cua nhé!!!!")
        }
    })
    $(".sign_form-forgetps").onclick = () => {
        alert("Chả có gì đâu, ấn con cua nhé!!!!")
    }
}

function btnSignUp(){
    form.classList.add("sign_form-main-change")
    btnSigninBox.classList.remove("opacity")
    btnSignupBox.classList.add("opacity")
    changeVariableColor("#f43648", "#03a9f4")
    signFormin.classList.add("sign_form-in-change")
    signFormup.classList.add("sign_form-up-change")
}

function btnSignIn(){
    form.classList.remove("sign_form-main-change")
    btnSigninBox.classList.add("opacity")
    btnSignupBox.classList.remove("opacity")
    changeVariableColor("#03a9f4", "#f43648")
    signFormin.classList.remove("sign_form-in-change")
    signFormup.classList.remove("sign_form-up-change")
}

// sign in and sign up
function btnChangeFormMain() {
    // click btn to change form
    btnSignup.onclick = function () {
        btnSignUp()
    }
    btnSignin.onclick = function () {
        btnSignIn()
    }
}

// Change color change variable func
function changeVariableColor(value1, value2) {
    document.documentElement.style.setProperty("--color-sign-change-1", value1);
    document.documentElement.style.setProperty("--color-sign-change-2", value2);
}

// Change form by scroll
function handleOnTouchMove(){
    var i = 0
    document.querySelector("body").ontouchmove = function(){
        i = i + 1
        if ((i >= 50) && (btnSigninBox.contains(document.querySelector(".opacity")))){
            btnSignUp()
            i = 0
        }
        else if ((i >= 50) && (btnSignupBox.contains(document.querySelector(".opacity")))){
            btnSignIn()
            i = 0
        }
    }
}

// Run
start()