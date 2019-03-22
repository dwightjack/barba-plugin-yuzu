import { Component } from 'yuzu';

export class View extends Component {}

View.defaultOptions = () => ({ data: {} });

export const yuzuPlugin = {
  install(core, { views = [] } = {}) {
    this.$core = core;
  },
  init() {
    this.$core.views.byNamespace.forEach(this.parseViews, this);
  },
  parseViews(view, namespace) {
    const { component: ViewComponent, options = {} } = view;

    function destroy(page = {}) {
      const { $yuzuContainer } = page;
      if ($yuzuContainer) {
        return $yuzuContainer.destroy().then(() => {
          delete page.$yuzuContainer;
        });
      }
      return Promise.resolve();
    }

    function mount(page = {}) {
      return destroy(page).then(() => {
        const { container, ...data } = page;
        Object.defineProperty(page, '$yuzuContainer', {
          enumerable: false,
          value: new ViewComponent({ ...options, data }).mount(container)
        });
      });
    }

    if (!Component.isComponent(ViewComponent)) {
      return view;
    }

    return Object.assign(view, {
      namespace,
      beforeAppear({ current }) {
        return mount(current);
      },
      beforeEnter({ next }) {
        return mount(next);
      },
      beforeLeave({ current }) {
        return destroy(current);
      }
    });
  }
};
