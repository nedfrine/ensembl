# ensembl

Gene-Suggest API

A REST-like web service - The endpoint will accept the following arguments:

* query - the partial query typed by the user, e.g. `brc` (as in the example above)
* species - the name of the target species, e.g. `homo_sapiens`
* limit - the maximum number of suggestions to return, e.g. `10`

The endpoint will respond with a list of suggested gene names for the given query and target species.
This service will use the public website database "ensembl_website_90" as its data source.
