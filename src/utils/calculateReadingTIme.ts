const calculateReadingTime = (wordsNumber: number, wordsPerMinute = 265) => {
  return Math.round(wordsNumber / wordsPerMinute);
};

export default calculateReadingTime;
