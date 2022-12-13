# README SECTIONS: 

## Overview:
    TODO// Explanation of what program does

## Installation:
    TODO// Installation instructions

## Running the app:
    TODO// App running instructions

## Running the tests:
    TODO// Test run instructions

## Notes
    --Negative numbers: Whilst out of keeping with how real-world bank accounts work, this app allows negative balances on the account and repeated/unlimited withdrawals, as a requirement to manage such situations is not in the requirements at present. 
    --Instructions: requirement is for using with a REPL, and therefore run by someone with basic programming knowledge, and therefore I have deemed it unneccesary to present the app instructions repeatedly on the console, preferring just once upon initialization. However, I have left the code so that repeats can be implemented simply, by adding 'console.log(this.instructions)' where desired in the program.
    --Date handling: It is not defined but my assumption from the 'Acceptance criteria' given is that date of transaction should be input manually with the method calls rather than timestamped on execution (otherwise the app would need to be kept open for 4 days to test and achieve the desired output). A fututre feature that could be implemented is for the program to default to getting the 'now' timestamp for the debit/withdraw when methods are called, unless user inputs a correctly formatted date as an argument when calling the method which will over-ride the default.


# BLUEPRINT OF THE APP:

Class 'Account' (this will be the only class)
    
    method: constructor 
        this.accountBalance = 0
        this.transactionsLog = []
        this.instructions = 
        "Your new account options and the inputs needed are as follows:"
        "deposit('YYYY/MM/DD', number)
        "withdraw('YYYY/MM/DD', number)"
        "printStatement()"
        console.log(this.instructions)

    method: deposit(amount, date)
        if input wrong type then return && (console.log error message explaining required format)
        else adds amount to accountBalance
        calls logDeposit ("deposit" amount, date)
        return (`deposit of ${amount }successful, new balace is ${this.accountBalance}`)

    method: withdraw(amount, date)
        if input wrong type then return && (console.log error message explaining required format)
        removes amount from accountBalance 
        calls logWithdraw ("withdraw", amount, date)
        return (`withdrawal of ${amount }successful, new balace is ${this.accountBalance}`)
    
    method: createLogRecord(type, date, amount)
        creates a JS object with date, amount deposited, and accountBalance and pushes into log array

    method: printStatement
        if transactionsLog is empty, console.log(no activity to show yet on this account)
        else print header, and then each item of log array in reverse date order on a newline, stringified


# TESTS:

    Test Block 1: constructor
        1 - instantiate new Account > expect this.accountBalance === 0 
        2 - instantiate new Account > expect this.transactionLog === [] && this.transactionLog.length === 0
        3 - instantiate new Account > expect instructions var (that is console.logged) === (...long string value here...)

    Test Block 2: deposit and withdraw
    --before each instantiate new Account--
        4 - deposit 100 > expect this.accountBalance === 100
        5 - deposit 100 and then 600.20 > expect this.accountBalance === 700.20
        6 - withdraw 100 > expect this.accountBalance === -100
        7 - withdraw 250 and then 110.50 > expect this.accountBalance === -360.50
        8 - deposit 2000 and then withdraw 1200 > expect this.accountBalance === 800

    Test Block 3: log records
    --before each instantiate new Account--
        9 - deposit 100, 2022/01/01 > expect this.transactionLog.length === 1
        10 - deposit 100, 2022/01/01 > expect this.transactionLog === [{date: '2022/01/01', deposit: 100, balance: 100 }]
        11 - deposit 100, 2022/01/01 and deposit 200, 2022/01/02 > expect this.transactionLog === [{date: '2022/01/01', deposit: 100, balance: 100 },{date: '2022/01/02', deposit: 100, balance: 300 }]
        12 - withdraw 1300, 2022/01/03 > expect this.transactionLog === [{date: '2022/01/03', withdraw: 1300, balance: -1300 }]
        13 - withdraw 1300, 2022/01/03, and withdraw 25, 2022/01/04 > expect this.transactionLog === [{date: '2022/01/03', withdraw: 1300, balance: -1300 }, {date: '2022/01/04', withdraw: 1300, balance: -1325 }]
        14 - deposit 2000, 2022/01/05, and deposit 1000, 2022/01/06 and withdraw 3500.75, 2022/01/07 > expect this.transactionLog === [{date: '2022/01/05', deposit: 2000, balance: 2000 }, {date: '2022/01/06', deposit: 1000, balance: 3000}, {date: '2022/01/07', withdraw: 3500, balance: -500.75}]


    Test Block 4: print statements
    --before each instantiate new Account--
        15 - call printStatement > expect Console.log toHaveBeenCalledOnceWith (...string value here...)
        16 - deposit 100, 2022/01/01, call printStatement > expect line 1 === "date || debit || credit || balance"
        17 - deposit 100, 2022/01/01, call printStatement > expect line 2 === "2022/01/01 || 100.00 ||  || 100.00"
        18 - withdraw 400.50, 2022/01/04, call printStatement > expect line 2 === "2022/01/04 || || 400.50 || -400.50"
        19 - withdraw 400, 2022/01/05, deposit 700.25, 2022/01/06, call printStatement > expect === "date || debit || credit || balance\n2022/01/05 || || 400.00 || -400.00\n2022/01/06 || 700.25 ||  || 300.25











