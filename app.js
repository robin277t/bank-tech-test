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
    let record = {
      date: date,
      deposit: amount,
      balance: this.accountBalance,
    };
    if (logType === "withdraw") {
      record.withdraw = record.deposit;
      delete record.deposit;
    }
    this.transactionLog.push(record);
    this.transactionLog.sort((a, b) => {
      return a.date < b.date ? 1 : b.date < a.date ? -1 : 0;
    });
  }

  printStatement() {
    let statement = "date || debit || credit || balance";
    let transactionTypePrint;
    this.transactionLog.forEach((record) => {
      if (record.deposit) {
        transactionTypePrint = `${record.deposit.toFixed(2)} || `;
      } else {
        transactionTypePrint = ` || ${record.withdraw.toFixed(2)}`;
      }
      statement += `\n${
        record.date
      } || ${transactionTypePrint} || ${record.balance.toFixed(2)}`;
    });
    return statement;
  }
}

module.exports = Account;
