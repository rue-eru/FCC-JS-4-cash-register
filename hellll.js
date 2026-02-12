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

//variables
const purchaseBtn = document.getElementById("purchase-btn");
const cashInput = document.getElementById("cash").value;
const cash = parseFloat(cashInput);
const displayChangeDue = document.getElementById("change-due");
const totalPrice = document.getElementById("total-text");

//displays price in a #total-text
totalPrice.textContent += "Total: $" + price;

purchaseBtn.addEventListener("click", () => {
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    displayChangeDue.innerText = "No change due - customer paid with exact cash";
    return;
  }

  const getChange = (price, cash, cid) => {
    let changeRequired = cash - price;
    let remainingChange = changeRequired;
    const denominations = [
      ["PENNY", 0.01],
      ["NICKEL", 0.05],
      ["DIME", 0.1],
      ["QUARTER", 0.25],
      ["ONE", 1],
      ["FIVE", 5],
      ["TEN", 10],
      ["TWENTY", 20],
      ["ONE HUNDRED", 100],
    ];

    let changeArray = [];
    let totalCashInDrawer = cid.reduce((sum, [, amount]) => sum + amount, 0);
    totalCashInDrawer = Math.round(totalCashInDrawer * 100) / 100;

    if (totalCashInDrawer < changeRequired) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    for (let i = denominations.length - 1; i >= 0; i--) {
      const [unit, value] = denominations[i];
      let onHand = cid.find(([cidUnit]) => cidUnit === unit)[1];

      if (remainingChange >= value && onHand > 0) {
        let amountTaken = 0;
        while (remainingChange >= value && onHand > 0) {
          amountTaken += value;
          onHand -= value;
          remainingChange -= value;
          remainingChange = Math.round(remainingChange * 100) / 100;
        }
        changeArray.push([unit, amountTaken]);
      }
    }

    if (remainingChange > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (totalCashInDrawer === changeRequired) {
      const sortedCid = cid
        .filter(([_, amount]) => amount > 0)
        .sort((a, b) => denominations.findIndex(([unit]) => unit === b[0]) - denominations.findIndex(([unit]) => unit === a[0]));
      return { status: "CLOSED", change: sortedCid };
    }

    return { status: "OPEN", change: changeArray };
  };

  const { status, change } = getChange(price, cash, cid);

  if (status === "INSUFFICIENT_FUNDS") {
    displayChangeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if (status === "CLOSED") {
    const changeText = change
      .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
      .join(" ");
      displayChangeDue.innerText = `Status: CLOSED ${changeText}`;
  } else {
    const changeText = change
      .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
      .join(" ");
      displayChangeDue.innerText = `Status: OPEN ${changeText}`;
  }
});

/*
let price = 3.26;
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
const cashInput = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const displayCid = document.getElementById("cash-in-drawer");
const totalPrice = document.getElementById("total-text");

//displays price in a #total-text
totalPrice.textContent += "Total: $" + price;

//cid display starting position
let cidText = "";
window.onload = () => {
    cid.forEach((unit) => {
        cidText += `<div id="innerHtmlCidText">${unit[0]}: $${unit[1]}</div>`;
    });

    // Set the displayCid element's innerHTML to the cidText string
    displayCid.innerHTML = cidText;
};

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
    let cash = parseFloat(cashInput.value);
    let changeDue = parseFloat((cash - price).toFixed(2));

    const changeComputing = (cash, price, cid) => {

        if (changeDue < 0) {
            alert("Customer does not have enough money to purchase the item");
            changeDueShowing();
            return {status: "INSUFFICIENT_FUNDS", change: [], cidLeft: cid};
            } else if (changeDue === 0) {
                changeDueShowing();
                return {status: "No change due - customer paid with exact cash", change: [], cidLeft: cid};
            } else {
                const changeArr = [];
                let status = "OPEN";
                let totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));
                //array for change to give

            if (totalCid < changeDue) {
                changeDueShowing();
                status = "INSUFFICIENT_FUNDS";
                return {status: status, change: [], cidLeft: cid};
            }

            //reverse does what it says. it reverses array so we can start from the largest
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
                return {status: status, change: [], cidLeft: cid.reverse()};
            }

      if (totalCid === parseFloat((cash - price).toFixed(2))) {
                changeDueShowing();
                status = "CLOSED";
                return {status: status, change: changeArr.reverse(), cidLeft: cid.reverse()};
            }
            changeDueShowing();
            return {status: "OPEN", change: changeArr, cidLeft: cid.reverse()};
        }
    } // changeComputing END

    const resultMessage = changeComputing(price, cash, cidAssets);

    if (resultMessage.status === "INSUFFICIENT_FUNDS") {
        displayChangeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (resultMessage.status === "No change due - customer paid with exact cash") {
        displayChangeDue.innerText = resultMessage.status;
    } else {
        let changeMsg = `Status: ${resultMessage.status}`;
        resultMessage.change.forEach(unit => {
            changeMsg += ` ${unit[0]}: $${unit[1]}`;
        });
        displayChangeDue.innerText = changeMsg;

        resultMessage.cidLeft.forEach((unit) => {
                cidText = `<div id="innerHtmlCidText">${unit[0]}: $${unit[1]}</div>`;
        });
    }
}); //main function END
*/