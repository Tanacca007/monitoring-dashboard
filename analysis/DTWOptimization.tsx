const DTWOptimization = {
  fastDTW(seq1, seq2, radius = 1) {
    if (radius < 1) radius = 1;
    const minSize = radius + 2;

    if (seq1.length <= minSize || seq2.length <= minSize) {
      return this.calculateDTWDistance(seq1, seq2);
    }

    const shrunkSeq1 = this.reduceByHalf(seq1);
    const shrunkSeq2 = this.reduceByHalf(seq2);
    
    const window = this.expandWindow(
      this.fastDTW(shrunkSeq1, shrunkSeq2, radius),
      seq1.length,
      seq2.length,
      radius
    );

    return this.constrainedDTW(seq1, seq2, window);
  },

  constrainedDTW(seq1, seq2, window) {
    const matrix = new Map();
    const maxDistance = Infinity;

    window.forEach(([i, j]) => {
      if (i === 0 && j === 0) {
        matrix.set(`${i},${j}`, 0);
        return;
      }

      const cost = Math.abs(seq1[i] - seq2[j]);
      const min = Math.min(
        matrix.get(`${i-1},${j}`) ?? maxDistance,
        matrix.get(`${i},${j-1}`) ?? maxDistance,
        matrix.get(`${i-1},${j-1}`) ?? maxDistance
      );

      matrix.set(`${i},${j}`, cost + min);
    });

    return matrix.get(`${seq1.length-1},${seq2.length-1}`);
  },

  expandWindow(path, len1, len2, radius) {
    const window = new Set();
    path.forEach(([i, j]) => {
      for (let r = -radius; r <= radius; r++) {
        for (let c = -radius; c <= radius; c++) {
          const newI = i * 2 + r;
          const newJ = j * 2 + c;
          if (newI >= 0 && newI < len1 && newJ >= 0 && newJ < len2) {
            window.add(`${newI},${newJ}`);
          }
        }
      }
    });
    return Array.from(window).map(coord => coord.split(',').map(Number));
  }
};

export { DTWOptimization };
