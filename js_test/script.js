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
        console.log(string, num1,  action, num2)
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

    const cleanInput = () => {
        clicks = 0;
        expr = '';
    };

    const check = string => {
        // проверяем, что это не число со знаком, а просто знак без числа
        const strStart = /[-+](?![0-9]+)/,
            notNumber = /÷0/;
        if (notNumber.test(string)) {
            console.log(1);
            cleanInput();
            outputText.textContent = 'не число';
            return false;
        } else if (string.length === 0 ||
            string[0] === '%' ||
            string[0] === '÷' ||
            string[0] === '×' ||
            strStart.test(string) ||
            string[0] === ',' ) {
            cleanInput();
            outputText.textContent = 'Ошибка';
            return false;
        } else {
            return true;
        }
    };

    const parse = string => {
        // продумать обработку запятой и точки
        const percent = string.replace(/(-?[0-9]+)%/g, (match, number)=> number / 100);
        const priorities = percent.replace(/-?([0-9]*[\.,]?[0-9]+)([÷×])(-?[0-9]*[\.,]?[0-9]+)/g, count);
        // console.log('priorities: ', priorities);
        const usual = priorities.replace(/-?([0-9]*[\.,-]?[0-9]+)([+-])(-?[0-9]*[\.,]?[0-9]+)/g, count);
        // console.log('usual: ', usual);
        return usual;
    };

    const renderHistory = line => {
        const li = document.createElement('li');
        li.textContent = line;
        historyList.append(li);
    };

    const signReplacer = match => {
        const reg = /(-?[0-9]+)(-[0-9]+)$/;
        // проверяем, нужно ли написать явный +
        const minusCheck = reg.test(expr);
        if (parseFloat(match) > 0) {
            return `-${match}`;
        }
        if (parseFloat(match) < 0) {
            if (minusCheck) {
                return `+${match * -1}`;
            } else {
                return match * -1;
            } 
        }
    };

    const percentReplacer = match => {
        // return match / 100;
        console.log('match / 100: ', match / 100);
    };

    document.addEventListener('click', event => {
        const target = event.target;
        if (!target.classList.contains('btn')) {
            return;
        }
        console.log('expr: ', expr);
        clicks++;
        
        if (clicks === 1 ) {
            // если клик по цифре - убрать 0, если по оператору - оставить
            if (target.classList.contains('number')) {
                outputText.textContent = '';
            } else {
                expr = 0;
            }
        }   
        

        // при клике на равно
        if (target.classList.contains('equals')) {
            // если прошли проверку и нет ошибок
            if (check(expr)) {
                const result = parse(expr);
                outputText.textContent = result;
                const date = new Date();
                const currDate = date.toISOString().substring(0,10);
                const currTime = date.toLocaleTimeString();
                const historyLine = `${currDate} ${currTime} ${expr} = ${result}`;
                historyArr.push(historyLine);
                renderHistory(historyLine);
                localStorage.setItem('historyList', JSON.stringify(historyArr));
                expr = outputText.textContent;
            }
        } else if (target.classList.contains('ac')) {
            outputText.textContent = 0;
            clicks = 0;
            expr = '';
            historyArr = [];
            localStorage.removeItem('historyList');
            historyList.textContent = '';
        } else if (target.classList.contains('plus-minus')) {
            // делаем последнее число положительным или отрицаетльным
            // ошибка - может оставиться 0 или убратьмя минус и не добавиться + (-96)
            expr = expr.replace(/-?([0-9]+)$/, signReplacer);
            outputText.textContent = expr;
            console.log('expr: ', expr);
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