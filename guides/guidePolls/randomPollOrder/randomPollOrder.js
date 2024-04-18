const pollWrapper=document.querySelector("[id^='pendo-radio-select-']");
const pollChildren=pollWrapper.children;
const childCount = pollChildren.length-1; 
const pollNewOrder=[];
for(let n=0;n<childCount;n++){
	let randomNumber = Math.floor(Math.random() * childCount);
	while(pollNewOrder.includes(randomNumber)){
        randomNumber = Math.floor(Math.random() * childCount);
        if(pollNewOrder.length==childCount){break}
	}
    pollNewOrder.push(randomNumber);
    console.log(pollNewOrder);    	
}

for(let i=0;i<pollNewOrder.length;i++){
  for(let j=0;j<pollNewOrder.length;j++){
    if(i==pollNewOrder[j]){
      pollWrapper.prepend(pollChildren[j]);
    }
  }
}
