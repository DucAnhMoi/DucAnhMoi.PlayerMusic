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
            // Data Sign In
            var DataSignInList = []
            var DataSignInListO = {
                userName: "a",
                email: "a",
                password: "a"
            }
            // Get data input user enter
            for (i in formElement.querySelectorAll(".sign_form-message")) {
                if (formElement.querySelectorAll(".sign_form-message")[i].outerText == "") {
                    DataSignInList.push(formElement.querySelectorAll(".sign_form-message")[i].parentElement.querySelector(".input-box").querySelector("input").value)
                }
                else {
                    break
                }
            }
            // return Data to server to compare
            DataSignInListO.userName = DataSignInList[0]
            DataSignInListO.password = DataSignInList[1]

            // Data on server
            var AccSignIn = [
                {
                    userName: "ducanh123",
                    email: "tducanh123@gmail.com",
                    password: "123456"
                }
            ]
            // compare data server and input user enter
            AccSignIn.forEach((AccSignInitem) => {
                if ((AccSignInitem.userName == DataSignInListO.userName) && (AccSignInitem.password == DataSignInListO.password)) {
                    document.querySelector(".sign_form").style.display = "none"
                    console.log(1)
                }
            })
        }
        // onclick sign up
        submitBtn[1].onclick = function () {
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
                })
            }
            // data Sign up
            var DataSignUpList = []
            var DataSignUpListO = {
                userName: "a",
                email: "a",
                password: "a"
            }
            // Get data user enter
            for (i in formElement.querySelectorAll(".sign_form-message")) {
                if (formElement.querySelectorAll(".sign_form-message")[i].outerText == "") {
                    DataSignUpList.push(formElement.querySelectorAll(".sign_form-message")[i].parentElement.querySelector(".input-box").querySelector("input").value)
                }
                else {
                    break
                }
            }
            // get data to return
            DataSignUpListO.userName = DataSignUpList[0]
            DataSignUpListO.email = DataSignUpList[1]
            DataSignUpListO.password = DataSignUpList[2]
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
