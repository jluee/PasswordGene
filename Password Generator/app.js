const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => { // looping through each option's checkbox
        if(option.checked) { // if checkbox is checked
            // if checkbox id isn't exc-duplicate && spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
            // adding particular key value from character object to staticPassword
            staticPassword += characters[option.id]
            } else if(option.id === "spaces") { //if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `; // adding spaces at the beginning & end of staticPassword
            } else { // else pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        // getting random character from the static password 
        // let randomChar = randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)];
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { // if excludeDuplicate is true
            // if randomPassword doesn't contain the current random character or randomChar is equal
            // to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // else add random character to randomPassword
            randomPassword += randomChar;
        }
    } // this function is fucked - needs work asap

    passwordInput.value = randomPassword; // passing randomPassword to passwordInput value
}

const updatePassIndicator = () => {
    if(lengthSlider.value <= 8) {
        passIndicator.id = "weak";
    } else if (lengthSlider.value <= 16) {
        passIndicator.id = "medium";
    } else {
        passIndicator.id = "strong";
    }
}

const updateSlider = () => {
    // passsing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check"
    setTimeout(() => {
        copyIcon.innerText = "copy_all"
    }, 1500)
}

copyIcon.addEventListener("click", copyPassword)
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);