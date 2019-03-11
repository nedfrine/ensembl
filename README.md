# ensembl

Gene-Suggest API

A REST-like web service - The "/v1/gene_suggest "endpoint will accept the following arguments:

* query - the partial query typed by the user, e.g. `brc` 
* species - the name of the target species, e.g. `homo_sapiens`
* limit - the maximum number of suggestions to return, e.g. `10`

The endpoint will respond with a list of suggested gene names for the given query and target species.
This service will use the public website database "ensembl_website_90" as its data source.

Steps to start the App

1) pip install flask_sqlalchemy
2) pip install Flask
3) sudo apt install libmysqlclient-dev
4) pip install mysqlclient==1.4.1
5) git clone https://github.com/nedfrine/ensembl.git
6) cd ensembl 
7) git pull https://github.com/nedfrine/ensembl.git develop
8) python app.py

After the app is started, it can be tested either using the Browser or using CURL from the command line.
A demo of typeahead using the same API, can be tested by opening http://server-name:5000

No authentication has been set up for now, and there should be better security implementations, before moving to production.