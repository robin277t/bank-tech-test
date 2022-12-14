class Account {
  constructor() {
    this.accountBalance = 0;
    this.transactionLog = [];
    this.instructions = `Your new account options and the inputs needed are as follows:
        deposit('YYYY/MM/DD', number)
        withdraw('YYYY/MM/DD', number)
        printStatement()`;
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
    let typePrint;
    if (logType === "deposit") {
      typePrint = `${amount.toFixed(2)} || `;
    } else if (logType === "withdraw") {
      typePrint = ` || ${amount.toFixed(2)}`;
    }
    let record = `${date} || ${typePrint} || ${this.accountBalance.toFixed(2)}`;
    this.transactionLog.unshift(record);
  }

  printStatement() {
    let statement = "date || debit || credit || balance\n";
    this.transactionLog.forEach((record) => {
      statement += `${record}\n`;
    });
    return statement;
  }
}

module.exports = Account;
