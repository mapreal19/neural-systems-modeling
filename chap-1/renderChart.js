export default function renderChart(data, selector, options) {
  debugger;
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
