class Account {
  constructor() {
    this.accountBalance = 0;
    this.transactionLog = [];
    this.instructions = `Your new account options and the inputs needed are as follows:
        deposit('YYYY/MM/DD', number)
        withdraw('YYYY/MM/DD', number)
        printStatement()`;
    //TODO improve instruction printing out to the REPL
    console.log(this.instructions);
  }

  deposit(amount) {
    this.accountBalance += amount;
  }

  withdraw(amount) {
    this.accountBalance -= amount;
  }
}

module.exports = Account;
