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
      .toBe(`Your new account options and the inputs needed are as follows:
        deposit('YYYY/MM/DD', number)
        withdraw('YYYY/MM/DD', number)
        printStatement()`);
  });
});

describe("Block 2: Desposit and Withdraw", () => {
  beforeEach(() => {
    accountTest = new Account();
  });
  it("4- deposit 100 once", () => {
    accountTest.deposit(100);
    expect(accountTest.accountBalance).toBe(100);
  });
  it("5- deposit twice; 100 & 600.20", () => {
    accountTest.deposit(100);
    accountTest.deposit(600.2);
    expect(accountTest.accountBalance).toBe(700.2);
  });
  it("6- withdraw 100 once", () => {
    accountTest.withdraw(100);
    expect(accountTest.accountBalance).toBe(-100);
  });
  it("7- withdraw twice; 250 & 110.50", () => {
    accountTest.withdraw(250);
    accountTest.withdraw(110.5);
    expect(accountTest.accountBalance).toBe(-360.5);
  });
  it("8- withdraw twice; 250 & 110.50", () => {
    accountTest.deposit(2000);
    accountTest.withdraw(1200);
    expect(accountTest.accountBalance).toBe(800);
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
      { date: "2022/01/01", deposit: 100, balance: 100 },
    ]);
  });
  it("11- deposit twice with date and amount creates 2x log records", () => {
    accountTest.deposit(100, "2022/01/01");
    accountTest.deposit(200, "2022/01/02");
    expect(accountTest.transactionLog.length).toBe(2);
    expect(accountTest.transactionLog).toEqual([
      { date: "2022/01/01", deposit: 100, balance: 100 },
      { date: "2022/01/02", deposit: 200, balance: 300 },
    ]);
  });
  it("12- withdraw once with date and amount creates log record", () => {
    accountTest.withdraw(1300, "2022/01/03");
    expect(accountTest.transactionLog).toEqual([
      { date: "2022/01/03", withdraw: 1300, balance: -1300 },
    ]);
  });
  it("13- withdraw twice with date and amount creates 2x log records", () => {
    accountTest.withdraw(1300, "2022/01/03");
    accountTest.withdraw(25, "2022/01/04");
    expect(accountTest.transactionLog).toEqual([
      { date: "2022/01/03", withdraw: 1300, balance: -1300 },
      { date: "2022/01/04", withdraw: 25, balance: -1325 },
    ]);
  });
  it("14- deposit twice and withdraw once with date and amount creates 3x log records", () => {
    accountTest.deposit(2000, "2022/01/05");
    accountTest.deposit(1000, "2022/01/06");
    accountTest.withdraw(3500.75, "2022/01/07");
    expect(accountTest.transactionLog).toEqual([
      { date: "2022/01/05", deposit: 2000, balance: 2000 },
      { date: "2022/01/06", deposit: 1000, balance: 3000 },
      { date: "2022/01/07", withdraw: 3500.75, balance: -500.75 },
    ]);
  });
});
