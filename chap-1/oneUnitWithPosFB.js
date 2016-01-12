import renderChart from './renderChart.js';

// inputFlag = 1 for pulse, 2 for step
export default function oneUnitWithPosFB(inputFlag = 1) {
  const cut = 0; // set cut-off
  const sat = 10; // set saturation

  const tEnd = 100;
  const timeSteps = tEnd + 1;

  const input = 1;
  const feedback = 1.05;

  const x = new Array(timeSteps).fill(0);
  const start = 11;

  if (inputFlag === 1) {
    x[start] = 1;
  } else if (inputFlag === 2) {
    x.fill(1, timeSteps - start + 1);
  }

  const y = new Array(timeSteps).fill(0);

  for (let i = 2; i < timeSteps; i++) {
    y[i] = feedback * y[i-1] + input * x[i-1];
    if (y[i] < cut) y[i] = cut;
    if (y[i] > sat) y[i] = sat;
  }

  const inputData = x.map((num, index) => ({x: index, y: num}));
  const outputData = y.map((num, index) => ({x: index, y: num}));

  renderChart(inputData, '#visualisation3', {xDomain: [0, 100], yDomain: [0, 1]});
  renderChart(outputData, '#visualisation4', {xDomain: [0, 100], yDomain: [0, 10]});
};
