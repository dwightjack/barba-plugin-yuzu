import { View } from '../../src';
import { Timer } from './Timer';

export class HomeView extends View {
  created() {
    this.selectors = {
      timer: '.timer',
    };
  }
  initialize() {
    this.setRef({
      component: Timer,
      el: this.$els.timer,
      id: 'timer',
    });
  }
}
