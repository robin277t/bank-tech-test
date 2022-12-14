class Account {
  constructor() {
    this.accountBalance = 0;
    this.transactionLog = [];
    this.instructions = `New account created: Your options and the inputs needed are as follows:
        deposit(number, 'YYYY/MM/DD') --date optional, will revert to today
        withdraw(number, 'YYYY/MM/DD') --date optional, will revert to today
        printStatement()`;
    console.log(this.instructions);
  }

  deposit(amount, date) {
    if (typeof amount != "number") {
      console.log("invalid numerical input, nothing deposited");
      return;
    }
    this.accountBalance += amount;
    this.createLogRecord("deposit", amount, this.dateCheck(date));
    console.log(`Your have successfully deposited ${amount} into your account`);
  }

  withdraw(amount, date) {
    if (typeof amount != "number") {
      console.log("invalid numerical input, nothing withdrawn");
      return;
    }
    this.accountBalance -= amount;
    this.createLogRecord("withdraw", amount, this.dateCheck(date));
    console.log(`Your have successfully withdrawn ${amount} from your account`);
  }

  dateCheck(date) {
    const todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
    const validDateFormat =
      /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/.test(date);
    if (
      (this.transactionLog.length > 0 &&
        date < this.transactionLog[0].slice(0, 10)) ||
      validDateFormat === false
    ) {
      console.log("date input is wrong or missing, reverting to today's date");
      return todayDate;
    } else {
      return date;
    }
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
