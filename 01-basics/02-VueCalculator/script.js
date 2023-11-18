import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const operations = {
  "sum": (a, b) => a + b,
  "subtract": (a, b) => a - b,
  "multiply": (a, b) => a * b,
  "divide": (a, b) => a / b,
}

// Создайте Vue приложение
const App = defineComponent({
  name: "App",
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      operator: "sum",
    }
  },
  computed: {
    result() {
      return operations[this.operator] &&
        operations[this.operator](this.firstNumber, this.secondNumber);
    }
  }
})

createApp(App).mount("#app");
