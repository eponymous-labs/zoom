var width = innerWidth,
    height = innerHeight;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var fisheye = d3.fisheye.circular()
    .radius(250)
    .distortion(0)
    .aspectRatio(width / height);

// var force = d3.forceSimulation()
//     .charge(-240)
//     .linkDistance(40)
//     .size([width, height]);


var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


var zoom = d3.zoom()
  .scaleExtent([1, 10]) 
  .on("zoom", zoomed);



var svg = d3.select("#chart1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom)
    .on('wheel.zoom', wheeled)


var g = svg.append("g");


var xStepsBig = d3.range(10, width, 32),
    yStepsBig = d3.range(10, height, 32),
    xStepsSmall = d3.range(0, width, 12),
    yStepsSmall = d3.range(0, height, 12)

var line = d3.line();

g.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

g.selectAll(".x")
    .data(xStepsBig)
  .enter().append("path")
    .attr("class", "x")
    .datum(function(x) { return yStepsSmall.map(function(y) { return [x, y]; }); });

g.selectAll(".y")
    .data(yStepsBig)
  .enter().append("path")
    .attr("class", "y")
    .datum(function(y) { return xStepsSmall.map(function(x) { return [x, y]; }); });

var path = g.selectAll("path")
    .attr("d", fishline);


function fishline(d) {
  return line(d.map(function(d) {
    d = fisheye({x: d[0], y: d[1]});
    return [d.x, d.y];
  }));
}



function zoomed() {
    g.attr("transform", d3.event.transform);


    // fisheye.focus(d3.mouse(this));
    var tr = d3.zoomTransform(svg.node());
    fisheye.focus([(-tr.x + width/2)/tr.k, (-tr.y + height/2)/tr.k])
    fisheye.distortion(Math.max(0, tr.k - 1))
    // console.log(tr.k - 1)
    // fisheye.distortion(0.01)

    path.attr("d", fishline);

    
    node.each(function(d) { d.fisheye = fisheye(d); })
        .attr("cx", function(d) { return d.fisheye.x; })
        .attr("cy", function(d) { return d.fisheye.y; })
        .attr("r", function(d) { return d.fisheye.z * 4.5; });

    link.attr("x1", function(d) { return d.source.fisheye.x; })
        .attr("y1", function(d) { return d.source.fisheye.y; })
        .attr("x2", function(d) { return d.target.fisheye.x; })
        .attr("y2", function(d) { return d.target.fisheye.y; });
}

function wheeled(){
    var e = d3.event;
    e.preventDefault()
    if(e.metaKey || e.ctrlKey){
      // adjustScaleWithPin(mouse.x, mouse.y, Math.pow(0.98, e.deltaY))
      // console.log('scale', d3.event)
      zoom.scaleBy(svg, Math.pow(0.98, e.deltaY))

    } else {
      // console.log('pan', d3.event)
      var scale = d3.zoomTransform(svg.node()).k;
      zoom.translateBy(svg, -e.deltaX / scale, -e.deltaY / scale)
      // adjustOffset(-e.deltaX, -e.deltaY)
      // updateMouse()
    }
}

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var data = miserables;
var n = data.nodes.length;

simulation.nodes(data.nodes)
simulation.force("link").links(data.links);

// Initialize the positions deterministically, for better results.
data.nodes.forEach(function(d, i) { d.x = d.y = width / n * i; });

// Run the layout a fixed number of times.
// The ideal number of times scales with graph complexity.
// Of course, don't run too long—you'll hang the page!
// simulation.start();
for (var i = 2*n; i > 0; --i) simulation.tick();
simulation.stop();

// Center the nodes in the middle.
var ox = 0, oy = 0;
data.nodes.forEach(function(d) { ox += d.x, oy += d.y; });
ox = ox / n - width / 2, oy = oy / n - height / 2;
data.nodes.forEach(function(d) { d.x -= ox, d.y -= oy; });

var link = g.selectAll(".link")
    .data(data.links)
  .enter().append("line")
    .attr("class", "link")
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; })
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = g.selectAll(".node")
    .data(data.nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 4.5)
    .style("fill", function(d) { return color(d.group); })
    // .call(force.drag);





// svg.on("mousemove", function() {
//   fisheye.focus(d3.mouse(this));
//   path.attr("d", fishline);

  
//   node.each(function(d) { d.fisheye = fisheye(d); })
//       .attr("cx", function(d) { return d.fisheye.x; })
//       .attr("cy", function(d) { return d.fisheye.y; })
//       .attr("r", function(d) { return d.fisheye.z * 4.5; });

//   link.attr("x1", function(d) { return d.source.fisheye.x; })
//       .attr("y1", function(d) { return d.source.fisheye.y; })
//       .attr("x2", function(d) { return d.target.fisheye.x; })
//       .attr("y2", function(d) { return d.target.fisheye.y; });
// });

// svg.on("mousemove", function() {
//   fisheye.focus(d3.mouse(this));

//   node.each(function(d) { d.fisheye = fisheye(d); })
//       .attr("cx", function(d) { return d.fisheye.x; })
//       .attr("cy", function(d) { return d.fisheye.y; })
//       .attr("r", function(d) { return d.fisheye.z * 4.5; });

//   link.attr("x1", function(d) { return d.source.fisheye.x; })
//       .attr("y1", function(d) { return d.source.fisheye.y; })
//       .attr("x2", function(d) { return d.target.fisheye.x; })
//       .attr("y2", function(d) { return d.target.fisheye.y; });
// });
