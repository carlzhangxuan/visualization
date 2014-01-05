function init() {
  // Instanciate sigma.js and customize rendering :
/*  var sigInst = sigma.init(document.getElementById('viewport')).drawingProperties({
    defaultLabelColor: '#fff',
    defaultLabelSize: 14,
    defaultLabelBGColor: '#fff',
    defaultLabelHoverColor: '#000',
    labelThreshold: 6,
    defaultEdgeType: 'curve'
  }).graphProperties({
    minNodeSize: 0.5,
    maxNodeSize: 5,
    minEdgeSize: 1,
    maxEdgeSize: 1,
    sideMargin: 50
  }).mouseProperties({
    maxRatio: 32
  });*/


var sigInst = sigma.init(document.getElementById('viewport')).drawingProperties({
		    font: "微软雅黑",
		    defaultLabelColor: '#000',
		    defaultLabelSize: 5,
		    defaultLabelBGColor: '#fff',
		    defaultLabelHoverColor: '#000',
		    labelThreshold: 0,
		//    defaultEdgeType: 'curve',
		    defualtDirected: !0,
		    labelSize: "10",
		    labelSizeRatio: 1.5
		  }).graphProperties({
			  // minNodeSize:0.1,
		    minNodeSize: 0,
		    maxNodeSize: 0,
		    minEdgeSize: 3,
		    maxEdgeSize: 3,
		    arrowSize: 2,
		    arrowShowRatio: 2
		  }).mouseProperties({
		    maxRatio: 32
		  });
 
  // Parse a GEXF encoded file to fill the graph
  // (requires "sigma.parseGexf.js" to be included)
//  sigInst.parseGexf('arctic.gexf');
//  sigInst.parseGexf('graph_agoda.gexf');
  sigInst.parseGexf('http://115.28.3.162:8889/Gexf_gen?cnode=艺龙');
 $("#loader").fadeOut()
 
  // Draw the graph :
  sigInst.draw();
}
 
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", init, false);
} else {
  window.onload = init;
}
