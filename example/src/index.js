import barba from '@barba/core';
import { TweenMax } from 'gsap';
import { Component, devtools } from 'yuzu';
import { yuzuPlugin, View } from '../../src';
import { Counter } from './Counter';

devtools(Component);
barba.use(yuzuPlugin);

const animate = (el, duration, props) =>
  new Promise((resolve) => {
    TweenMax.to(el, duration, { ...props, onComplete: () => resolve() });
  });

class HomeView extends View {
  created() {
    this.selectors = {
      counter: '.counter',
    };
  }
  initialize() {
    this.setRef({
      component: Counter,
      el: this.$els.counter,
      id: 'counter',
    });
  }
}

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
      },
    },
  ],
  views: [{ component: HomeView, namespace: 'home' }],
});
