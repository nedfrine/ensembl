/*$('input.typeahead').typeahead({
	    source:  function (query, process) {
	    			var spec = $('#species').val();
				var limit = $('#limit').val();
				var quer = $('#query').val();
		  	        var url = 'v1/gene_suggest?species='+spec + '&query=' + quer + '&limit=' + limit;
       				 return $.get(url, { query: query }, function (data) {
        				console.log(data);
        				//data = $.parseJSON(data);
						lst = []
					for( var x in data['eqtls']){
						console.log(x['label']);
						lst.push(x['label']);
					}
	            			return process(lst);
	        		});
	    	     }
	});
*/


// Bloodhound with Remote + Prefetch
var genes_suggestions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
        //url:'v1/gene_suggest?species='+$('#species').val()+'&limit=' + $('#limit').val() + '&query='+ $('#query').val(),
        url: 'v1/gene_species?species=ailuropoda_melanoleuca',
        transform: function (data) {          // we modify the prefetch response
            var newData = [];                 // here to match the response format
            for(var i =0; i < data['eqtls'].length;i++){
                newData.push({'name': data['eqtls'][i].label});
            }
	    console.log(newData);
            return newData;
        }
    },
    remote: {
      //  url: 'v1/gene_suggest?species='+$('#species').val()+'&limit=' + $('#limit').val() + '&query='+ $('#query').val(),
        url: 'v1/gene_suggest?species=ailuropoda_melanoleuca&limit=5&query=%QUERY',
	wildcard: '%QUERY'    
    },                                        // the url option.
    identify: function (response) {
	    console.log(response)
        return response.name;
    }	
});

// init Typeahead
$('#query').typeahead(
{
    minLength: 3,
    highlight: true
},
{
    name: 'genes',
    source: genes_suggestions,   // suggestion engine is passed as the source
    display: function(item) {        // display: 'name' will also work
        return item.name;
    },
    limit: 10,
    templates: {
        suggestion: function(item) {
            return '<a href="#" class="list-group-item">'+ item.name +'</a>';
        }
    }
});















