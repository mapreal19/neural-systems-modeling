function forDisplay(num, index) {
  return {
    time: index,
    value: num
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

function render(data, selector) {
  const vis = d3.select(selector),
    WIDTH = 600,
    HEIGHT = 200,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },

    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 29]),

    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 4]),

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
      return xScale(d.time);
    })
    .y(function(d) {
      return yScale(d.value);
    });

  vis.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}

export default function InitChart() {
  const {
    inputPulses, outputPulses
  } = getData();

  render(inputPulses, '#visualisation');
  render(outputPulses, '#visualisation2');
}
