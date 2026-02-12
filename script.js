let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

//cid copy
//a slice() returns a shallow copy of a portion of an array into a new array object selected from start to end
let cidAssets = cid.map(arr => arr.slice());

// cash denominations in "Cash In Drawer"
const denominations = [
    ['PENNY', .01],
    ['NICKEL', .05],
    ['DIME', .1],
    ['QUARTER', .25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];

//html variables
const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

//displays price in a #total-text
totalPrice.textContent += "Total: $" + price;

//a window with remaining cid and status; 
//a starting property of display is none;
function changeDueShowing() {
    const displayChangeDueStyle = getComputedStyle(displayChangeDue).display;
    if (displayChangeDueStyle === "none") {
        displayChangeDue.style.display = 'block';
    } else {
        displayChangeDue.style.display = 'none';
    }
}

//makes eventlistener work if "enter" is pressed
cash.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        purchaseBtn.click();
    }
})

//a fuction that calculates the whole process
purchaseBtn.addEventListener('click', () => {

    //The parseFloat() method parses a value as a string and returns the first number. Notes: If the first character cannot be converted, NaN is returned. You can also use Number() in that case
    //The _toFixed()_ method converts a number to a string. The _toFixed()_ method rounds the string to a specified number of decimals. Hereis used to deal with cents.
    // The reduce() iterates and “reduces” an array's values into one value. 0 is an initial value
    let cashInput = parseFloat(cash.value);
    let changeDue = parseFloat((cashInput - price).toFixed(2));

    const changeComputing = (cash, price, cid) => {

        if (changeDue < 0) {
            alert("Customer does not have enough money to purchase the item");
            changeDueShowing();
            return {status: "INSUFFICIENT_FUNDS", change: [],     cidAssets: cid};
        } else if (changeDue === 0) {
            changeDueShowing();
            return {status: "No change due - customer paid with exact cash", change: [], cidAssets: cid};
        } else {
            //array for change to give
            const changeArr = [];
            let status = "OPEN";
            let totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

            if (totalCid < changeDue) {
                changeDueShowing();
                status = "INSUFFICIENT_FUNDS";
                return {status: status, change: [], cidAssets: cid};
            }

            //reverse does what it says. it reverses array so we can start from the larger
            cid = cid.reverse();

            for (let i = 0; i < denominations.length; i++) {
                let unitName = denominations[i][0];
                let unitValue = denominations[i][1];
                let unitAvailable = cid[i][1];
                let unitAmount = 0;

                 while (changeDue >= unitValue && unitAvailable > 0) {
                    changeDue -= unitValue;
                    changeDue = parseFloat(changeDue.toFixed(2));
                    unitAvailable -= unitValue;
                    unitAmount += unitValue;
                } //for loop END

            if (unitAmount > 0) {
                    changeArr.push([unitName, parseFloat(unitAmount.toFixed(2))]);
                    cid[i][1] = parseFloat(unitAvailable.toFixed(2));
                }

      }// if statement END 

      if (changeDue > 0) {
                changeDueShowing();
                status = "INSUFFICIENT_FUNDS";
                return {status: status, change: [], cidAssets: cid.reverse()};
            }

      if (totalCid === parseFloat((cash - price).toFixed(2))) {
                changeDueShowing();
                status = "CLOSED";
                return {status: status, change: changeArr.reverse(), cidAssets: cid.reverse()};
            }
            changeDueShowing();
            return {status: "OPEN", change: changeArr, cidAssets: cid.reverse()};
        }
    } // changeComputing END

    const resultMessage = changeComputing(cashInput, price, cidAssets);

    if (resultMessage.status === "INSUFFICIENT_FUNDS") {
        changeDueShowing();
        displayChangeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (resultMessage.status === "No change due - customer paid with exact cash") {
        changeDueShowing();
        displayChangeDue.innerText = resultMessage.status;
    } else {
        let changeMsg = `Status: ${resultMessage.status}`;
        resultMessage.change.forEach(unit => {
            changeMsg += ` ${unit[0]}: $${unit[1]}`;
        });
        displayChangeDue.innerText = changeMsg;

        const changeDisplay = (change) => {
            let displayChange = change.map(([unitName, unitAvailable]) => `${unitName}: $${unitAvailable.toFixed(2)}<br>`).reverse().join(" ");
            return displayChange;


            /*
        result.remainingCid.forEach(coin => {
            remainingCashMessage += ` ${coin[0]}: $${coin[1]}`;
        });
        document.getElementById('remaining-cash').innerText = remainingCashMessage;
        */

    }
        window.onload = changeDisplay;

    }
});
//main function END

/*
//last attempt

let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// cash denominations in "Cash In Drawer"
const denominations = [
    ['PENNY', .01],
    ['NICKEL', .05],
    ['DIME', .1],
    ['QUARTER', .25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];


//html variables
const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

//a window with remaining cid and status; starting property of display is none;
function changeDueShowing() {
    const displayChangeDueStyle = getComputedStyle(displayChangeDue).display;
    if (displayChangeDueStyle === "none") {
        displayChangeDue.style.display = 'block';
    } else {
        displayChangeDue.style.display = 'none';
    }
}

//displays price in a #total-text
totalPrice.textContent += price;

purchaseBtn.addEventListener('click', () => {
    
    //The parseFloat() method parses a value as a string and returns the first number. Notes: If the first character cannot be converted, NaN is returned.
    //The _toFixed()_ method converts a number to a string. The _toFixed()_ method rounds the string to a specified number of decimals. Hereis used to deal with cents.
    // The reduce() method got its name from the functionality it provides, which is to iterate and “reduce” an array's values into one value. 0 is an initial value
    let cashInput = parseFloat(cash.value);
    let changeDue = Number((cashInput - price).toFixed(2));


    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cashInput === price) {
        changeDueShowing();
        displayChangeDue.textContent = "No change due - customer paid with exact cash";
        return;
    } else if (cashInput === "") {
        return;
    } 

    const changeProcessing = changeResult (changeDue, cid);
        if (changeProcessing.status === "INSUFFICIENT_FUNDS" || changeProcessing.status === "CLOSED") {
            change.innerHTML = `<div id="innerHtmlCidText">Status: ${changeProcessing.status} ${changeDisplay(changeProcessing.change)}</div>`
            return;
    } else {
        let changeText = `<div id="innerHtmlCidText">Status: OPEN ${changeDisplay(changeProcessing.change)}<div>`;
        change.innerHTML = changeText.trim();
        return;
    }
} //getChange END
); //btn eventlistener END

    const changeResult = (changeDue, cid) => {
        let totalCid = Number(cid.reduce((total, [_,amount]) => total + amount, 0).toFixed(2));

        if (changeDue > totalCid) {
            changeDueShowing();
            return { status: "INSUFFICIENT_FUNDS", change: []};
        }

        let changeArr = [];
        let changeLeft = changeDue;

        for (let i = denominations.length - 1; i >= 0; i--) {
            //currency unit
            let curUnit = denominations[i][0];
            let unitValue = denominations[i][1];
            let unitCid = cid[i][1];

            if (unitValue <= changeLeft && unitCid > 0) {
                //actual change to give
                let unitChange = 0;

                while (changeLeft >= unitValue && unitCid > 0) {
                    changeLeft = (changeLeft - unitValue).toFixed(2);
                    unitCid -= unitValue;
                    unitChange += unitValue;
                }

                if (unitChange > 0) {
                    changeArr.push([curUnit, unitChange])
                }
            } //if END
        } //for loop END

        if (changeLeft > 0) {
            changeDueShowing();
            //{} here is an obj with status
            return { status: "INSUFFICIENT_FUNDS", change: []};
        } else if (changeDue === totalCid) {
            changeDueShowing();
            return { status: "CLOSED", change: cid};
        } else {
            changeDueShowing();
            return { status: "OPEN", change: changeArr};
        } // if statement END

    }; // change function END


    //map() always returns new array that's why we need .join(" ")
const changeDisplay = (change) => {
    let displayChange = change.map(([curUnit, amount]) => `${curUnit}: $${amount.toFixed(2)}<br>`).reverse().join(" ")
    return displayChange;
};

window.onload = () => {
    const initialCidText = cid.map(([curUnit, amount]) => `${curUnit}: $${amount.toFixed(2)}<br>`).reverse().join(" ");
    displayCid.innerHTML = `<div id="innerHtmlCidText">${initialCidText}</div>`;
};
///попытка номер хулиард я заебался
/*
// variables for price and cash in drawer
const price = 19.5;
const cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// cash denominations in "Cash In Drawer"
const denominations = [
                ["ONE HUNDRED", 100],
                ["TWENTY", 20],
                ["TEN", 10],
                ["FIVE", 5],
                ["ONE", 1],
                ["QUARTER", 0.25],
                ["DIME", 0.1],
                ["NICKEL", 0.05],
                ["PENNY", 0.01]
            ];
            
//variables by ID
const cashInput = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

//displays price in a #total-text
totalPrice.textContent += "Total: $" + price;

//a window with remaining cid and status; starting property of display is none;
function changeDueShowing() {
    const displayChangeDueStyle = getComputedStyle(displayChangeDue).display;
    if (displayChangeDueStyle === "none") {
        displayChangeDue.style.display = 'block';
    } else {
        displayChangeDue.style.display = 'none';
    }
}

// a purchase button event listener
purchaseBtn.addEventListener('click', () => {
    
    // cash.value
    //The parseFloat() method parses a value as a string and returns the first number. Notes: If the first character cannot be converted, NaN is returned.
    let cash = parseFloat(cashInput.value);
    
    // A cid copy
    //a slice() returns a shallow copy of a portion of an array into a new array object selected from start to end
    let currentCid = cid.map(arr => arr.slice());

  

    function actualChange (price, cash, currentCid) {
        //The _toFixed()_ method converts a number to a string. The _toFixed()_ method rounds the string to a specified number of decimals. Here is used to deal with cents.
        let changeDue = parseFloat((cash - price).toFixed(2));

        if (changeDue < 0) {
            alert("Customer does not have enough money to purchase the item");
            changeDueShowing();
            return {status: "INSUFFICIENT_FUNDS", change: [], remainingCid: cid};
        } else if (changeDue === 0) {
            changeDueShowing();
            return {status: "No change due - customer paid with exact cash", change: [], currentCid: currentCid};
        } else {

            const changeArray = []; //change to return
            let status = "OPEN"; // Default status

            // current cash in cid
            // The reduce() iterates and “reduces” an array's values into one value. 0 is an initial value
            let totalCid = parseFloat(currentCid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

            if (totalCid < changeDue) {
                changeDueShowing();
                status = "INSUFFICIENT_FUNDS";
                return {status: status, change: [], currentCid: currentCid};
            }

            //The reverse() method reverses the order of the elements in an array. The reverse() method overwrites the original array.
            currentCid = currentCid.reverse();
            for (let i = 0; i < denominations.length; i++) {
                let curUnit = denominations[i][0];
                let unitValue = denominations[i][1];
                let unitAvailable = currentCid[i][1];
                let unitAmount = 0;

                while (changeDue >= curUnit && unitAvailable > 0) {
                    changeDue -= unitValue;
                    changeDue = parseFloat(changeDue.toFixed(2));
                    unitAvailable -= unitValue;
                    unitAmount += unitValue;
                }

                if (unitAmount > 0) {
                    changeArray.push([curUnit, parseFloat(unitAmount.toFixed(2))]);
                    cid[i][1] = parseFloat(unitAvailable.toFixed(2)); //current cid
                }
            }

            if (changeDue > 0) {
                changeDueShowing();
                status = "INSUFFICIENT_FUNDS";
                return {status: status, change: [], currentCid: currentCid.reverse()};
            }


            if (totalCid === parseFloat((cash - price).toFixed(2))) {
                changeDueShowing();
                status = "CLOSED";
                return {status: status, change: changeArray.reverse(), currentCid: currentCid.reverse()};
            }
            changeDueShowing();
            return {status: "OPEN", change: changeArray, currentCid: currentCid.reverse()};
        }
    }

    // using a change fuction
    const changeResult = actualChange(price, cash, currentCid);

    if (changeResult.status === "INSUFFICIENT_FUNDS") {
        changeDueShowing();
        displayChangeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (changeResult.status === "No change due - customer paid with exact cash") {
        changeDueShowing();
        displayChangeDue.innerText = changeResult.status;
    } else {
        changeDueShowing();
        let changeMessage = `Status: ${changeResult.status}`;
        changeResult.change.forEach(coin => {
            changeMessage += ` ${coin[0]}: $${coin[1]}`;
        });
        displayChangeDue.innerText = changeMessage;

        const displayCashInDrawer = () => {
        displayCid.innerHTML = currentCid.map(coin => `<div id="innerHtmlCidText">${coin[0]}: $${coin[1]} <br></div>`).reverse().join("");
    };

        window.onload = displayCashInDrawer

        
        let remainingCashMessage = "Remaining Cash in Drawer: ";
        changeResult.remainingCid.forEach(coin => {
            remainingCashMessage += `${coin[0]}: $${coin[1]}`;
        });
       displayCid.innerText = remainingCashMessage;
       
    }

});

*/
///one more attmpt
/*
let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// cash denominations in "Cash In Drawer"
const denominations = [
    ['PENNY', .01],
    ['NICKEL', .05],
    ['DIME', .1],
    ['QUARTER', .25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];


//html variables
const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

//a window with remaining cid and status; starting property of display is none;
function changeDueShowing() {
    const displayChangeDueStyle = getComputedStyle(displayChangeDue).display;
    if (displayChangeDueStyle === "none") {
        displayChangeDue.style.display = 'block';
    } else {
        displayChangeDue.style.display = 'none';
    }
}

totalPrice.textContent += price;

purchaseBtn.addEventListener('click', () => {
    
    //The parseFloat() method parses a value as a string and returns the first number. Notes: If the first character cannot be converted, NaN is returned.
    //The _toFixed()_ method converts a number to a string. The _toFixed()_ method rounds the string to a specified number of decimals. Hereis used to deal with cents.
    // The reduce() method got its name from the functionality it provides, which is to iterate and “reduce” an array's values into one value. 0 is an initial value
    let cashInput = parseFloat(cash.value);
    let changeDue = Number((cashInput - price).toFixed(2));


    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cashInput === price) {
        changeDueShowing();
        displayChangeDue.textContent = "No change due - customer paid with exact cash";
        return;
    } else if (cashInput === "") {
        return;
    } 

    const changeResult = getChange(changeDue, cid);

    if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") {
        changeDueShowing();
        change.innerText = `Status: ${changeResult.status} ${changeDisplay(changeResult.change)}`
    } else {
        changeDueShowing();
        let changeText = `Status: OPEN ${changeDisplay(changeResult.change)}`;
        change.innerText = changeText.trim();
    }

});

    const getChange = (changeDue, cid) => {
        let totalCid = Number(cid.reduce((total, [_,amount]) => total + amount, 0).toFixed(2));

        if (changeDue > totalCid) {
        changeDueShowing();
        displayChangeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
        }

        let changeArr = [];
        let changeLeft = changeDue;

        for (let i = denominations.length - 1; i >= 0; i--) {
            //currency unit
            let curUnit = denominations[i][0];
            let unitValue = denominations[i][1];
            let unitCid = cid[i][1];

            if (unitValue <= changeLeft && unitCid > 0) {
                //actual change from the cid
                let unitChange = 0;

                while (changeLeft >= unitValue && unitCid > 0) {
                    changeLeft = (changeLeft - unitValue).toFixed(2);
                    unitCid -= unitValue;
                    unitChange += unitValue;
                }

                if (unitChange > 0) {
                    changeArr.push([unit, unitChange])
                }
            } 
        } //for loop END

        if (changeLeft > 0) {
            changeDueShowing();
            //{} here is an obj with status
            return { status: "INSUFFICIENT_FUNDS", change: []};
        } else if (changeDue === totalCid) {
            changeDueShowing();
            return { status: "CLOSED", change: cid};
        } else {
            changeDueShowing();
            return { status: "OPEN", change: changeArr};
        } // if statement END

    

    } // change function END

    //map() always returns new array that's why we need .join(" ")
    const displayCashInDrawer = () => {
        displayCid.innerHTML = cid.map(cash => `<div id="innerHtmlCidText">${cash[0]}: $${cash[1].toFixed(2)} <br></div>`).reverse().join("");
    };
    //window.onload is gonna show cid
    window.onload = displayCashInDrawer;    
    /*
    const displayCashInDrawer = () => {
        displayCid.innerHTML = changeArr.map((curUnit, amount) => `<div id="innerHtmlCidText">${curUnit}: $${amount.toFixed(2)} <br></div>`).reverse().join(" ");
    };
    
    //window.onload is gonna show cid
    window.onload = displayCashInDrawer
    */


/// attempt 

/*
let price = 19.5;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const denominations = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

function changeDueShowing(
) {
    const displayChangeDueStyle = getComputedStyle(displayChangeDue).display;
    if (displayChangeDueStyle === "none") {
        displayChangeDue.style.display = 'block';
    } else {
        displayChangeDue.style.display = 'none';
    }
}

totalPrice.textContent += price;

purchaseBtn.addEventListener('click', () => {
    let cashInput = parseFloat(cash.value);
    let changeDue = Number((cashInput - price).toFixed(2));

    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cashInput === price) {
        changeDueShowing();
        displayChangeDue.textContent = "No change due - customer paid with exact cash";
        return;
    } else if (cashInput === "") {
        return;
    }

    const changeProcessing = changeResult(changeDue, cid);
    if (changeProcessing.status === "INSUFFICIENT_FUNDS" || changeProcessing.status === "CLOSED") {
        displayCid.innerHTML = `<div id="innerHtmlCidText">Status: ${changeProcessing.status} ${changeDisplay(changeProcessing.change)}</div>`;
        return;
    } else {
        let changeText = `<div id="innerHtmlCidText">Status: OPEN ${changeDisplay(changeProcessing.change)}<div>`;
        displayCid.innerHTML = changeText.trim();
        return;
    }
});

const changeResult = (changeDue, cid) => {
    let totalCid = Number(cid.reduce((total, [_, amount]) => total + amount, 0).toFixed(2));

    if (changeDue > totalCid) {
        changeDueShowing();
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let changeArr = [];
    let changeLeft = changeDue;

    for (let i = denominations.length - 1; i >= 0; i--) {
        let curUnit = denominations[i][0];
        let unitValue = denominations[i][1];

    
let unitCid = cid[i][1];

if (unitValue <= changeLeft && unitCid > 0) {
    let unitChange = 0;

    while (changeLeft >= unitValue && unitCid > 0) {
        changeLeft = (changeLeft - unitValue).toFixed(2);
        unitCid -= unitValue;
        unitChange += unitValue;
    }

    if (unitChange > 0) {
        changeArr.push([curUnit, unitChange]);
    }
}
}

if (changeLeft > 0) {
changeDueShowing();
return { status: "INSUFFICIENT_FUNDS", change: [] };
} else if (changeDue === totalCid) {
changeDueShowing();
return { status: "CLOSED", change: cid };
} else {
changeDueShowing();
return { status: "OPEN", change: changeArr };
}
};

const changeDisplay = (change) => {
let displayChange = change.map(([curUnit, amount]) => `${curUnit}: $${amount.toFixed(2)}<br>`).reverse().join(" ");
return displayChange;
};

window.onload = () => {
const initialCidText = cid.map(([curUnit, amount]) => `${curUnit}: $${amount.toFixed(2)}<br>`).reverse().join(" ");
displayCid.innerHTML = `<div id="innerHtmlCidText">${initialCidText}</div>`;
};

/*
let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const denominations = [
    ['PENNY', .01],
    ['NICKEL', .05],
    ['DIME', .1],
    ['QUARTER', .25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

function changeDueShowing() {
    const displayChangeDueStyle = getComputedStyle(displayChangeDue).display;
    if (displayChangeDueStyle === "none") {
        displayChangeDue.style.display = 'block';
    } else {
        displayChangeDue.style.display = 'none';
    }
}

totalPrice.textContent += price;

purchaseBtn.addEventListener('click', () => {
    let cashInput = parseFloat(cash.value);
    let changeDue = Number((cashInput - price).toFixed(2));


    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cashInput === price) {
        changeDueShowing();
        displayChangeDue.textContent = "No change due - customer paid with exact cash";
        return;
    } else if (cashInput === "") {
        return;
    } 

    const changeProcessing = changeResult (changeDue, cid);
        if (changeProcessing.status === "INSUFFICIENT_FUNDS" || changeProcessing.status === "CLOSED") {
            change.inneeHTML = `<div id="innerHtmlCidText">Status: ${changeProcessing.status} ${changeDisplay(changeProcessing.change)}</div>`
            return;
    } else {
        let changeText = `<div id="innerHtmlCidText">Status: OPEN ${changeDisplay(changeProcessing.change)}<div>`;
        change.innerHTML = changeText.trim();
        return;
    }
});

    const changeResult = (changeDue, cid) => {
        let totalCid = Number(cid.reduce((total, [_,amount]) => total + amount, 0).toFixed(2));

        if (changeDue > totalCid) {
            changeDueShowing();
            return { status: "INSUFFICIENT_FUNDS", change: []};
        }

        let changeArr = [];
        let changeLeft = changeDue;

        for (let i = denominations.length - 1; i >= 0; i--) {
            let curUnit = denominations[i][0];
            let unitValue = denominations[i][1];
            let unitCid = cid[i][1];

            if (unitValue <= changeLeft && unitCid > 0) {
                let unitChange = 0;

                while (changeLeft >= unitValue && unitCid > 0) {
                    changeLeft = (changeLeft - unitValue).toFixed(2);
                    unitCid -= unitValue;
                    unitChange += unitValue;
                }

                if (unitChange > 0) {
                    changeArr.push([curUnit, unitChange])
                }
            } 
        }

        if (changeLeft > 0) {
            changeDueShowing();
            return { status: "INSUFFICIENT_FUNDS", change: []};
        } else if (changeDue === totalCid) {
            changeDueShowing();
            return { status: "CLOSED", change: cid};
        } else {
            changeDueShowing();
            return { status: "OPEN", change: changeArr};
        } 

    }; 
  const displayCashInDrawer = () => {
        displayCid.innerHTML = changeArr.map((curUnit, amount) => `<div id="innerHtmlCidText">${curUnit}: $${amount.toFixed(2)} <br></div>`).reverse().join(" ");
    };
    
  window.onload = displayCashInDrawer

/*
let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// cash denominations in "Cash In Drawer"
const denominations = [
    ['PENNY', .01],
    ['NICKEL', .05],
    ['DIME', .1],
    ['QUARTER', .25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];


//html variables
const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

function changeDueShowing() {
    const displayChangeDueStyle = getComputedStyle(displayChangeDue).display;
    if (displayChangeDueStyle === "none") {
        displayChangeDue.style.display = 'block';
    } else {
        displayChangeDue.style.display = 'none';
    }
}

totalPrice.textContent += price;

purchaseBtn.addEventListener('click', () => {
    
    //The parseFloat() method parses a value as a string and returns the first number. Notes: If the first character cannot be converted, NaN is returned.
    //The _toFixed()_ method converts a number to a string. The _toFixed()_ method rounds the string to a specified number of decimals. Hereis used to deal with cents.
    // The reduce() method got its name from the functionality it provides, which is to iterate and “reduce” an array's values into one value. 0 is an initial value
    let cashInput = parseFloat(cash.value);
    let changeDue = Number((cashInput - price).toFixed(2));


    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } 
    
    if (cashInput === price) {
        changeDueShowing();
        displayChangeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }

    const changeResult = getChange(changeDue, cid);

    if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") {
        change.innerText = `Status: ${changeResult.status} ${changeDisplay(changeResult.change)}`
    } else {
        let changeText = `Status: OPEN ${changeDisplay(changeResult.change)}`;
        change.innerText = changeText.trim();

    }

});

    const getChange = (changeDue, cid) => {
        let totalCid = Number(cid.reduce((total, [_,amount]) => total + amount, 0).toFixed(2));

        if (changeDue > totalCid) {
            changeDueShowing();
            return { status: "INSUFFICIENT_FUNDS", change: []};
        }

        let changeArr = [];
        let changeLeft = changeDue;

        for (let i = denominations.length - 1; i >= 0; i--) {
            //currency unit
            let curUnit = denominations[i][0];
            let unitValue = denominations[i][1];
            let unitCid = cid[i][1];

            if (unitValue <= changeLeft && unitCid > 0) {
                //actual change from the cid
                let unitChange = 0;

                while (changeLeft >= unitValue && unitCid > 0) {
                    changeLeft = (changeLeft - unitValue).toFixed(2);
                    unitCid -= unitValue;
                    unitChange += unitValue;
                }

                if (unitChange > 0) {
                    changeDueShowing();
                    changeArr.push([unit, unitChange])
                }
            } 
        } //for loop END

        if (changeLeft > 0) {
            changeDueShowing();
            //{} here is an obj with status
            return { status: "INSUFFICIENT_FUNDS", change: []};
        } else if (changeDue === totalCid) {
            changeDueShowing();
            return { status: "CLOSED", change: cid};
        } else {
            changeDueShowing();
            return { status: "OPEN", change: changeArr};
        } // if statement END

    

    } // change function END

    //map() always returns new array thats why we need .join(" ")
    const displayCashInDrawer = () => {
        displayCid.innerHTML = cid.map(cash => `<div id="innerHtmlCidText">${cash[0]}: $${cash[1].toFixed(2)} <br></div>`).reverse().join("");
    };
    //window.onload is gonna help showing the cid
    window.onload = displayCashInDrawer;    

    /*

        const changeDisplay = changeArr => changeArr.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ");
    let cidCopy = [...cid];

    //denomitaion loop
    for (let i = 0; i < denominations.length; i++) {
        let totalDenom = 0;

        // cidCopy[cidCopy.length - 1 - i][1] > 0: This condition checks if the value at the specific index in the cidCopy array is greater than 0. The index is calculated as cidCopy.length - 1 - i, meaning it starts from the end of the array and moves towards the beginning.
        // both of the parts in [] are indexes here
        while (change >= denominations[i] && cidCopy[cidCopy.length - 1 - i][1] > 0) {
            cidCopy[cidCopy.length - 1 - i][1] = Number((cidCopy[cidCopy.length - 1 - i][1] - denominations[i]).toFixed(2));
        }

        if (totalDenom > 0) {
            changeArr.push([denominationNames[i], totalDenom]);
        }
    }

    if (change > 0) {
        displayChangeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }


    //remaining cash in cid
    let cidLeft = cid.reduce((total, sum) => total + sum[1], 0);
    if (cidLeft === 0) {
        displayChangeDue.textContent = "Status: CLOSED " + changeArr.map(cash => `${cash[0]}: $${cash[1].toFixed(2)}`).join(" ");
        cid = cid.map(denom => [denom[0], 0]);
    } else {
        displayChangeDue.textContent = "Status: <b>OPEN</b> <br><br>" + changeArr.map(cash => `<b>${cash[0]}</b>:$${cash[1].toFixed(2)} <br>`).join(" ");
        cid = cidCopy;
    }

    //displays cash in the drawer at the moment
    displayCurrentCid();
}

const displayCashInDrawer = () => {
    displayCid.innerHTML = cid.map(cash => `<div id="innerHtmlCidText">${cash[0]}: $${cash[1].toFixed(2)} <br></div>`).reverse().join("");
};



/*

const cashInput = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const total = document.getElementById("total-text");

total.innerHTML += `${price}<p>;

purchaseBtn.addEventListener("click", checkRegister);
inputNumber.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        purchaseBtn.click()
    }
})

const cidCurrent = () => {

    let result = "";
        for (const [coins, amount] of cid) {
            while (cashInput.value >= arabic) {
                result += roman;
                inputNumber.value -= arabic;
            }
        }
        outputResult.textContent = result;
      }

changeDrawer.innerHTML = `
    <p>Pennies: $${result}</p>
    <p>Nickels: $${}</p>
    <p>Dimes: $${}</p>
    <p>Quarters: $${}</p>
    <p>Ones: $${}</p>
    <p>Fives: $${}</p>
    <p>Tens: $${}</p>
    <p>Twenties: $${}</p>
    <p>Hundreds: $${}</p>
    `;

}

const checkRegister = () => {
    let change;

  if (cashInput < price) {
    alert("Customer does not have enough money to purchase the item");
} else if (cashInput === price) {
    changeDrawer.textContent = "No change due - customer paid with exact cash";
} else if (cashInput > price && changeDrawer < change) {
    changeDrawer.textContent = "Status: INSUFFICIENT_FUNDS";
  return
}

};

        if (changeLeft > 0) {
            changeDueShowing();
            displayChangeDue.textContent = "Status: INSUFFICIENT_FUNDS";
            return;
        } else if (changeDue === totalCid) {
            changeDueShowing();
            displayChangeDue.textContent = "Status: CLOSED";
            return;
        } else {
            changeDueShowing();
            displayChangeDue.textContent = "Status:     OPEN";
            return;
        }


            document.getElementById("change").innerHTML = `<b>Change: </b> ${change}`;
*/