import Wines from './assets/Wine-Data.json';

// Function to calculate mean, median, and mode of a given dataset
export const calculateStatistics = (data: number[]): any => {
  // Calculate mean
  const mean = (
    data.reduce((acc: number, val: number) => acc + val, 0) / data.length
  ).toFixed(3);

  // Calculate median
  const sortedData = [...data].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedData.length / 2);
  const median = sortedData.length % 2 !== 0
    ? sortedData[middleIndex].toFixed(3)
    : ((sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2).toFixed(3);

  // Calculate mode
  const countMap: { [key: number]: number } = {};
  let maxCount = 0;
  let mode: number[] = [];

  data.forEach((val: number) => {
    countMap[val] = (countMap[val] || 0) + 1;

    if (countMap[val] > maxCount) {
      maxCount = countMap[val];
      mode = [val];
    } else if (countMap[val] === maxCount) {
      mode.push(val);
    }
  });

  return {
    mean,
    median,
    mode: mode.length >= 1 ? mode[0].toFixed(3).toString() : "No mode",
  };
};

// Function to extract master data of flavanoid and gamma values from Wine-Data.json
export const getMasterData = () => {
  const flavanoidsMasterData: { [key: number]: number[] } = {};
  const gammaMasterData: { [key: number]: number[] } = {};

  // Iterate over the wines data to populate the master data
  Wines.forEach(({ Alcohol, Flavanoids, Ash, Hue, Magnesium }) => {
    const alcoholType = Alcohol;
    const flavanoidValue: number = parseFloat(Flavanoids.toString());
    const gammaValue: number = (+Ash * Hue) / Magnesium;

    if (!flavanoidsMasterData[alcoholType]) {
      flavanoidsMasterData[alcoholType] = [];
    }
    if (!gammaMasterData[alcoholType]) {
      gammaMasterData[alcoholType] = [];
    }

    flavanoidsMasterData[alcoholType].push(flavanoidValue);
    gammaMasterData[alcoholType].push(gammaValue);
  });

  return {
    flavanoidsMasterDataArray: Object.values(flavanoidsMasterData),
    gammaMasterDataArray: Object.values(gammaMasterData),
  };
};
