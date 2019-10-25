import { Component } from 'yuzu';

export class Timer extends Component {
  created() {
    this.state = {
      elapsed: 0,
    };

    this.selectors = {
      elapsed: '.timer__elapsed',
    };

    this.actions = {
      elapsed: (v) => {
        this.$els.elapsed.textContent = v;
      },
    };
  }

  mounted() {
    this.interval = setInterval(() => {
      this.setState(({ elapsed }) => ({ elapsed: elapsed + 1 }));
    }, 1000);
  }

  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
