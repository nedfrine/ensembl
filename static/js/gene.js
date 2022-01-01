$("#species").focus(function(){
	localStorage.clear();
});
// Bloodhound with Remote + Prefetch
var genes_suggestions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
  /*  prefetch: {
        //url:'v1/gene_suggest?species='+$('#species').val()+'&limit=' + $('#limit').val() + '&query='+ $('#query').val(),
        url: 'v1/gene_species?species='+ document.getElementById('species').value,
        transform: function (data) {          // we modify the prefetch response
            var newData = [];                 // here to match the response format
            for(var i =0; i < data['eqtls'].length;i++){
                newData.push({'name': data['eqtls'][i].label});
            }
	    //console.log(newData);
            return newData;
        }
    },*/
    remote: {
      //  url: 'v1/gene_suggest?species='+$('#species').val()+'&limit=' + $('#limit').val() + '&query='+ $('#query').val(),
        url: 'v1/gene_suggest?&query=%QUERY',
	cache : false,    
	replace: function(url, uriEncodedQuery) {
          val = $('#species').val();
          lim = $('#limit').val();
          if (!val) return url.replace("%QUERY",uriEncodedQuery);
          return url.replace("%QUERY",uriEncodedQuery) + '&species=' + encodeURIComponent(val) + '&limit=' + encodeURIComponent(lim)
        },    
        transform: function (data) {          // we modify the prefetch response
            var newData = [];                 // here to match the response format
            for(var i =0; i < data['eqtls'].length;i++){
                newData.push({'name': data['eqtls'][i].label});
            }
	    //console.log(newData);
            return newData;
        },
	wildcard: '%QUERY'    
    },                                        // the url option.
    identify: function (response) {
        return response.name;
    }	
});

// init Typeahead
$('#query').typeahead(
{
    minLength: 1,
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















