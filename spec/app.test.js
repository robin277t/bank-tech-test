const Account = require("../app");

describe("Block 1: Constructor", () => {
  it("1- instantiate new Account creates a var accountBalance === 0", () => {
    const accountTest = new Account();
    expect(accountTest.accountBalance).toBe(0);
  });
  it("2- instantiate new Account creates a blank array", () => {
    const accountTest = new Account();
    expect(accountTest.transactionLog).toStrictEqual([]);
    expect(accountTest.transactionLog.length).toBe(0);
  });
  it("3- instantiate new Account calls a console.log message", () => {
    const accountTest = new Account();
    expect(accountTest.instructions)
      .toBe(`New account created: Your options and the inputs needed are as follows:
        deposit(number, 'YYYY/MM/DD') --date optional, will revert to today
        withdraw(number, 'YYYY/MM/DD') --date optional, will revert to today
        printStatement()`);
  });
});

describe("Block 2: Desposit and Withdraw", () => {
  beforeEach(() => {
    accountTest = new Account();
  });
  it("4- deposit 100 once", () => {
    accountTest.deposit(100);
    expect(accountTest.accountBalance).toBe(100.0);
  });
  it("5- deposit twice; 100 & 600.20", () => {
    accountTest.deposit(100);
    accountTest.deposit(600.2);
    expect(accountTest.accountBalance).toBe(700.2);
  });
  it("6- withdraw 100 once", () => {
    accountTest.withdraw(100);
    expect(accountTest.accountBalance).toBe(-100.0);
  });
  it("7- withdraw twice; 250 & 110.50", () => {
    accountTest.withdraw(250);
    accountTest.withdraw(110.5);
    expect(accountTest.accountBalance).toBe(-360.5);
  });
  it("8- withdraw twice; 250 & 110.50", () => {
    accountTest.deposit(2000);
    accountTest.withdraw(1200);
    expect(accountTest.accountBalance).toBe(800.0);
  });
});

describe("Block 3: Log records", () => {
  beforeEach(() => {
    accountTest = new Account();
  });
  it("9- deposit once creates one record in log", () => {
    accountTest.deposit(100);
    expect(accountTest.transactionLog.length).toBe(1);
  });
  it("10- deposit once with date and amount creates log record", () => {
    accountTest.deposit(100, "2022/01/01");
    expect(accountTest.transactionLog).toEqual([
      "2022/01/01 || 100.00 ||  || 100.00",
    ]);
  });
  it("11- deposit twice with date and amount creates 2x log records", () => {
    accountTest.deposit(100, "2022/01/01");
    accountTest.deposit(200, "2022/01/02");
    expect(accountTest.transactionLog.length).toBe(2);
    expect(accountTest.transactionLog).toEqual([
      "2022/01/02 || 200.00 ||  || 300.00",
      "2022/01/01 || 100.00 ||  || 100.00",
    ]);
  });
  it("12- withdraw once with date and amount creates log record", () => {
    accountTest.withdraw(1300, "2022/01/03");
    expect(accountTest.transactionLog).toEqual([
      "2022/01/03 ||  || 1300.00 || -1300.00",
    ]);
  });
  it("13- withdraw twice with date and amount creates 2x log records", () => {
    accountTest.withdraw(1300, "2022/01/03");
    accountTest.withdraw(25, "2022/01/04");
    expect(accountTest.transactionLog).toEqual([
      "2022/01/04 ||  || 25.00 || -1325.00",
      "2022/01/03 ||  || 1300.00 || -1300.00",
    ]);
  });
  it("14- deposit twice and withdraw once with date and amount creates 3x log records", () => {
    accountTest.deposit(2000, "2022/01/05");
    accountTest.deposit(1000, "2022/01/06");
    accountTest.withdraw(3500.75, "2022/01/07");
    expect(accountTest.transactionLog).toEqual([
      "2022/01/07 ||  || 3500.75 || -500.75",
      "2022/01/06 || 1000.00 ||  || 3000.00",
      "2022/01/05 || 2000.00 ||  || 2000.00",
    ]);
  });
});

describe("Block 4: Print Statements", () => {
  beforeEach(() => {
    accountTest = new Account();
  });
  it("15- printStatement function returns a header string", () => {
    expect(accountTest.printStatement()).toContain(
      "date || debit || credit || balance"
    );
  });
  it("16- printStatement after deposit returns a statement", () => {
    accountTest.deposit(100, "2022/01/01");
    expect(accountTest.printStatement()).toContain(
      "2022/01/01 || 100.00 ||  || 100.00"
    );
  });
  it("17- printStatement after withdraw returns a string", () => {
    accountTest.withdraw(400.5, "2022/01/04");
    expect(accountTest.printStatement()).toContain(
      "2022/01/04 ||  || 400.50 || -400.50"
    );
  });
  it("18- printStatement after withdraw and deposit returns lines in reverse time order", () => {
    accountTest.withdraw(400, "2022/01/05");
    accountTest.deposit(700.25, "2022/01/06");
    expect(accountTest.printStatement()).toBe(
      "date || debit || credit || balance\n2022/01/06 || 700.25 ||  || 300.25\n2022/01/05 ||  || 400.00 || -400.00\n"
    );
  });
});

describe("Block 5: Edge cases and user testing", () => {
  //There's a very small chance some tests in this block could fail if run exactly at the stroke of midnight...
  beforeEach(() => {
    accountTest = new Account();
    dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  });
  it("19- ensure 'date' argument called with deposit or withdraw functions is most recent transaction", () => {
    accountTest.deposit(400, "2022/02/02");
    accountTest.withdraw(300, "2022/01/01");
    expect(accountTest.transactionLog[0]).toContain(dateToday);
  });
  it("20- ensure 'date' argument called with deposit or withdraw functions is a valid date string", () => {
    accountTest.deposit(400, "2022/02/02");
    accountTest.withdraw(300, "2022x033z12");
    expect(accountTest.transactionLog[0]).toContain(dateToday);
    expect(accountTest.transactionLog[1]).toContain("2022/02/02");
  });
  it("21- check 'amount' argument called with deposit or withdraw functions is a valid number", () => {
    accountTest.deposit(400, "2022/02/02");
    accountTest.withdraw("500", "2022/02/03");
    accountTest.deposit("thirty pounds", "2022/02/02");
    expect(accountTest.transactionLog[0]).not.toContain("500.00");
    expect(accountTest.transactionLog[0]).not.toContain("30.00");
  });
});
