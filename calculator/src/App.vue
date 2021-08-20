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
                <span class='output-text'>0</span>
            </div>
            <div 
              v-for='number in numbers' :key='number.value'
              :class="[number.class, 'btn', 'number', 'centered']"
            >
            {{number.value}}
            </div>
            <div 
              v-for='op in operations' :key='op.class'
              :class="[op.class, 'btn', 'highlighted', 'centered']"
            >
            {{op.value}}
            </div>
            <div 
              v-for='item in various' :key='item.class'
              :class="[item.class, 'btn','centered']"
            >
            {{item.value}}
            </div>
            <div class='equals btn highlighted  centered'>=</div>
        </div>
        <div class='history'>
            <h3>История операций</h3>
            <ul class='history-list'></ul>
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
        {
          value: 'AC',
          class: 'ac',
        },
        {
          value: '+/-',
          class: 'plus-minus',
        },
        {
          value: '%',
          class: 'percent',
        },
        {
          value: ',',
          class: 'comma',
        },
      ]
    }
  }
}
</script>

<style src='./style.css'></style>