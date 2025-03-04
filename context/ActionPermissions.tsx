const ActionPermissions = {
  defineActionRules() {
    return {
      alerts: {
        view: ['read'],
        acknowledge: ['write'],
        resolve: ['write'],
        delete: ['delete'],
        configure: ['manage']
      },
      metrics: {
        view: ['read'],
        export: ['read'],
        modify: ['write'],
        configure: ['manage']
      },
      settings: {
        view: ['read'],
        modify: ['write'],
        system: ['manage']
      }
    };
  },

  validateAction(action, category) {
    const rules = this.defineActionRules();
    const requiredPermissions = rules[category][action];
    return PermissionHandler.enforcePermissions(requiredPermissions);
  },

  getAvailableActions() {
    const userPermissions = UserContext.getCurrentUser().permissions;
    const rules = this.defineActionRules();
    
    return Object.entries(rules).reduce((actions, [category, categoryRules]) => {
      actions[category] = Object.entries(categoryRules)
        .filter(([action, required]) => 
          required.every(permission => userPermissions.includes(permission))
        )
        .map(([action]) => action);
      return actions;
    }, {});
  }
};

export { ActionPermissions };
