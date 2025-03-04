const ComponentRegistry = {
  components: new Map(),

  register(name, component) {
    this.components.set(name, {
      component,
      permissions: PermissionHandler.getActionPermissions(),
      state: StateManager.state
    });
  },

  getComponent(name) {
    return this.components.get(name);
  }
};

export { ComponentIntegration, ComponentRegistry };
