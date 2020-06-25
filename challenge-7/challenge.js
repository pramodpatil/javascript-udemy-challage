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

    function createQuestions() {

        question1 = new DescribeQuestion('What is instructor name?', ['a', 'b', 'abc', 'd'], 3);
        question2 = new DescribeQuestion('What is ES meaning', ['Ecama Script', 'b', 'abc', 'd'], 1);
        question3 = new DescribeQuestion('What is the latest JS version?', ['1.1', '2.0', '6', '1.5'], 4);
        question4 = new DescribeQuestion('Creation year of JavaScript?', ['1995', '1999', '1991', '2000'], 1);

        questionArr = [question1, question2, question3, question4];
    }

    

    function loadQuestion(index) {
        //var index = createRandomNumber();
        console.log(questionArr[index].question + '\n' + 'Answers /\n' +
            '1 ' + questionArr[index].answersArr[0] + '\n' +
            '2 ' + questionArr[index].answersArr[1] + '\n' +
            '3 ' + questionArr[index].answersArr[2] + '\n' +
            '4 ' + questionArr[index].answersArr[3] + '\n');
    }

    function askQuestionToUser() {
        var answerByUser = prompt('Please answer by enterig only number');


        if (answerByUser == questionArr[index].answer) {
            console.log('Your answer is correct');
        } else {
            console.log('Your answer is not correct');
        }
    }

    createQuestions();
    index = createRandomNumber();
    loadQuestion(index);

    askQuestionToUser();
    
})();



