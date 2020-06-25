(function () {
    var questionArr = [];
    var index = 0;

    function createRandomNumber() {
        return Math.floor(Math.random() * 4) + 1;
    }

    function DescribeQuestion(question, answersArr, answer) {
        this.question = question;
        this.answersArr = answersArr;
        this.answer = answer;
    }

    DescribeQuestion.prototype.loadQuestion = function () {
        console.log(this.question);
        for (let i = 0; i < this.answersArr.length; i++) {
            console.log(`${i + 1}: ${this.answersArr[i]}`);
        }
    }

    DescribeQuestion.prototype.getAnswer = function (ans, callback) {
        if (this.answer == ans) {            
            console.log('Your answer is correct ' + ' ad your score is ' + callback(true));
        } else {
            callback(false)
            console.log('Your answer is wrong. Try once again! '+ ' ad your score is ' + callback(false));
        }
        console.log('------------------------------');
    }

    var q1 = new DescribeQuestion('What is instructor name?', ['a', 'b', 'abc', 'd'], 3);
    var q2 = new DescribeQuestion('What is ES meaning', ['Ecama Script', 'b', 'abc', 'd'], 1);
    var q3 = new DescribeQuestion('What is the latest JS version?', ['1.1', '2.0', '6', '1.5'], 4);
    var q4 = new DescribeQuestion('Creation year of JavaScript?', ['1995', '1999', '1991', '2000'], 1);

    questionArr = [q1, q2, q3, q4];

    var score = (function () {
        var sc = 0;

        return function (flag) {
            if (flag) {
                sc++;
            }
            return sc;
        }

    })();

    function strtQuestion() {
        index = createRandomNumber();
        questionArr[index].loadQuestion();
        //debugger;
        var ans = prompt('Please answer by enterig only number');
        console.log(ans);
        if (ans != 'exit') {
            questionArr[index].getAnswer(ans, score);
            strtQuestion();
        } else {
            console.log('closing the questionarie.')
        }
    }

    strtQuestion();

})();



