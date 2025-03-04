const CorrelationCalculations = {
  calculateCorrelations(data) {
    return {
      pearson: this.calculatePearsonCorrelation(data),
      spearman: this.calculateSpearmanCorrelation(data),
      kendall: this.calculateKendallCorrelation(data),
      partial: this.calculatePartialCorrelation(data)
    };
  },

  calculatePearsonCorrelation(x, y) {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b) / n;
    const meanY = y.reduce((a, b) => a + b) / n;
    
    const covariance = x.reduce((sum, xi, i) => 
      sum + (xi - meanX) * (y[i] - meanY), 0
    );
    
    const stdX = Math.sqrt(x.reduce((sq, val) => 
      sq + Math.pow(val - meanX, 2), 0
    ));
    
    const stdY = Math.sqrt(y.reduce((sq, val) => 
      sq + Math.pow(val - meanY, 2), 0
    ));
    
    return covariance / (stdX * stdY);
  },

  calculateSpearmanCorrelation(x, y) {
    const ranked_x = this.calculateRanks(x);
    const ranked_y = this.calculateRanks(y);
    return this.calculatePearsonCorrelation(ranked_x, ranked_y);
  },

  calculateKendallCorrelation(x, y) {
    const n = x.length;
    let concordant = 0;
    let discordant = 0;
    
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const sign_x = Math.sign(x[j] - x[i]);
        const sign_y = Math.sign(y[j] - y[i]);
        if (sign_x * sign_y > 0) concordant++;
        if (sign_x * sign_y < 0) discordant++;
      }
    }
    
    return (concordant - discordant) / Math.sqrt(
      (concordant + discordant + x.length) * 
      (concordant + discordant + y.length)
    );
  }
};

export { CorrelationCalculations };
