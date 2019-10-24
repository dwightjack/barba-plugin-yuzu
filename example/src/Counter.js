import { Component } from 'yuzu';

export class Counter extends Component {
  created() {
    this.state = {
      count: 0,
    };

    this.actions = {
      count: (v) => {
        this.$el.textContent = v;
      },
    };
  }

  mounted() {
    this.interval = setInterval(() => {
      this.setState(({ count }) => ({ count: count + 1 }));
    }, 1000);
  }

  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
