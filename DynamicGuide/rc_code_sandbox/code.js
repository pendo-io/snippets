(function _initGuide(){
    
    let input = document.getElementById("searchBox");
    input.onkeyup = _search;
    
    _getGlossaryContent();
    
    function _search(){
      let input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("searchBox");
      table = document.getElementById("glossaryTable");
      tr = table.getElementsByTagName("tr");
      
        filter = input.value.toUpperCase();
             
        for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        
            if (td) {
          	txtValue = td.textContent || td.innerText;
          
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
            
                    tr[i].style.display = "";

                } else {

                    tr[i].style.display = "none";
          
                }
            } 
    
        }
    }
    
    /**
     * _getGlossaryContent
     * Pulls data 
     */
    function _getGlossaryContent() {
        let token = 'CONTENTUFL_AUTH_TOKEN';
        let spaceId = 'CONTENTFUL_SPACE_ID';
		let query = 'https://cdn.contentful.com/spaces/' + spaceId + '/environments/master/entries?access_token=' + token + '&order=fields.title&content_type=YOUR_CONTENT_TYPE';
		
        let xhttp = new XMLHttpRequest(); 
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
                
                result = JSON.parse(this.responseText);
				_generateTable(result.items);
			}
		};
		xhttp.open("GET", query, true);
		xhttp.send();
	}
    
    /**
     * _generateTable
     * Takes an array of content entries and builds out the glossary table
     * @param {Array} items 
     */
    function _generateTable(items) {

        let table = document.getElementById("glossaryTable");
        
        for (let item of items) {
            
            let row = table.insertRow();
            let tableCell = row.insertCell();
            let anchor = document.createElement("a");
            let text = document.createTextNode(item.fields.title)
            
            anchor.appendChild(text);
            anchor.onclick = (e) => {

                // Use the window object to hold the content id that the guide will needs to pull the content,
                // then launch the dynamic guide
                window.ppContentGuideKey = item.sys.id;
                pendo.showGuideById('PENDO_GUIDE ID');

            };
            
            tableCell.appendChild(anchor);
 				
        }
		
    }

})()
