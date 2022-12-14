# Bank account REPL app 

## Overview:
    This is a simple nodeJS REPL application, designed to reflect basic operations of a bank account; opening, depositing, withdrawing, and printing statements.

## Installation:
    These instructions are for MacOS. To run on linux or windows please lookup alternative commands to install and initiate node package manager.
    
    1. Clone this repo and navigate to the directory where it's stored and into 'bank-test'
    2. Check you have node.js installed using 'node -v' if this returns a version number you are good to go.
    3. If no version number returned, either download package from nodejs.org or run 'brew install node' if you have homebrew installed.
    4. Once you have node, run 'npm install'

## Running the app:
     - In your terminal, assuming the above installation and directory navigation: 
     - Type 'node' and press enter. This will enter you into the node REPL.
     - Type '.load app.js' and press enter. This will load the bank app into the REPL.
     - Type 'newAccount = new Account' and press enter, which will create a new account called newAccount and allow you to use the app. The instructions are relevant to any account name (the 'newAccount' as above is flexible), so to follow them please prefix any function name with 'newAccount.' (or whatever name you chose).
     - If at any time you wish to see the instructions again, type 'newAccount.instructions' Remember to prefix any functions you run with 'newAccount.' 
     - To close the app and exit the REPL, type '.exit'

## Running the tests:
    In your terminal in the bank-test directory, type 'jest --coverage' You should expect 21 passing tests and 100% coverage


## Notes
    - Numerical input and validation: This app requires that input amounts for deposit and withdraw are valid numbers, strings containing numbers (eg "500") are not acceptable. App will round to 2 decimal places when logging all transactions and updating balances. 
    - Date handling: It is not defined but my assumption from the 'Acceptance criteria' given is that date of transaction should be able to be input manually with the method calls, rather than purely timestamped on execution. The functions deposit and withdraw can be called with a date, or in the absense of a date will default to taking a current timestamp.
    - Negative numbers: Whilst out of keeping with how real-world bank accounts work, this app allows negative balances on the account and repeated/unlimited withdrawals, as managing such situations is not in the requirements at present. 
    - Usage instructions: requirement is for using with a REPL, and therefore run by someone with basic programming knowledge, and therefore I have deemed it unneccesary to present the app instructions repeatedly on the console, preferring just once upon initialization. However, I have left the code so that repeats can be implemented simply, by adding 'console.log(this.instructions)' where desired in the program.
    - Trailing newline characters in string outputs in the REPL ('\n') . This is an annoying feature of using javascript in node REPL, and is how it will come out without writing more code. As above, assumed user is a programmer and therefore familiar with ignoring such characters.
    - *Improvements:* This app would be improved with a command line interface rather than being run in the node REPL, but was not in scope here. Using the *Ruby REPL* would have also presented the app in a cleaner way with less typing required to execute features.


## BLUEPRINT OF THE APP:

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
        checks amount is valid number
        adds amount to accountBalance
        calls logDeposit ("deposit" amount, date)
        return (`deposit of ${amount }successful, new balace is ${this.accountBalance}`)

    method: withdraw(amount, date)
        checks amount is valid number
        removes amount from accountBalance 
        calls logWithdraw ("withdraw", amount, date)
        return (`withdrawal of ${amount }successful, new balace is ${this.accountBalance}`)
    
    method: createLogRecord(type, date, amount)
        creates a strong with date, amount deposited or withdrawn, and accountBalance and pushes into log array

    method: printStatement
       print header, and then each item of log array in reverse date order on a newline

    method: dateCheck (date)
        takes date and returns today's date if date incorrect, or absent


## TESTS:

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
        15 - deposit 100, 2022/01/01, call printStatement > expect line 1 === "date || debit || credit || balance"
        16 - deposit 100, 2022/01/01, call printStatement > expect line 2 === "2022/01/01 || 100.00 ||  || 100.00"
        17 - withdraw 400.50, 2022/01/04, call printStatement > expect line 2 === "2022/01/04 || || 400.50 || -400.50"
        18 - withdraw 400, 2022/01/05, deposit 700.25, 2022/01/06, call printStatement > expect === "date || debit || credit || balance\n2022/01/05 || || 400.00 || -400.00\n2022/01/06 || 700.25 ||  || 300.25

    Test Block 5: Edge cases and user testing (input validation)
    --before each instantiate new Account--
        19 - deposit on 2022/02/02 then withdraw on 2022/01/01 > expect transactionLog[0] to contain today's date
        20 - deposit(400, "2022/02/02") then deposit(300, "wrongString") > expect transactionLog[0] to contain today's date
        21 - call withdraw and deposit with non numerical first arguments > expect neither to show up in transactionLog












