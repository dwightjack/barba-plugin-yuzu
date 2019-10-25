import { View } from '../../src';
import { Button } from './Button';

export class AboutView extends View {
  created() {
    this.selectors = {
      button: '.button',
    };
  }
  initialize() {
    this.setRef({
      component: Button,
      el: this.$els.button,
      id: 'button',
    });
  }
}
