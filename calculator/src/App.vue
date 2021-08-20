<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <div class='calc-wrapper'>
        <div class='calc'>
            <div class='output'>
                <div class='circles'>
                    <div class='dot red'></div>
                    <div class='dot yellow'></div>
                    <div class='dot green'></div>
                </div>
                  <input 
                    type='text' 
                    placeholder='0' 
                    :class="['output-text', {'x-scroll': xScroll}]" 
                    v-model='expr'
                  >
            </div>
            <div 
              v-for='number in numbers' :key='number.value'
              :class="[number.class, 'btn', 'number', 'centered']"
              @click='typeExpr(number.value)'
            >
              {{number.value}}
            </div>
            <div 
              v-for='op in operations' :key='op.class'
              :class="[op.class, 'btn', 'highlighted', 'centered']"
              @click='typeExpr(op.value)'
            >
              {{op.value}}
            </div>
            <div 
              v-for='item in various' :key='item.class'
              :class="[item.class, 'btn','centered']"
              @click='typeExpr(item.value)'
            >
              {{item.value}}
            </div>
            <div class='ac btn centered' @click='cleanHistory'>AC</div>
            <div class='plus-minus btn centered'  @click='toggleSign'>+/-</div>
            <div class='equals btn highlighted  centered' @click='count'>=</div>
        </div>
        <div class='history'>
            <h3>История операций</h3>
            <ul class='history-list'>
              <li v-for='item, index in historyArr' :key='index'>{{item}}</li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  // components: {
  //   HelloWorld
  // }
  data(){
    return {
      numbers: [
        {
        value: 0,
        class: 'zero',
        },
        {
        value: 1,
        class: 'one',
        },
        {
        value: 2,
        class: 'two',
        },
        {
        value: 3,
        class: 'three',
        },
        {
        value: 4,
        class: 'four',
        },
        {
        value: 5,
        class: 'five',
        },
        {
        value: 6,
        class: 'six',
        },
        {
        value: 7,
        class: 'seven',
        },
        {
        value: 8,
        class: 'eight',
        },
        {
        value: 9,
        class: 'nine',
        },
      ],
      operations: [
        {
          value: '+',
          class: 'plus'
        },
        {
          value: '-',
          class: 'minus'
        },
        {
          value: '×',
          class: 'multiply'
        },
        {
          value: '÷',
          class: 'divide'
        },
      ],
      various: [
        // {
        //   value: 'AC',
        //   class: 'ac',
        // },
        // {
        //   value: '+/-',
        //   class: 'plus-minus',
        // },
        {
          value: '%',
          class: 'percent',
        },
        {
          value: ',',
          class: 'comma',
        },
      ],
      historyArr: [],
      expr: '',
      result: '',
      restart: false,
      xScroll: false,
      yScroll: false,
    }
  },
  methods: {
    typeExpr(val) {
      if (this.restart) {
        this.expr = '';
      }
      this.restart = false; 
      this.expr += val;
      // 270 и 430 при полном экране
        // addScroll(outputText, 'x', calcElem.clientWidth - calcElem.clientWidth * 0.1);
      // addScroll(historyElem, 'y', calcElem.clientHeight);
    },
    countPercent(string, num1, action, num2) {  
        num2 = num1 * num2 / 100;
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
    toggleSign() {
        this.expr = this.expr.replace(/-?([0-9]+)$/, match => {
            const reg = /(-?[0-9]+)(-[0-9]+)$/;
            // проверяем, нужно ли написать явный +
            const minusCheck = reg.test(this.expr);
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
        });
    },
    cleanHistory() {
      this.historyArr = [];
      this.expr = '';
      this.removeSavedHistory();
    },
    prepareHistoryInfo() {
        const date = new Date();
        const currDate = date.toISOString().substring(0,10);
        const currTime = date.toLocaleTimeString();
        return  `${currDate} ${currTime} ${this.expr} = ${this.result}`;
    },
    saveHistory() {
      localStorage.setItem('historyList', JSON.stringify(this.historyArr));
    },
    removeSavedHistory() {
      localStorage.removeItem('historyList');
    },
    getSavedHistory(savedArr, tempArr) {
      return savedArr && savedArr.length > tempArr.length ? savedArr : [];
    },
    replaceSpecialSigns() {
        this.expr =  this.expr.replace(/,/g, '.');
        this.expr =  this.expr.replace(/([0-9]+)([÷×+-])([0-9]+)%/g, this.countPercent);
        this.expr =  this.expr.replace(/÷/g, '/');
        this.expr =  this.expr.replace(/×/g, '*');
    },
    check(string) {
        // проверяем, что это не число со знаком, а просто знак без числа
        const strStart = /[-+](?![0-9]+)/,
            notNumber = /÷0/,
            percentPriority = /([0-9]+%)[÷×]([0-9]+%)/,
            percentStart = /^([0-9]+%)/,
            onlyPercent = /^([0-9]+%)[-+]([0-9]+%)$/;
        if (notNumber.test(string)) {
            this.expr = 'не число';
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
            this.expr = 'Ошибка';
            return false;
        } else {
            return true;
        }
    },
    count() {
       // если прошли проверку и нет ошибок
      if (this.check(this.expr))  {
          this.restart = false;
          this.replaceSpecialSigns();
          this.result = eval(this.expr);
          this.result = String(this.result).replace(/\./g, ',');
          const historyLine = this.prepareHistoryInfo(this.result)
          this.historyArr.push(historyLine);       
          this.saveHistory();
          this.expr = this.result;
      } else {
        this.restart = true;
      }
    },
    addScrol(elem, direction, size) {
        let condition,
            classToAdd;
        if (direction === 'x') {
            condition = elem.clientWidth > size;
            classToAdd
        } else {
            condition = elem.clientHeight > size;
        }

        if (condition) {
            elem.classList.add(`${direction}-scroll`);
        } else {
            elem.classList.remove(`${direction}-scroll`);
        }
    }
  },
  computed: {

  },
  created() {
    this.historyArr = this.getSavedHistory(JSON.parse(localStorage.getItem('historyList')), this.historyArr);
  }
}
</script>

<style src='./style.css'></style>