import { Component } from 'yuzu';

export class Button extends Component {
  created() {
    this.listeners = {
      click: () => alert('Clicked'),
    };
  }
}
