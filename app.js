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

  deposit(amount, date) {
    this.accountBalance += amount;
    this.createLogRecord("deposit", amount, date);
  }

  withdraw(amount, date) {
    this.accountBalance -= amount;
    this.createLogRecord("withdraw", amount, date);
  }

  createLogRecord(logType, amount, date) {
    let record = { date: date, deposit: amount, balance: this.accountBalance };
    if (logType === "withdraw") {
      record.withdraw = record.deposit;
      delete record.deposit;
    }
    this.transactionLog.push(record);
  }
}

module.exports = Account;
