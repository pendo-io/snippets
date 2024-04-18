var pollWrapper=document.querySelector("[id^='pendo-radio-select-']");
var pollChildren=pollWrapper.children;
var childCount = pollChildren.length-1; 
var pollNewOrder=[];
for(var n=0;n<childCount;n++){
	var randomNumber = Math.floor(Math.random() * childCount);
	while(pollNewOrder.includes(randomNumber)){
        randomNumber = Math.floor(Math.random() * childCount);
        if(pollNewOrder.length==childCount){break}
	}
    pollNewOrder.push(randomNumber);
    console.log(pollNewOrder);    	
}

for(var i=0;i<pollNewOrder.length;i++){
  for(var j=0;j<pollNewOrder.length;j++){
    if(i==pollNewOrder[j]){
      pollWrapper.prepend(pollChildren[j]);
    }
  }
}
