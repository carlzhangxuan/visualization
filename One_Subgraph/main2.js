var width = 800
    height = 600;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-400)
    .linkDistance(130)
    .size([width, height]);

var svg = d3.select("#viewport").append("svg")
    .attr("width", width)
    .attr("height", height);

//d3.json("http://localhost:8889/Multilayer?cnode=100", function(error, graph) {
d3.json("http://115.28.3.162:8889/Multilayer?cnode=agoda", function(error, graph) {
	$("#loader").fadeOut()
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

 var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
	.attr("width",0.1)

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("rect")
      .attr("class", "node")
      .attr("width", 0)
      .attr("height",0)
      .style("fill", "black")
     .call(force.drag);
 
   var text = svg.selectAll(".text")
    .data(graph.nodes)
    .enter().append("text")
    .attr("class","text")
    .text(function(d) { return d.name;})
    .call(force.drag);


  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
    text.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
  });
});

