const PatternAnalysisUtils = {
  segmentData(data, windowSize) {
    const segments = [];
    for (let i = 0; i <= data.length - windowSize; i++) {
      segments.push({
        data: data.slice(i, i + windowSize),
        startIndex: i,
        endIndex: i + windowSize
      });
    }
    return segments;
  },

  findSimilarSegments(segments) {
    const similarities = new Map();
    segments.forEach((segment1, i) => {
      segments.slice(i + 1).forEach(segment2 => {
        const similarity = this.calculateSimilarity(segment1.data, segment2.data);
        if (similarity > 0.8) {
          similarities.set(`${i}-${segment2.startIndex}`, {
            segments: [segment1, segment2],
            similarity
          });
        }
      });
    });
    return similarities;
  },

  calculateSimilarity(sequence1, sequence2) {
    const normalized1 = this.normalizeSequence(sequence1);
    const normalized2 = this.normalizeSequence(sequence2);
    return this.calculateDTWDistance(normalized1, normalized2);
  },

  normalizeSequence(sequence) {
    const mean = sequence.reduce((a, b) => a + b) / sequence.length;
    const stdDev = Math.sqrt(
      sequence.reduce((sq, x) => sq + Math.pow(x - mean, 2), 0) / sequence.length
    );
    return sequence.map(x => (x - mean) / stdDev);
  },

  calculateDTWDistance(seq1, seq2) {
    const matrix = Array(seq1.length + 1).fill().map(() => 
      Array(seq2.length + 1).fill(Infinity)
    );
    matrix[0][0] = 0;

    for (let i = 1; i <= seq1.length; i++) {
      for (let j = 1; j <= seq2.length; j++) {
        const cost = Math.abs(seq1[i-1] - seq2[j-1]);
        matrix[i][j] = cost + Math.min(
          matrix[i-1][j],
          matrix[i][j-1],
          matrix[i-1][j-1]
        );
      }
    }
    return 1 / (1 + matrix[seq1.length][seq2.length]);
  }
};

export { PatternAnalysisUtils };
