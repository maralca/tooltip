function XtrTooltip(id,direction){
	var tooltip;
	var direcao;

	id = id || "xtrTooltip";
	direcao = direction || "direita"

	tooltip = document.getElementById(id);
	if(tooltip == null){
		tooltip = document.createElement("div");
		tooltip.setAttribute("id",id);
		tooltip.setAttribute("class","xtr tooltip "+direcao);
		document.body.appendChild(tooltip);
		tooltip.direction = direcao;
	}

	tooltip.addTrigger = addTrigger;

	return tooltip;

	function moverTooltipDe(element){
		var boundingElement;
		var boundingTooltip;

		var moveX;
		var moveY;

		var offsetX;
		var offsetY;

		offsetX = element.tooltip[id].offsetX;
		offsetY = element.tooltip[id].offsetY;

		boundingElement = element.getBoundingClientRect();
		boundingTooltip = tooltip.getBoundingClientRect();


		if(direcao.indexOf("direita") >= 0){
			moveX = boundingElement.left - boundingTooltip.width - 10;
			moveY = boundingElement.top + (boundingElement.height - boundingTooltip.height)/2 + document.body.scrollTop;
		}
		else if(direcao.indexOf("esquerda") >= 0){
			moveX = boundingElement.right + 10;
			moveY = boundingElement.top + (boundingElement.height - boundingTooltip.height)/2 + document.body.scrollTop;
		}
		else if(direcao.indexOf("cima") >= 0){
			moveX = boundingElement.left + (boundingElement.width - boundingTooltip.width)/2;
			moveY = boundingElement.bottom + 10 + document.body.scrollTop;
		}
		else if(direcao.indexOf("baixo") >= 0){
			moveX = boundingElement.left + (boundingElement.width - boundingTooltip.width)/2;
			moveY = boundingElement.top - boundingTooltip.height - 10 + document.body.scrollTop;
		}

		moveX += offsetX || 0;
		moveY += offsetY || 0;

		moveX += "px";
		moveY += "px";

		tooltip.style.setProperty("left",moveX,"important");
		tooltip.style.setProperty("top",moveY,"important");
	}
	function removerTooltip(){
		tooltip.style = "";
	}

	function escreverTooltipDe(element){
		var conteudo;

		conteudo = element.tooltip[id].content;

		tooltip.innerHTML = conteudo;
	}
	function apagarTooltip(){
		tooltip.innerHTML = "";
	}

	function mostrarTooltip(){
		tooltip.className += " mostrar";
	}
	function esconderTooltip(){	
		XtrGraficoUtil.removeClass(tooltip,"mostrar");
	}
	function gatilhoMostrar(element){
		var evento;

		evento = element.tooltip[id].showOn;

		element.addEventListener(evento,function(){
			escreverTooltipDe(this);
			mostrarTooltip();
			moverTooltipDe(this);
		});
	}
	function gatilhoEsconder(element){
		var evento;

		evento = element.tooltip[id].hideOn;

		element.addEventListener(evento,function(){
			removerTooltip();
			esconderTooltip();
			apagarTooltip();
		});
	}

	function addTrigger(triggerSelector,triggerObject){
		var triggerElement;

		var conteudo;
		var offset;
		var eventoMostrar;
		var eventoEsconder;

		var moveX,moveY;

		var boundingElement,boundingTooltip;

		conteudo = triggerObject.content || triggerObject;

		triggerObject.offset = XtrGraficoUtil.isset(triggerObject.offset) ? triggerObject.offset : 0;

		offsetY = triggerObject.offset.y || triggerObject.offset || 0;
		offsetX = triggerObject.offset.x || triggerObject.offset || 0;

		triggerElements = XtrGraficoUtil.toNodes(triggerSelector);

		eventoMostrar  = triggerObject.show || triggerObject.showOn || triggerObject.showEvent || "mouseover";
		eventoEsconder = triggerObject.hide || triggerObject.hideOn || triggerObject.hideEvent || "mouseout";

		if(triggerElements.length == 0){
			console.warn("XtrTooltip, trigger id does not exist");
			return;
		};
		for(triggerElementIndex = 0; triggerElements.length > triggerElementIndex; triggerElementIndex++){	
			triggerElement = triggerElements[triggerElementIndex];
			if(!XtrGraficoUtil.isobj(triggerElement.tooltip)){
				triggerElement.tooltip = {};
			}

			triggerElement.tooltip[id] = {
				offsetX: offsetX,
				offsetY: offsetY,
				hideOn: eventoEsconder,
				showOn: eventoMostrar,
				content: conteudo
			};
			
			gatilhoMostrar(triggerElement);
			gatilhoEsconder(triggerElement);
		}
	}
}