const UserContext = {
  getCurrentUser() {
    return {
      id: sessionStorage.getItem('userId'),
      role: sessionStorage.getItem('userRole'),
      permissions: this.getUserPermissions(),
      preferences: this.getUserPreferences()
    };
  },

  getUserPermissions() {
    const userRole = sessionStorage.getItem('userRole');
    const permissionMap = {
      admin: ['read', 'write', 'delete', 'manage'],
      operator: ['read', 'write', 'manage'],
      viewer: ['read']
    };
    return permissionMap[userRole] || [];
  },

  getUserPreferences() {
    const storedPreferences = localStorage.getItem('userPreferences');
    return storedPreferences ? JSON.parse(storedPreferences) : {
      theme: 'light',
      notifications: true,
      dashboardLayout: 'default'
    };
  }
};

export { UserContext };
