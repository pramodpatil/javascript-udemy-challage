function Person (name, birthYear, city) {
    this.name = name;
    this.birthYear = birthYear;
    this.city = city;
}

Person.prototype.calculateAge = function {
    var date = new Date();
    return date.getFullYear() - this.birthYear;
}

var pramod = new Person('Pramod', 1983, 'Pune');