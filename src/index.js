import barba from '@barba/core';
import { TweenMax } from 'gsap';
import { Component, devtools } from 'yuzu';
import { Sandbox } from 'yuzu-application';
import { yuzuPlugin, View } from './yuzu-plugin-barba';
devtools(Component);

class Counter extends Component {
  created() {
    this.state = {
      count: 0
    };

    this.actions = {
      count: v => {
        this.$el.textContent = v;
      }
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

const animate = (el, duration, props) =>
  new Promise(resolve => {
    TweenMax.to(el, duration, { ...props, onComplete: () => resolve() });
  });

class HomeView extends View {
  created() {
    this.selectors = {
      counter: '.counter'
    };
  }
  initialize() {
    this.setRef({
      component: Counter,
      el: this.$els.counter,
      id: 'counter'
    });
  }
}

barba.use(yuzuPlugin);

barba.init({
  debug: true,
  transitions: [
    {
      name: 'fade',
      leave({ current }) {
        return animate(current.container, 0.5, { autoAlpha: 0 });
      },
      enter({ next }) {
        TweenMax.set(next.container, { autoAlpha: 0 });
        return animate(next.container, 0.5, { autoAlpha: 1 });
      }
    }
  ],
  views: [{ component: HomeView, namespace: 'home' }]
});
