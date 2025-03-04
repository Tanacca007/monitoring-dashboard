const ActionValidation = {
  validateUserAction(action, context) {
    const user = UserContext.getCurrentUser();
    const permissions = ActionPermissions.getAvailableActions();
    
    return {
      isValid: this.checkActionValidity(action, context, permissions),
      canProceed: this.checkActionPreconditions(action, context),
      auditLog: this.logActionAttempt(action, user, context)
    };
  },

  checkActionValidity(action, context, permissions) {
    const category = this.determineActionCategory(action);
    return permissions[category]?.includes(action) ?? false;
  },

  checkActionPreconditions(action, context) {
    const preconditions = {
      acknowledge: () => context.alert && context.alert.status === 'active',
      resolve: () => context.alert && ['active', 'acknowledged'].includes(context.alert.status),
      delete: () => !context.isSystemCritical,
      modify: () => context.isEditable
    };

    return preconditions[action]?.() ?? true;
  }
};

export { ActionValidation };
