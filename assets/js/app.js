// Set SVG parameters
const svgWidth = 960;
const svgHeight = 500;

// Set margins
const margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
const svg = d3
  .select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import data from the data.csv file
// =================================
d3.csv("assets/data/data.csv").then(censusData => {
    // Parse the data/cast as numbers
    censusData.forEach(data => {
        data.smokes = +data.smokes;
        data.poverty = +data.poverty;
      });
      console.log(censusData)

      // Create scale functions
    // ==============================
    const xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(censusData, d => d.smokes)])
    .range([0, width]);

    const yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d.poverty)])
    .range([height, 0]);

    // Create axis functions
    // ==============================
    const bottomAxis = d3.axisBottom(xLinearScale.nice());
    const leftAxis = d3.axisLeft(yLinearScale.nice());

    // Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

     // Step 5: Create Circles
    // ==============================
    const circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .join("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "red")
    .attr("opacity", 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

    const toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(d => `${d.census}<br>Poverty Rate: ${d.poverty}<br>Smokers: ${d.smokes}`);

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);


    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Percent of Population who Live in Poverty");
      
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Percent of Population who Smoke");
  }).catch(error => console.log(error));


