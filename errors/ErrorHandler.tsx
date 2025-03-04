const ErrorHandler = {
  handleError(error, context) {
    const errorType = this.classifyError(error);
    this.logError(error, context);
    return this.getErrorResponse(errorType);
  },

  classifyError(error) {
    if (error.name === 'NetworkError') return 'network';
    if (error.name === 'ValidationError') return 'validation';
    if (error.name === 'AuthError') return 'auth';
    return 'general';
  },

  getErrorResponse(type) {
    const responses = {
      network: { message: 'Connection error', retry: true },
      validation: { message: 'Invalid input', retry: false },
      auth: { message: 'Authentication required', retry: false },
      general: { message: 'An error occurred', retry: true }
    };
    return responses[type];
  }
};
