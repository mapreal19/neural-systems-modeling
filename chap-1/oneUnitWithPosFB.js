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

  render2(inputData, '#visualisation3', {xDomain: [0, 100], yDomain: [0, 1]});
  render2(outputData, '#visualisation4', {xDomain: [0, 100], yDomain: [0, 10]});
};

const render2 = (data, selector, options) => {
  const vis = d3.select(selector),
    WIDTH = 600,
    HEIGHT = 200,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },

    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain(options.xDomain),

    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(options.yDomain),

    xAxis = d3.svg.axis()
    .scale(xScale),

    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${HEIGHT - MARGINS.bottom})`)
    .call(xAxis);

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", `translate(${MARGINS.left},0)`)
    .call(yAxis);

  const lineGen = d3.svg.line()
    .x(function(d) {
      return xScale(d.x);
    })
    .y(function(d) {
      return yScale(d.y);
    });

  vis.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
};
