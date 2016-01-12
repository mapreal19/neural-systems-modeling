import renderChart from './renderChart.js';

function forDisplay(num, index) {
  return {
    x: index,
    y: num
  };
}

function nTimesArray(arr, nTimes) {
  return [].concat.apply([], Array.apply(null, Array(nTimes)).map(() => arr));
}

function getData() {
  let weight = 4;
  const weigthDecrement = 0.7;
  const pulse = [0, 0, 1, 0, 0];

  const inputPulses = nTimesArray(pulse, 6);

  const outputPulses = [];

  inputPulses.forEach(function(inputPulse, index) {
    outputPulses[index] = weight * inputPulse;

    if (inputPulse > 0) weight *= weigthDecrement;
  });

  return {
    inputPulses: inputPulses.map(forDisplay),
    outputPulses: outputPulses.map(forDisplay)
  }
}

export default function InitChart() {
  const {
    inputPulses, outputPulses
  } = getData();

  renderChart(inputPulses, '#visualisation', {xDomain: [0, 29], yDomain: [0, 4]});
  renderChart(outputPulses, '#visualisation2', {xDomain: [0, 29], yDomain: [0, 4]});
}
