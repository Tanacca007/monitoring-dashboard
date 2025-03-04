const SequenceReduction = {
  reduceByHalf(sequence) {
    const reduced = [];
    for (let i = 0; i < sequence.length - 1; i += 2) {
      reduced.push((sequence[i] + sequence[i + 1]) / 2);
    }
    if (sequence.length % 2) {
      reduced.push(sequence[sequence.length - 1]);
    }
    return reduced;
  },

  reduceBySampling(sequence, targetLength) {
    const step = sequence.length / targetLength;
    return Array.from({ length: targetLength }, (_, i) => 
      sequence[Math.floor(i * step)]
    );
  },

  reduceByPCA(sequence, components = 2) {
    const centered = this.centerData(sequence);
    const covariance = this.calculateCovariance(centered);
    const eigenVectors = this.computeEigenVectors(covariance, components);
    return this.projectData(centered, eigenVectors);
  },

  reduceByWavelet(sequence, level = 1) {
    let coefficients = [...sequence];
    for (let l = 0; l < level; l++) {
      coefficients = this.singleLevelDWT(coefficients);
    }
    return coefficients;
  },

  singleLevelDWT(data) {
    const n = data.length;
    const output = new Array(n);
    
    for (let i = 0; i < n/2; i++) {
      const k = i * 2;
      output[i] = (data[k] + data[k + 1]) / Math.sqrt(2);
      output[i + n/2] = (data[k] - data[k + 1]) / Math.sqrt(2);
    }
    
    return output;
  }
};

export { SequenceReduction };
