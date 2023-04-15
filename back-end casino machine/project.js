// 1. Desposit money 
// 2 . how many lines to bet on
// 3. Collect a bet amount
// 4. Spin
// 5. Check if won
// 6. Give money
// 7. Play again 

// creating functions for every task.

//. Step-1

const prompt = require('prompt-sync')();    // user input through the installed package prompt sync

// declaring and initializing some variables about the slot machine

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {                         // creating symbols in each line  (OBJECT)
    A : 2,
    B : 4,
    C : 6,
    D : 8
};

const SYMBOLS_VALUES = {                         // if I get $, it gets multiplied with 6 and vice versa
    A : 6,
    B : 5,
    C : 4,
    D : 3
};


const desposit_money = () => {                  // or    function desposit_amount () {}

    while(true) {                                                           // the task should be done many times hence while loop
        const deposit = prompt("Enter the amount to deposit: ");
        
        let numberDepsoitAmount = parseFloat(deposit);          // takes a string and converts into a floating point value

        if(isNaN(numberDepsoitAmount) || numberDepsoitAmount <= 0) {        // if the number is valid or the number is less than or equal to 0
            console.log (" INVALID!!!, Please enter the amount again");

        } else{
            return numberDepsoitAmount;
        }
    }
};




//. Step -2

let getLines = () => {
    while(true) {                                                           // the task should be done many times hence while loop
        const num_of_lines = prompt("Enter the number of lines you want to bet on ( 1 - 3 ): ");
        
        let total_lines = parseFloat(num_of_lines);          // takes a string and converts into a floating point value

        if(isNaN(total_lines) || total_lines <= 0 || total_lines > 3) {        // if the number is valid or the number of lines is less than or equal to 0 or lines are greater than 3
            console.log (" INVALID !!!, Please enter the number of lines again");

        } else{
            return total_lines;
        }
    }
}


//. Step -3

const CollectBet = (balance, lines) => {       // passing the balance as a parameter, we need to determine if the user has necessary amount to bet on
    while(true) {                                                           // the task should be done many times hence while loop
        const bet_money = prompt("Enter the bet amount you want to bet PER LINE: ");
        
        let total_bet = parseFloat(bet_money);          // takes a string and converts into a floating point value

        if(isNaN(total_bet) || total_bet <= 0 || total_bet > balance / lines) {        // if the number is valid or the bet is less than or equal to 0 or bet are greater than their balance divided by the number of lines, since the amount get multiplied by the number of lines
            console.log (" INVALID !!!, Please enter the bet amount again: ");

        } else{
            return total_bet;
        }
    }
};




//. Step-4

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {           // for every symbol and count , we inserting symbols
        for( let i = 0; i< count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i< COLUMNS; i++){
        reels.push([]);
        const reeling_symbols = [...symbols];   // copy the available symbols to another array for the reel
        for (let j = 0; j< ROWS; j++){
            const random_symbol_index = Math.floor(Math.random() * reeling_symbols.length);         // round down to the number that is nearest integer
            const select_symbol = reeling_symbols[random_symbol_index];
            reels[i].push(select_symbol);
            reeling_symbols.splice(random_symbol_index, 1);  // removing one symbol from the new array, so that we can generate new one and we don't select the same one again
        }
    }
    return reels;
};


const transpose_reels = (reels) =>{
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLUMNS; j++){
            rows[i].push(reels[j[i]])      // accessing all colums, we are getting element in the row that we are building for each column
        }
    }
    return rows;

}



const print_machine =  (rows) => {
    for(const row of rows) {                // iterating by item
        let row_string = ""
        for(const [i, symbol] of row.entries()){       // loop through the index and element in the array
            row_string += symbol            // concatenating
            if(i != row.length - 1){           // if the index is last then print |
                row_string += " | "
            }
        }
        console.log(row_string);

    }

}


//. Step-5

const return_winnings = (rows, total_bet, total_lines) => {
    let winnings = 0;
    for(let row = 0; row < total_lines; row++){
        const symbols = rows[row];
        let allsame = true;

        for(const symbol of symbols){           // loop through all symbols
            if(symbol != symbols[0]){           // if symbol is same as first symbol then all are same, if it is not same then break out of the loop
                allsame = false;
                break;
            }
        }

        if(allsame){
            winnings += total_bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}


//. Step -6 && //. Step-7

const game = () => {
    
    let balance = desposit_money();   // Calling the function for step-1
    
    while(true){
        console.log("You hava a balance of $ " + balance);
        const total_lines = getLines();         // Calling the function for step-2
        const bet_money = CollectBet(balance, total_lines);      // Calling the function for step-3
        balance -= bet_money * total_lines;
        const reels = spin();
        const rows = transpose_reels(reels)
        print_machine(rows)
        const winnings = return_winnings(rows, bet_money, total_lines)
        balance += winnings;
        console.log("You won, $" + winnings.toString());
        
        if(balance <= 0){
            console.log(" NO MONEY!!!!!!")
            break;
        }

        const play_again = prompt(" Do you want to play again  (y/n) ? :")
        if( play_again != "y") break;

    }
};

game();

