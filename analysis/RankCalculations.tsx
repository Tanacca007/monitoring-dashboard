const RankCalculations = {
  calculateRanks(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const ranks = new Map();
    
    // Handle ties by averaging ranks
    let currentRank = 1;
    let currentValue = sorted[0];
    let tieCount = 1;
    
    for (let i = 1; i <= sorted.length; i++) {
      if (i === sorted.length || sorted[i] !== currentValue) {
        const averageRank = currentRank + (tieCount - 1) / 2;
        for (let j = i - tieCount; j < i; j++) {
          ranks.set(sorted[j], averageRank);
        }
        currentRank = i + 1;
        currentValue = sorted[i];
        tieCount = 1;
      } else {
        tieCount++;
      }
    }
    
    return data.map(x => ranks.get(x));
  },

  calculatePercentileRanks(data) {
    const n = data.length;
    const ranks = this.calculateRanks(data);
    return ranks.map(rank => (rank / n) * 100);
  },

  calculateOrdinalRanks(data) {
    const sorted = [...data].sort((a, b) => a - b);
    return data.map(x => sorted.indexOf(x) + 1);
  },

  calculateDenseRanks(data) {
    const uniqueSorted = [...new Set(data)].sort((a, b) => a - b);
    const rankMap = new Map(
      uniqueSorted.map((value, index) => [value, index + 1])
    );
    return data.map(x => rankMap.get(x));
  }
};

export { RankCalculations };
