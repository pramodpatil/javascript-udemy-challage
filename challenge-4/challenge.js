var objMark = {
    name: 'Mark',
    height: 1.78,
    mass: 80,
    calculateBMI: function () {
        this.bmi = this.mass / (this.height * 2)
    }
}

var objJohn = {
    name: 'Mark',
    height: 1.78,
    mass: 90,
    calculateBMI: function () {
        this.bmi = this.mass / (this.height * 2)
    }
}

objMark.calculateBMI();
objJohn.calculateBMI();

console.log(objJohn.mass > objMark.mass)