$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)

function Validator(dataValidator) {
    // function handle validate
    function validate(input, ruleList) {
        for (i in ruleList) {
            // get element message contain input error
            var errorElement = input.parentElement.parentElement.querySelector(dataValidator.errorSelector)
            // get error message
            var errorMessage = ruleList[i].test(input.value)
            // inner to element and toggle class invalid
            if (errorMessage) {
                errorElement.innerText = errorMessage;
                input.classList.add("invalid")
                break
            } else {
                errorElement.innerText = "";
                input.classList.remove("invalid")
            }
        }
    }

    // onclick submit function
    function validateSubmit(submitBtn) {
        // onclick sign in
        submitBtn[0].onclick = function () {
            formElement = submitBtn[0].parentElement
            if (formElement) {
                selectorList = []
                dataValidator.rules.forEach(function (rule) {
                    selectorList.push(rule.selector)
                })
                // get rules run func validate
                selectorList.forEach(function (selector) {
                    var inputElement = formElement.querySelector(selector)
                    if (inputElement) {
                        rulesList = []
                        dataValidator.rules.forEach(function (rule) {
                            if (rule.selector == selector) {
                                rulesList.push(rule)
                            }
                        })
                        validate(inputElement, rulesList)
                    }
                })
            }
            var infoAc = []
            listMessageE = formElement.querySelectorAll(".sign_form-message")
            for (var i = 0; i < listMessageE.length; i++){
                if ((listMessageE[i].outerText) == ""){
                    infoAc[i] = listMessageE[i].parentElement.querySelector("input").value
                }
            }
            var iUser = localStorage.getItem("iUser")
            var length = Number(iUser)
            for (var j = 0; j < length; j++){
                var DataUser = JSON.parse(localStorage.getItem(`DataUser${j+1}`)) 
                if ((DataUser.username == infoAc[0]) && (DataUser.password == infoAc[1])){
                    $(".sign_form").style.display = "none"
                    $(".app").classList.remove("none")
                    $(".content-audio").play()
                    $(".content-audio").setAttribute("autoplay", true)
                }
            }
        }    
        // onclick sign up
        submitBtn[1].onclick = function () {
            var infoAc = []
            // check validate
            formElement = submitBtn[1].parentElement
            // get rule to validate
            if (formElement) {
                selectorList = []
                dataValidator.rules.forEach(function (rule) {
                    selectorList.push(rule.selector)
                })
                selectorList.forEach(function (selector) {
                    var inputElement = formElement.querySelector(selector)
                    if (inputElement) {
                        rulesList = []
                        dataValidator.rules.forEach(function (rule) {
                            if (rule.selector == selector) {
                                rulesList.push(rule)
                            }
                        })
                        validate(inputElement, rulesList)
                    }
                    listMessageE = formElement.querySelectorAll(".sign_form-message")
                    for (var i = 0; i < listMessageE.length; i++){
                        if ((listMessageE[i].outerText) == ""){
                            infoAc[i] = listMessageE[i].parentElement.querySelector("input").value
                        }
                        else{
                            infoAc = []
                            break
                        }
                    }
                })
            }
            if (infoAc.length !== 0){
                var iUser = localStorage.getItem("iUser")
                var length = Number(iUser)
                for (var j = 0; j < length; j++){
                    var DataUser = JSON.parse(localStorage.getItem(`DataUser${j+1}`)) 
                    if ((DataUser.username == infoAc[0]) || (DataUser.email == infoAc[1])){
                        formElement.querySelectorAll(".sign_form-message")[3].innerText = "Username Or Email Already Used"
                        break
                    }
                }
                if (formElement.querySelectorAll(".sign_form-message")[3].outerText == ""){
                    iUser = Number(iUser) + 1
                    localStorage.setItem(`DataUser${iUser}`, JSON.stringify({
                        username: infoAc[0],
                        email: infoAc[1],
                        password: infoAc[2]
                    }))
                    localStorage.setItem("iUser", iUser)
                }
            }
        }
    }
    // get form 
    formElement = document.querySelector(dataValidator.form)
    if (formElement) {
        selectorList = []
        // get rule to validate
        dataValidator.rules.forEach(function (rule) {
            selectorList.push(rule.selector)
        })
        selectorList.forEach(function (selector, index) {
            var inputElement = formElement.querySelector(selector)
            if (inputElement) {
                inputElement.onblur = function () {
                    rulesList = []
                    dataValidator.rules.forEach(function (rule) {
                        if (rule.selector == selector) {
                            rulesList.push(rule)
                        }
                    })
                    validate(inputElement, rulesList)
                }
            }
            // handle when user enter
            inputElement.oninput = function () {
                var errorElement = inputElement.parentElement.parentElement.querySelector(dataValidator.errorSelector)
                errorElement.innerText = "";
                inputElement.classList.remove("invalid")
            }
        })
    }
    // run func when user submit
    validateSubmit(document.querySelectorAll(".sign_form-submit"))
}


// Rules Validator
// check emty
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || "Please enter this field"
        }
    }
}
// check email
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var re = /\S+@\S+\.\S+/;
            return re.test(value) ? undefined : message || "please enter correct email"
        }
    }
}
// check password re-enter
Validator.isPasswordConfirmation = function (selector, valuePassword, formE, message) {
    return {
        selector: selector,
        test: function (value) {
            formElement = document.querySelector(formE)
            valueElement = formElement.querySelector(valuePassword)
            return value == valueElement.value ? undefined : message || "Re-entered password is incorrect"
        }
    }
}
// check min length user enter
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            if (value.length > 0) {
                return value.length >= min ? undefined : message || `Enter at least ${min} characters`
            }
        }
    }
}
