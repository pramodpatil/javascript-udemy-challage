
var tipsArr = [];
var billsArr = [];

function calculateTip (bill) {
    var tip = 0;

    if(bill < 50) {
        tip = bill * 0.20;
    } else if(bill > 50 && bill < 200) {
        tip = bill * 0.15;
    } else {
        tip = bill * 0.10;
    }
    return tip
}

function calculateBill (bill) {   
    var tip = calculateTip(bill);
    tipsArr.push(tip);
    return bill + tip;
}


var finalBill = calculateBill(124);
billsArr.push(finalBill);

finalBill = calculateBill(48);
billsArr.push(finalBill);

finalBill = calculateBill(268);
billsArr.push(finalBill);

console.log(tipsArr);
console.log(billsArr);