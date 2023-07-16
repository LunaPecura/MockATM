// HELPER FUNCTION
const denomBreakDown = (arrayOfDenominations, dollarAmount) => {
	let arrayCopy = [...arrayOfDenominations];
	let accumulator = [];

	const f = (array, amount) => {
		if(array.length === 0) { return; }
		let denom = array.pop();
		accumulator.push(Math.floor(amount/denom));
		f(array, amount%denom);
	}

	f(arrayCopy, dollarAmount);
	return accumulator;
}



class ATM {
	currentBalance =  Math.floor(Math.random() * 5000) + 1;
	buttons = document.querySelectorAll("button");

	// HELPER FUNCTIONS
	output(str) { document.querySelector('#outputScreen').innerHTML = str; }
	takeMoneyMsg() { this.output("Please remove money from tray"); }
	unwireButtons() { this.buttons.forEach(b => b.removeAttribute("onclick")); }
	wireButtons() {
		document.querySelector("#balanceButton").setAttribute("onclick", "myATM.checkBalance()");
		document.querySelector("#exitButton").setAttribute("onclick", "myATM.exit()");
		document.querySelector("#depositButton").setAttribute("onclick", "myATM.makeDeposit()");
		document.querySelector("#withdrawalButton").setAttribute("onclick", "myATM.makeWithdrawal()");
	}


	// CLASS METHODS
	checkBalance() { this.output(`Your current balance is:<br>$${this.currentBalance}`) }
	exit() { this.output("WELCOME"); }


	makeDeposit() {
		let depositAmount = Math.floor(Math.random() * 1000) + 1;
		this.currentBalance += depositAmount;
		this.output(`Deposit: $${depositAmount}<p>Your new balance is:<br>$${this.currentBalance}</p>`);
	}


	makeWithdrawal() {
		let withdrawalAmount = Math.floor(Math.random() * 500) + 1;

		if(withdrawalAmount <= this.currentBalance) {
			this.currentBalance -= withdrawalAmount;
			this.output(`Withdrawal: $${withdrawalAmount}
						<p>Your new balance is:<br>$${this.currentBalance}</p>`);
			setTimeout(() => { this.showMoney(withdrawalAmount); }, 0);
			this.unwireButtons();
			this.buttons.forEach(b => b.setAttribute("onclick", "myATM.takeMoneyMsg()"));
		} else { this.output(`Attempted Withdrawal: $${withdrawalAmount}
						<p>Your current balance is:<br>$${this.currentBalance}</p>`); }
	} 


	showMoney(amount) {
		let denoms = [100,20,10,5,1];
		let denomTags = ["hundred", "twenty", "ten", "five", "one"];
		let occurrences = denomBreakDown([...denoms].reverse(), amount);
		let billsDiv = document.querySelector(".billsDiv");

		const makeBillDivString = (denom, denomTag) => {
			return `<div class="bill"><div class="billText ${denomTag}">$${denom}</div></div>\n`;
		}
		
		let rows = [];
		occurrences.forEach((occ, i) => {
			for(let j=1; j<=occ; j++) {
				rows.push(makeBillDivString(denoms[i], denomTags[i]));
			}
		})

		rows.forEach((row, i) => {
			setTimeout(() => { billsDiv.innerHTML += row; }, 250*(i+1));
		})

		billsDiv.classList.remove("hidden")
		billsDiv.setAttribute("onclick", "myATM.takeMoney()");
	}


	takeMoney() {
		let billsDiv = document.querySelector(".billsDiv");
		billsDiv.innerHTML = "";
		billsDiv.classList.add("hidden");
		this.unwireButtons();
		this.wireButtons();
		this.output("Have a nice day");
	}
}

let myATM = new ATM();


