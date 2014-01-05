var margin = {top: 1, right: 1, bottom: 6, left: 1},
width = 800 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " Paths"; },
    color = d3.scale.category20();

var sankey = d3.sankey()
    .nodeWidth(3)
    .nodePadding(20)
    .size([width, height]);

var path = sankey.link();

$( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: true,
  //    min: 0,
//      max: 50,
      value: [0,50],
      slide: function( event, ui ) 
	{
		$( "#amount" ).val( ui.value );
		var vall = ui.values[0]
		var valh = ui.values[1]
		$("#chart").find("svg").remove();
		
		var svg = d3.select("#chart").append("svg")
    		.attr("width", width + margin.left + margin.right)
    	//	.attr("width", document.body.clientWidth)
    		.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.json("data/jiudian_agoda_4_text.json", function(energy) {
		sankey
      			.nodes(energy.nodes)
      			.links(energy.links)
      			.layout(32);

  			var link = svg.append("g").selectAll(".link")
      			.data(energy.links)
    			.enter().append("path")
      			.attr("class", function(d){return (d.value >= vall && d.value <= valh) ? "link":"hil"})
      			.attr("d", path)
   			.style("stroke-width", function(d) { return Math.max(1, d.dy); })
      			.sort(function(a, b) { return b.dy - a.dy; });

  			link.append("title")
      			.text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value) });

 			 var node = svg.append("g").selectAll(".node")
      			.data(energy.nodes)
    			.enter()
			.append("g")
      			.attr("class", "node")
      			.attr("class",function(c){return (c.value > 0) ? "node" : "hi"})
      			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    			.call(d3.behavior.drag()
      			.origin(function(d) { return d; })
     			.on("dragstart", function() { this.parentNode.appendChild(this); })
      			.on("drag", dragmove));

  			node.append("rect")
      			.attr("height", function(d) { return d.dy; })
      			.attr("width", sankey.nodeWidth())
     			//.style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      			.style("fill", function(d) { return (d.value > 0) ? d.color = color(d.name.replace(/ .*/, "")) : "white"; })
      			//.style("stroke", function(d) { return (d.value > 0) ? d3.rgb(d.color).darker(2) : "white"; })
   			.style("stroke-width", 0)
    			.append("title")
      			.text(function(d) { return d.name + "\n" + format(d.value) + "\n后续加入<" + d.name + ">相关词包信息" + d.desc;});

  			node.append("text")
			.attr("class", "text")
      			.attr("x", -6)
     		 	.attr("y", function(d) { return d.dy / 2; })
      			.attr("dy", ".35em")
      			.attr("text-anchor", "end")
      			.attr("transform", null)
      			//.style("fill", function(d) { return (d.value > 0) ? d.color = color(d.name.replace(/ .*/, "")) : "white"; })
      			.text(function(d) { return d.name; })
    			.filter(function(d) { return d.x < 7*width /8; })
      			.attr("x", 6 + sankey.nodeWidth())
      			.attr("text-anchor", "start");

 		 	function dragmove(d) {
    				d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    				sankey.relayout();
    				link.attr("d", path);
  			}
		});
		$( "#amount" ).text( $( "#slider-vertical" ).slider( "values", 0) +'->'+$( "#slider-vertical" ).slider( "values", 1) );

    	}
});

