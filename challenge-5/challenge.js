var objJohn = {
    bilsArr: [124, 48, 268, 180, 42],
    tipsArr: [],
    amountArr: [],
    calculateAmount: function() {
        let i, tip, tipAmount;

        for(i = 0; i < this.bilsArr.length; i++) {
            if(this.bilsArr[i] < 50) {
                tip = 20;
            } else if (this.bilsArr[i] > 50 && this.bilsArr[i] < 200) {
                tip = 15;
            } else {
                tip = 10;
            }
            tipAmount = this.bilsArr[i] * tip / 100
            this.tipsArr.push(tipAmount);
            this.amountArr.push(tipAmount + this.bilsArr[i]);
        }
    }
}


var objMark = {
    bilsArr: [77, 375, 110, 45],
    tipsArr: [],
    amountArr: [],
    calculateAmount: function() {
        let i, tip, tipAmount;

        for(i = 0; i < this.bilsArr.length; i++) {
            if(this.bilsArr[i] < 50) {
                tip = 20;
            } else if (this.bilsArr[i] > 50 && this.bilsArr[i] < 200) {
                tip = 15;
            } else {
                tip = 10;
            }
            tipAmount = this.bilsArr[i] * tip / 100
            this.tipsArr.push(tipAmount);
            this.amountArr.push(tipAmount + this.bilsArr[i]);
        }
    }
}

function calculateAverage (arr) {
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}