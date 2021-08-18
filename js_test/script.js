'use strict';
const workCalculator = () => {
    const calcDiv = document.querySelector('.calc'),
        outputText = document.querySelector('.output-text'),
        btns = document.querySelectorAll('.btn'),
        equalsBtn = document.querySelector('.equals'),
        historyList = document.querySelector('.history-list');
    // console.log(calcDiv, outputText, btns, equalsBtn, historyList);
    // const showResult = () => {
    //     outputText.textContent = 
    // };
    let clicks = 0;
    let historyArr = [];
    const notNumbers = ['highlighted', 'ac', 'plus-minus', 'percent', 'divide'];
    let number;
    let expr = '';
    const count = (string, num1, action, num2) => {
        // console.log(string, num1,  action, num2)
        switch (action) {
            case '÷' :
                return num1 / num2;
            case '×' :
                return num1 * num2;
            case '+' :
                return parseFloat(num1) + parseFloat(num2);
            case '-' :
                return parseFloat(num1) - parseFloat(num2);
        }
        // return 
    };

    const check = string => {
        return string.length === 0 ||
            string[0] === '%' ||
            string[0] === '÷' ||
            string[0] === '×' ||
            string[0] === '-' ||
            string[0] === '+' ||
            string[0] === ',' ;
    };

    const parse = string => {
        const priorities = string.replace(/([0-9]+)([÷×])([0-9]+)/g, count);
        const usual = priorities.replace(/([0-9]+)([+-])([0-9]+)/g, count)
        return usual;
    };

    const renderHistory = line => {
        const li = document.createElement('li');
        li.textContent = line;
        historyList.append(li);
    };

    document.addEventListener('click', event => {
        const target = event.target;
        if (!target.classList.contains('btn')) {
            return;
        }

        clicks++;
        if (clicks === 1) {
            outputText.textContent = '';
        }   
        
        // при клике на равно
        if (target.classList.contains('equals')) {
            if (check(expr)) {
                outputText.textContent = 'Ошибка';
                // outputText.classList.add('error');
                clicks = 0;
                expr = '';
            } else {       
                const result = parse(expr);
                outputText.textContent = result;
                const date = new Date();
                const currDate = date.toISOString().substring(0,10);
                const currTime = date.toLocaleTimeString();
                const historyLine = `${currDate} ${currTime} ${expr} = ${result}`;
                historyArr.push(historyLine);
                renderHistory(historyLine);
                localStorage.setItem('historyList', JSON.stringify(historyArr));
                expr = '';
                clicks = 0;
                console.log('historyArr', historyArr);
            }
        } else {
            expr += target.textContent;
            outputText.innerHTML += target.textContent;
        }
    });

    const lcArr = JSON.parse(localStorage.getItem('historyList'));
    if (lcArr && lcArr.length > historyArr.length) {
        historyArr = lcArr;
        lcArr.forEach(item => {
            renderHistory(item);
        })
    }
    
};
workCalculator();