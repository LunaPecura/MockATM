

class ATM {
	currentBalance =  Math.floor(Math.random() * 5000) + 1;

	output(str) {
		let outputElement = document.querySelector('#outputScreen'); 
		outputElement.innerHTML = str;
	}

	checkBalance() {
		//this.output.innerHTML = `Your current balance is:<br>$${this.currentBalance}`;
		this.output(`Your current balance is:<br>$${this.currentBalance}`)
	}

	makeDeposit() {
		let depositAmount = Math.floor(Math.random() * 1000) + 1;
		this.currentBalance += depositAmount;
		this.output(`Deposit: $${depositAmount}<p>Your new balance is:<br>$${this.currentBalance}</p>`);
	}

	makeWithdrawal() {
		let withdrawalAmount = Math.floor(Math.random() * 500) + 1;

		if(withdrawalAmount > this.currentBalance) {
			this.output(`Attempted Withdrawal: $${withdrawalAmount}
						<p>Your current balance is:<br>$${this.currentBalance}</p>`);
		} else {
			this.currentBalance -= withdrawalAmount;
			this.output(`Withdrawal: $${withdrawalAmount}
						<p>Your new balance is:<br>$${this.currentBalance}</p>`);
		}
	} 

	exit() {
		this.output("WELCOME");
	}
}

let myATM = new ATM();

