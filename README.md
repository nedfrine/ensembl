# ensembl

Gene-Suggest API

A REST-like web service - The "/v1/gene_suggest "endpoint will accept the following arguments:

* query - the partial query typed by the user, e.g. `brc` 
* species - the name of the target species, e.g. `homo_sapiens`
* limit - the maximum number of suggestions to return, e.g. `10`

The endpoint will respond with a list of suggested gene names for the given query and target species.
This service will use the public website database "ensembl_website_90" as its data source.

Steps to start the App

> pip install flask_sqlalchemy
> pip install Flask
> sudo apt install libmysqlclient-dev
> pip install mysqlclient==1.4.1
> git clone https://github.com/nedfrine/ensembl.git
> cd ensembl 
> git pull https://github.com/nedfrine/ensembl.git develop
> python app.py

 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)


After the app is started, it can be tested either using the Browser or using CURL from the command line.
A demo of typeahead using the same API, can be tested by opening http://<server-name>:5000

No authentication has been set up for now, and there should be better security implementations, before moving to production.