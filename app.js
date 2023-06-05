let output = document.querySelector('#outputScreen'); 
let currentBalance =  Math.floor(Math.random() * 5000) + 1;

function checkBalance() {
    output.innerHTML = "Your current balance is: $" + currentBalance;
}

function makeDeposit() {
    let depositAmount = Math.floor(Math.random() * 1000) + 1;
    currentBalance += depositAmount;
    output.innerHTML = "You deposited $" + depositAmount + 
        "<br>Your new balance is: $" + currentBalance;
}

function makeWithdrawal() {
    let withdrawalAmount = Math.floor(Math.random() * 500) + 1;

    if(withdrawalAmount > currentBalance) {
        output.innerHTML = "No can do" +
            "<br>You attempted to withdraw $" + withdrawalAmount +
            "<br>Your current balance is: $" + currentBalance;
    } else {
        currentBalance -= withdrawalAmount;
        output.innerHTML = "You withdrew $" + withdrawalAmount + 
            "<br>Your new balance is: $" + currentBalance;
    }
} 

function exit() {
    output.innerHTML = "WELCOME";
}