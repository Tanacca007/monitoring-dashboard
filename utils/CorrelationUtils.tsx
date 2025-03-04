const CorrelationUtils = {
  getCorrelationColor(coefficient) {
    const absCoeff = Math.abs(coefficient);
    if (absCoeff >= 0.7) {
      return coefficient > 0 ? 'bg-green-50' : 'bg-red-50';
    } else if (absCoeff >= 0.4) {
      return coefficient > 0 ? 'bg-blue-50' : 'bg-orange-50';
    }
    return 'bg-gray-50';
  },

  getStrengthCategory(strength) {
    const absStrength = Math.abs(strength);
    if (absStrength >= 0.7) return 'strong';
    if (absStrength >= 0.4) return 'moderate';
    return 'weak';
  },

  formatCorrelation(coefficient) {
    return (coefficient * 100).toFixed(1) + '%';
  },

  calculateSignificance(correlation, sampleSize) {
    const tStat = correlation * Math.sqrt((sampleSize - 2) / (1 - correlation * correlation));
    const pValue = this.calculatePValue(tStat, sampleSize - 2);
    
    return {
      tStatistic: tStat,
      pValue: pValue,
      isSignificant: pValue < 0.05
    };
  },

  calculatePartialCorrelation(x, y, z) {
    const rxy = this.calculatePearsonCorrelation(x, y).coefficient;
    const rxz = this.calculatePearsonCorrelation(x, z).coefficient;
    const ryz = this.calculatePearsonCorrelation(y, z).coefficient;
    
    return (rxy - rxz * ryz) / 
           Math.sqrt((1 - rxz * rxz) * (1 - ryz * ryz));
  }
};

export { CorrelationUtils };
