import { Component } from 'yuzu';

export class View extends Component {
  defaultOptions() {
    return { data: {} };
  }
}

export const yuzuPlugin = {
  install(core) {
    this.$core = core;
  },
  init() {
    this.$core.views.byNamespace.forEach(this.parseViews, this);
  },
  parseViews(view, namespace) {
    const { component: ViewComponent, options = {} } = view;

    function destroy(page) {
      const { $yuzuContainer } = page;
      if ($yuzuContainer) {
        return $yuzuContainer.destroy().then(() => {
          delete page.$yuzuContainer;
        });
      }
      return Promise.resolve();
    }

    function mount(page) {
      return destroy(page).then(() => {
        const { container, ...data } = page;
        Object.defineProperty(page, '$yuzuContainer', {
          configurable: true,
          value: new ViewComponent({ ...options, data }).mount(container),
        });
      });
    }

    if (!Component.isComponent(ViewComponent)) {
      return view;
    }

    return Object.assign(view, {
      namespace,
      beforeEnter({ next = {}, current = {} }) {
        if (next.namespace === namespace && next.container) {
          return mount(next);
        }
        return current.namespace === namespace && mount(current);
      },
      beforeLeave({ current = {} }) {
        return current.namespace === namespace && destroy(current);
      },
    });
  },
};
