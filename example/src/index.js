import barba from '@barba/core';
import { TweenMax } from 'gsap';
import { Component, devtools } from 'yuzu';
import { yuzuPlugin } from '../../src';
import { HomeView } from './HomeView';
import { AboutView } from './AboutView';

devtools(Component);
barba.use(yuzuPlugin);

const animate = (el, duration, props) =>
  new Promise((resolve) => {
    TweenMax.to(el, duration, { ...props, onComplete: () => resolve() });
  });

barba.init({
  debug: true,
  transitions: [
    {
      name: 'fade',
      leave({ current }) {
        return animate(current.container, 0.25, { autoAlpha: 0 });
      },
      enter({ next }) {
        TweenMax.set(next.container, { autoAlpha: 0 });
        return animate(next.container, 0.25, { autoAlpha: 1 });
      },
    },
  ],
  views: [
    { component: HomeView, namespace: 'home' },
    { component: AboutView, namespace: 'about' },
  ],
});
