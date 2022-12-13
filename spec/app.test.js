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

describe("Despoit and Withdraw", () => {
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
