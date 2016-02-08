function XtrTooltip(id,direction){
	var tooltipId;
	var xtrTooltipElement;
	var xtrTooltip;
	var tooltipArrow;

	var defaultClass;
	


	tooltipId = XtrGraficoUtil.isset(id) ? id : "xtrTooltip";

	var count = 0;

	xtrTooltip = document.getElementById(tooltipId);

	if(xtrTooltip == null){
		xtrTooltip = document.createElement("div");
		xtrTooltip.setAttribute("id",tooltipId);
		document.body.appendChild(xtrTooltip);
	}

	direction = XtrGraficoUtil.isset(direction) ? direction : "left";
	defaultClass = "xtrTooltip-"+direction;
	xtrTooltip.setAttribute("class","xtrTooltip "+defaultClass);

	this.addTrigger = addTrigger;
	this.setDirection = setDirection;
	this._ = xtrTooltip;

	return this;

	function setDirection(type){
		if(!XtrGraficoUtil.isset(type))
			return;
		direction = type;
		defaultClass = "xtrTooltip-"+direction;
		xtrTooltip.setAttribute("class","xtrTooltip "+defaultClass);
	}	
	function addTrigger(triggerselector,triggerObject){
		var triggerId;
		var triggerElement;

		var HTML;
		var offset;

		var moveX,moveY;

		var boundingElement,boundingTooltip;

		if(XtrGraficoUtil.isobj(triggerObject)){
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
		if(triggerselector instanceof Node){
			triggerElements = triggerselector;
			triggerElement = triggerselector;
			exception = true;
		}
		else{
			exception = false;
			triggerElements = document.querySelectorAll(triggerselector);
		}

		if(triggerElements == null){
			console.warn("XtrTooltip, trigger id does not exist");
			return;
		}
		
		for(triggerElementIndex = 0; triggerElements.length > triggerElementIndex || exception; triggerElementIndex++){
			if(!exception)
				triggerElement = triggerElements[triggerElementIndex];
			exception = false;

			triggerElement.addEventListener("mouseover",function(event){

				xtrTooltip.innerHTML = HTML;

				boundingElement = this.getBoundingClientRect();
				boundingTooltip = xtrTooltip.getBoundingClientRect();
				if(direction == "right"){
					moveX = boundingElement.left - boundingTooltip.width - 10;
					moveY = boundingElement.top + (boundingElement.height - boundingTooltip.height)/2;
				}
				else if(direction == "left"){
					moveX = boundingElement.right + 10;
					moveY = boundingElement.top + (boundingElement.height - boundingTooltip.height)/2;
				}
				else if(direction == "top"){
					moveX = boundingElement.left + (boundingElement.width - boundingTooltip.width)/2;
					moveY = boundingElement.bottom + 10;
				}
				else if(direction == "bottom"){
					moveX = boundingElement.left + (boundingElement.width - boundingTooltip.width)/2;
					moveY = boundingElement.top - boundingTooltip.height - 10;
				}

				moveX += XtrGraficoUtil.isset(offset.x) ? offset.x : 0;
				moveY += XtrGraficoUtil.isset(offset.y) ? offset.y : 0;

				moveX += "px";
				moveY += "px";

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
}