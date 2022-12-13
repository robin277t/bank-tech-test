const Account = require("../app");

describe("Block 1: Constructor", () => {
  it("instantiate new Account creates a var accountBalance === 0", () => {
    const accountTest = new Account();
    expect(accountTest.accountBalance).toBe(0);
  });
  it("instantiate new Account creates a blank array", () => {
    const accountTest = new Account();
    expect(accountTest.transactionLog).toStrictEqual([]);
    expect(accountTest.transactionLog.length).toBe(0);
  });
  it("instantiate new Account calls a console.log message", () => {
    const accountTest = new Account();
    expect(accountTest.instructions)
      .toBe(`Your new account options and the inputs needed are as follows:
        deposit('YYYY/MM/DD', number)
        withdraw('YYYY/MM/DD', number)
        printStatement()`);
  });
});
