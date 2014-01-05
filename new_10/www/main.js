  var play_ball = function(){
    var sys;
    var arr = {"1":0,"8":0,"9":0}
    return {
        init:function(){
	sys = arbor.ParticleSystem(2600, 512, 0.99); //0.99 fixed!
            sys.renderer = Renderer("#viewport");
            sys.addNode('8', {label:'8'});
            sys.addNode('9', {label:'9'});
	    sys.addEdge('8','9');
            sys.addNode('1',{label:'1'})
        },
      
        ball_add: function(cnode){
                rt = $.ajax({   
                type: "GET",
                //url: "http://115.28.3.162:8889/",
                url: "http://localhost:8889/",
		data:{'cnode':cnode},
		async:false
                })
                var tn = JSON.parse(rt.responseText)
		if(arr[cnode]== 0){arr[cnode] = 1;
	        sys.addNode(cnode,{alone:true, label:cnode});
               			for (var i=0;i<tn.da.length;i++)
                		{sys.addNode(tn.da[i].n_name,{label:tn.da[i].label});	
                    		sys.addEdge(cnode, tn.da[i].n_name);
		    		arr[tn.da[i].n_name] = 0;}
		}else if(arr[cnode]== 1) {
				arr[cnode] = 0;
				sys.pruneNode(cnode);	
				for (var i=0;i<tn.da.length;i++)
	               		{sys.pruneNode(tn.da[i].n_name)
				arr[tn.da[i].n_name] = 2}
		}		
//		console.log(arr)
            }
        }
     }();


  var Renderer = function(canvas){
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var particleSystem

    var that = {
      init:function(system){
        particleSystem = system
        particleSystem.screenSize(canvas.width, canvas.height) 
        particleSystem.screenPadding(80) 
        that.initMouseHandling()
      },
      
      redraw:function(){
        ctx.fillStyle = "white"
        ctx.fillRect(0,0, canvas.width, canvas.height)
        
        particleSystem.eachEdge(function(edge, pt1, pt2){
          ctx.strokeStyle = "rgba(0,0,0, .333)"
          ctx.lineWidth = 1
	  ctx.lineCap="round";
          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          ctx.stroke()
        })

        particleSystem.eachNode(function(node, pt){

          var w1 = 16
	  var w2 = 9
          ctx.fillStyle = (node.data.alone) ? "orange" : "black"
          ctx.fillText((node.data.label), pt.x-w1/2, pt.y-w2/2)
	  ctx.shadowOffsetX = 1;    
	  ctx.shadowOffsetY = 1;    
	  ctx.shadowBlur    = 5;    
	  ctx.shadowColor   = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(pt.x-w1/2, pt.y-w2/2, w1,w2)
//	ctx.arc(pt.x,pt.y,5,0,2*Math.PI,false);
//	ctx.stroke(); 
        })    			
      },
      
      initMouseHandling:function(){
        var dragged = null;
        var handler = {

          clicked:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);


            if (dragged && dragged.node !== null){
              dragged.node.fixed = true;
              play_ball.ball_add(dragged.node.name)
            }

            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
                          }
            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            _mouseP = null
            return false
          }
        }
      
        $(canvas).mousedown(handler.clicked);

      },
      
    }
    return that
  }    



  $(document).ready(function(){
    play_ball.init()
     
  })
