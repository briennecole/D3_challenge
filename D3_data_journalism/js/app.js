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

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
const svg = d3
  .select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Step 3:
// Import data from the data.csv file
// =================================
d3.csv("data/data.csv").then(censusData => {
    // Step 4: Parse the data/cast as numbers
    censusData.forEach(data => {
        data.smokes = +data.smokes;
        data.poverty = +data.poverty;
      });
      console.log(censusData)
});