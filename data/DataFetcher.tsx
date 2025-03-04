const DataFetcher = {
  async fetchData(endpoint, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      timeout: 5000
    };

    try {
      const response = await fetch(endpoint, { ...defaultOptions, ...options });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return ErrorHandler.handleError(error, { endpoint, options });
    }
  },

  batchFetch(endpoints) {
    return Promise.all(
      endpoints.map(endpoint => this.fetchData(endpoint))
    );
  }
};
