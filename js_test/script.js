'use strict';
const workCalculator = () => {
    const calcElem = document.querySelector('.calc'),
        outputText = document.querySelector('.output-text'),
        historyList = document.querySelector('.history-list'),
        historyElem = document.querySelector('.history');

    let clicks = 0,
        historyArr = [],
        expr = '';

    const count = (string, num1, action, num2) => {
        // console.log(string, num1,  action, num2);
        const percentTest = /%/g;
        // вычисляем процент от предыдущего числа
        if (percentTest.test(string)) {
            num2 = num1 * num2 / 100;
        }
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
    },
    cleanInput = () => {
        clicks = 0;
        expr = '';
    },
    check = string => {
        // проверяем, что это не число со знаком, а просто знак без числа
        const strStart = /[-+](?![0-9]+)/,
            notNumber = /÷0/,
            percentPriority = /([0-9]+%)[÷×]([0-9]+%)/,
            percentStart = /^([0-9]+%)/,
            onlyPercent = /^([0-9]+%)[-+]([0-9]+%)$/;
        if (notNumber.test(string)) {
            cleanInput();
            outputText.textContent = 'не число';
            return false;
        } else if (string.length === 0 ||
            string[0] === '%' ||
            string[0] === '÷' ||
            string[0] === '×' ||
            string[0] === ',' ||
            strStart.test(string) ||
            percentPriority.test(string) ||
            percentStart.test(string) ||
            onlyPercent.test(string)) {
            cleanInput();
            outputText.textContent = 'Ошибка';
            return false;
        } else {
            return true;
        }
    },
    parse = string => {
        const comma = string.replace(/,/g, '.');
        const percent = comma.replace(/([0-9]+)([÷×+-])([0-9]+)%/g, count);
        const priorities = percent.replace(/-?([0-9]*[\.,]?[0-9]+)([÷×])(-?[0-9]*[\.,]?[0-9]+)/g, count);
        const usual = priorities.replace(/-?([0-9]*[\.,-]?[0-9]+)([+-])(-?[0-9]*[\.,]?[0-9]+)/g, count);
        return usual.replace(/\./g, ',');
    },
    renderHistory = line => {
        const li = document.createElement('li');
        li.textContent = line;
        historyList.append(li);
    },
    signReplacer = match => {
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
    },
    addScroll = (elem, direction, size) => {
        let condition;
        if (direction === 'x') {
            condition = elem.clientWidth > size;
        } else {
            condition = elem.clientHeight > size;
        }

        if (condition) {
            elem.classList.add(`${direction}-scroll`);
        } else {
            elem.classList.remove(`${direction}-scroll`);
        }
    },
    prepareHistory = result => {
        const date = new Date();
        const currDate = date.toISOString().substring(0,10);
        const currTime = date.toLocaleTimeString();
        const historyLine = `${currDate} ${currTime} ${expr} = ${result}`;
        return historyLine;
    },
    getSavedHistory = (savedArr, tempArr) => {
        if (savedArr && savedArr.length > tempArr.length) {
            tempArr = savedArr;
            savedArr.forEach(item => {
                renderHistory(item);
            });
            return tempArr;
        }
    };

    document.addEventListener('click', event => {
        const target = event.target;
        if (!target.classList.contains('btn')) {
            return;
        }

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
                
                const historyLine = prepareHistory(result);
                historyArr.push(historyLine);
                renderHistory(historyLine);
                localStorage.setItem('historyList', JSON.stringify(historyArr));
                expr = outputText.textContent;
                cleanInput();
            }
        } else if (target.classList.contains('ac')) {
            outputText.textContent = 0;
            cleanInput();
            historyArr = [];
            localStorage.removeItem('historyList');
            historyList.textContent = '';
        } else if (target.classList.contains('plus-minus')) {
            // делаем последнее число положительным или отрицаетльным
            expr = expr.replace(/-?([0-9]+)$/, signReplacer);
            outputText.textContent = expr;
        }  else {
            expr += target.textContent;            
            outputText.innerHTML += target.textContent;
        }
    
        // 270 и 430 при полном экране
        addScroll(outputText, 'x', calcElem.clientWidth - calcElem.clientWidth * 0.1);
        addScroll(historyElem, 'y', calcElem.clientHeight);
    });


    historyArr = getSavedHistory(JSON.parse(localStorage.getItem('historyList')), historyArr);

    addScroll(outputText, 'x', calcElem.clientWidth - calcElem.clientWidth * 0.1);
    addScroll(historyElem, 'y', calcElem.clientHeight);
};
workCalculator();