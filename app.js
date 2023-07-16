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
		let drawer = document.querySelector("#frameBottom");
		let depositAmount = Math.floor(Math.random() * 500) + 1;
		this.currentBalance += depositAmount;
		this.showMoney(depositAmount);
		this.output(`Depositing $${depositAmount}...`);
		this.unwireButtons();

		setTimeout(() => {
			drawer.setAttribute("style", "animation: closeDrawer 2s forwards");
		}, 2000);

		setTimeout(() => {
			drawer.removeAttribute("style");
			document.querySelector(".billsDiv").innerHTML = "";
			drawer.setAttribute("style", "animation: openDrawer 2s forwards");
		}, 4000);

		setTimeout(() => {
			this.output(`Deposit successful.<p>Your new balance is:<br>$${this.currentBalance}</p>`);
			this.wireButtons();
		}, 6000);
	}


	makeWithdrawal() {
		let withdrawalAmount = Math.floor(Math.random() * 500) + 1;

		if(withdrawalAmount <= this.currentBalance) {
			this.currentBalance -= withdrawalAmount;
			this.output(`Withdrawal: $${withdrawalAmount}
						<p>Your new balance is:<br>$${this.currentBalance}</p>`);
			this.showMoney(withdrawalAmount);
			this.unwireButtons();
			this.buttons.forEach(b => b.setAttribute("onclick", "myATM.takeMoneyMsg()"));
			document.querySelector(".billsDiv").setAttribute("onclick", "myATM.takeMoney()");
		} else { this.output(`Attempted Withdrawal: $${withdrawalAmount}
						<p>Your current balance is:<br>$${this.currentBalance}</p>`); }
	} 


	showMoney(amount) {
		let denoms = [100,20,10,5,1];
		let denomTags = ["hundred", "twenty", "ten", "five", "one"];
		let occurrences = denomBreakDown([...denoms].reverse(), amount);
		let billsDiv = document.querySelector(".billsDiv");

		// helper function
		const makeBillDivString = (denom, denomTag) => {
			return `<div class="bill"><div class="billText ${denomTag}">$${denom}</div></div>\n`;
		}
		
		// display bills
		let rows = [];
		occurrences.forEach((occ, i) => {
			for(let j=1; j<=occ; j++) { rows.push(makeBillDivString(denoms[i], denomTags[i])); } })
		rows.forEach((row, i) => { setTimeout(() => { billsDiv.innerHTML += row; }, 100*(i+1)); });
	}


	takeMoney() {
		let billsDiv = document.querySelector(".billsDiv");
		billsDiv.innerHTML = "";
		this.unwireButtons();
		this.wireButtons();
		this.output("Have a nice day");
		billsDiv.removeAttribute("onclick");
	}
}

let myATM = new ATM();


