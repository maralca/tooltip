function XtrTooltip(id){
	var tooltipId;
	var xtrTooltipElement;
	var xtrTooltip;
	var tooltipArrow;

	var defaultClass;
	var direction;

	tooltipId = XtrGraficoUtil.isset(id) ? id : "xtrTooltip";

	var count = 0;

	xtrTooltip = document.getElementById(tooltipId);

	if(xtrTooltip == null){
		xtrTooltip = document.createElement("div");
		document.body.appendChild(xtrTooltip);
	}

	direction = "right";
	defaultClass = "xtrTooltip-"+direction;
	xtrTooltip.setAttribute("class","xtrTooltip "+defaultClass);

	this.addTrigger = addTrigger;
	this.setDirection = setDirection;
	
	return this;

	function setDirection(type){
		if(!XtrGraficoUtil.isset(type))
			return;
		direction = type;
		defaultClass = "xtrTooltip-"+direction;
		xtrTooltip.setAttribute("class","xtrTooltip "+defaultClass);
	}	
	function addTrigger(triggerObject){
		var triggerId;
		var triggerElement;

		var HTML;
		var offset;

		var moveX,moveY;

		var boundingElement,boundingTooltip;

		if(XtrGraficoUtil.isobj(triggerObject)){
			if(XtrGraficoUtil.isset(triggerObject.id)){
				triggerId = triggerObject.id;
			}
			HTML = triggerObject.content;
			if(XtrGraficoUtil.isobj(triggerObject.offset))
				offset = triggerObject.offset;
			else if(XtrGraficoUtil.isset(offset)){
				offset.x = offset;
				offset.y = offset.x;
			}
			else{
				offset = {};
			}
		}
		else if(XtrGraficoUtil.isset(triggerObject)){
			triggerId = triggerObject;
		}

		if(triggerId instanceof Node)
			triggerElement = triggerId;
		else
			triggerElement = document.getElementById(triggerId);

		if(triggerElement == null){
			console.warn("XtrTooltip, trigger id does not exist");
			return;
		}

		triggerElement.addEventListener("mouseover",function(event){

			xtrTooltip.innerHTML = HTML;

			boundingElement = this.getBoundingClientRect();
			boundingTooltip = xtrTooltip.getBoundingClientRect();
			if(direction == "left"){
				moveX = boundingElement.left - boundingTooltip.width;
				moveY = boundingElement.top + boundingElement.height/3;
			}
			else if(direction == "top"){
				moveX = event.clientX - boundingTooltip.width/2;
				moveY = event.clientY + 20;
			}

			moveX += XtrGraficoUtil.isset(offset.x) ? offset.x : 0;
			moveY += XtrGraficoUtil.isset(offset.y) ? offset.y : 0;

			xtrTooltip.style.setProperty("left",moveX);
			xtrTooltip.style.setProperty("top",moveY);

			xtrTooltip.setAttribute("class","xtrTooltip "+defaultClass+" show");
		});

		triggerElement.addEventListener("mouseout",function(){
			xtrTooltip.setAttribute("class","xtrTooltip "+defaultClass);
			xtrTooltip.style = "";
		});	
	}
}