BudgetController = (function () {

    var Expense = function (id, desc, val) {
        this.id = id;
        this.desc = desc;
        this.val = val;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function (totalExp) {
        if(totalExp > 0) {
            this.percentage = Math.round((this.val / totalExp) * 100);
        } else {
            return -1;
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    var Income = function (id, desc, val) {
        this.id = id;
        this.desc = desc;
        this.val = val;
    }

    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }

    function addItem(type, desc, val) {
        var id, item;

        if (data.items[type].length > 0) {
            id = data.items[type][data.items[type].length - 1].id + 1;
        } else {
            id = 0;
        }

        if (type === 'exp') {
            item = new Expense(id, desc, val);
        } else {
            item = new Income(id, desc, val);
        }

        data.items[type].push(item);

        return item;
    }

    function calculateBudget(type) {
        var sum = 0;

        data.items[type].forEach(cur => {
            sum += cur.val;
        });

        data.totals[type] = sum;
    }

    function updateBudget() {
        var income, expense
        calculateBudget('inc');
        calculateBudget('exp');
        data.budget = data.totals.inc - data.totals.exp;
        if (data.totals['inc'] > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        }
    }

    function calculatePercentage () {
        data.items.exp.forEach(function (curr) {
            curr.calculatePercentage(data.totals.inc);
        })
    }

    function getPercentage() {
        return data.items.exp.map(curr => curr.getPercentage());
    }

    function getUpdatedBudget() {
        return {
            totalIncome: data.totals['inc'],
            totalExpense: data.totals['exp'],
            budget: data.budget,
            percentage: data.percentage
        }
    }

    function deleteItemFromBdgt(type, id) {
        var ids, index;
        
        ids = data.items[type].map( current => {
            return current.id;
        });

        index = ids.indexOf(id);

        if(index !== -1) {
            data.items[type].splice(index, 1);
        }
    }

    return {
        addItem: addItem,
        testing: function () {
            return data;
        },
        updateBudget: updateBudget,
        getUpdatedBudget: getUpdatedBudget,
        deleteItemFromBdgt: deleteItemFromBdgt,
        calculatePercentage: calculatePercentage,
        getPercentage: getPercentage
    }


})();

UIController = (function () {

    var DOMStrings = {
        type: '.add__type',
        description: '.add__description',
        addValue: '.add__value',
        addType: '.add__btn',
        incomeContrainer: '.income__list',
        expneseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container',
        percentageLabel: '.item__percentage'
    }

    var getInput = function () {
        return {
            type: document.querySelector(DOMStrings.type).value,
            description: document.querySelector(DOMStrings.description).value,
            value: parseFloat(document.querySelector(DOMStrings.addValue).value)
        }
    }

    var clearFields = function () {
        var fields, fieldsArray;
        fields = document.querySelectorAll(DOMStrings.description + ', ' + DOMStrings.addValue);
        fieldsArray = Array.prototype.slice.call(fields);
        fieldsArray.forEach(element => {
            element.value = '';
        });

        fieldsArray[0].focus();
    }

    var addListItems = function (obj, type) {
        var html, element;

        if (type === 'exp') {
            element = DOMStrings.expneseContainer;
            html = `<div class="item clearfix" id="exp-${obj.id}">
            <div class="item__description">${obj.desc}</div>
            <div class="right clearfix">
                <div class="item__value">- ${obj.val}</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
                </div>
            </div>`
        } else {
            element = DOMStrings.incomeContrainer;
            html = `<div class="item clearfix" id="inc-${obj.id}">
            <div class="item__description">${obj.desc}</div>
            <div class="right clearfix">
                <div class="item__value">+ ${obj.val}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
        }

        document.querySelector(element).insertAdjacentHTML('beforeend', html);
    }

    function displayBudget(budgetObj) {
        var type;
        type = budgetObj.budget > 0 ? 'inc' : 'exp';

        document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(budgetObj.budget, type);
        document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(budgetObj.totalIncome, 'inc');
        document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(budgetObj.totalExpense, 'exp');

        if (budgetObj.percentage > 0) {
            document.querySelector(DOMStrings.percentage).textContent = `${budgetObj.percentage} %`;
        } else {
            document.querySelector(DOMStrings.percentage).textContent = '--';
        }
    }

    function displayPercentages (arr) {
        var listItems = document.querySelectorAll(DOMStrings.percentageLabel);

        var nodeListForeEach = function (list, callback) {
            for(var i = 0; i < list.length; i++) {
                callback(list[i], i);
            }
        }

        nodeListForeEach(listItems, function(item, index) {
            if(arr[index] > 0) {
                item.textContent = arr[index] + ' %';
            } else {
                item.textContent = '--';
            }
        })
    }

    function formatNumber(num, type) {
        var numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.')
        int = numSplit[0];
        dec = numSplit[1];

        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
        }

        
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

        //return num;
     }

    function removeItem(elemId) {
        var elem = document.getElementById(elemId);
        elem.parentNode.removeChild(elem);
    }

    return {
        getInput: getInput,
        getDomStrings: function () {
            return DOMStrings;
        },
        addListItems: addListItems,
        clearFields: clearFields,
        displayBudget: displayBudget,
        removeItem: removeItem,
        displayPercentages: displayPercentages
    }
})();

Controller = (function (BdgCtrl, UICtrl) {

    var DOMInitializer = function () {
        var dom = UICtrl.getDomStrings();

        document.querySelector(dom.addType).addEventListener('click', getInputValues);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                getInputValues();
            }
        });

        document.querySelector(dom.container).addEventListener('click', ctrlDeleteItems);
    }

    function ctrlDeleteItems (event) {
        var itemId, splitItem, type, id;
        itemId = event.target.closest('.item').id;
        splitItem = itemId.split('-');
        type = splitItem[0];
        id = parseInt(splitItem[1]);
        console.log(type, id);

        BdgCtrl.deleteItemFromBdgt(type, id);

        updateBudgetCtrl();

        updatePercentages();

        UICtrl.removeItem(itemId);

    }

    var updateBudgetCtrl = function () {
        var budgetData;

        BdgCtrl.updateBudget();
        budgetData = BdgCtrl.getUpdatedBudget();

        UICtrl.displayBudget(budgetData);
    }

    var updatePercentages = function () {
        var percentageArr;
        //1. update budet percentage 
        BdgCtrl.calculatePercentage();

        percentageArr = BdgCtrl.getPercentage();

        //update UI controller 
        UICtrl.displayPercentages(percentageArr);
    }

    var getInputValues = function () {
        var input, item;

        input = UICtrl.getInput();
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            item = BdgCtrl.addItem(input.type, input.description, input.value);

            //insert into html
            UICtrl.addListItems(item, input.type);

            //clear fields 
            UICtrl.clearFields();

            // update budget controller 
            updateBudgetCtrl();

            updatePercentages();
        }
    }

    return {
        init: function () {
            DOMInitializer();
            UICtrl.displayBudget({
                budget: 0,
                percentage: -1,
                totalIncome: 0,
                totalExpense: 0
            })
        }
    }

})(BudgetController, UIController);

Controller.init();