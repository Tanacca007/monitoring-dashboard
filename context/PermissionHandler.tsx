const PermissionHandler = {
  checkPermission(action) {
    const user = UserContext.getCurrentUser();
    return user.permissions.includes(action);
  },

  enforcePermissions(requiredPermissions) {
    const user = UserContext.getCurrentUser();
    return requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    );
  },

  getActionPermissions() {
    return {
      canManageAlerts: this.checkPermission('manage'),
      canModifySettings: this.checkPermission('write'),
      canViewMetrics: this.checkPermission('read'),
      canDeleteData: this.checkPermission('delete')
    };
  },

  renderBasedOnPermission(component, requiredPermission) {
    return this.checkPermission(requiredPermission) 
      ? component 
      : <RestrictedAccess />;
  }
};

const RestrictedAccess = () => (
  <div className="text-center p-4 bg-gray-100 rounded">
    <h3 className="text-gray-600">Access Restricted</h3>
    <p className="text-sm">Contact administrator for access</p>
  </div>
);

export { PermissionHandler };
