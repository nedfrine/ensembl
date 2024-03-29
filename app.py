import flask
import json
import os
from flask import render_template
from flask import request
from flask import Response
from sqlalchemy import and_

from flask_sqlalchemy import SQLAlchemy

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "mysql://anonymous:@193.62.193.10/ensembl_website_90"



app = flask.Flask(__name__)
app.config["DEBUG"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)

@app.route('/', methods=['GET','POST'])
def home():
    return render_template("form.html")

@app.route('/v1/gene_suggest', methods=['GET','POST'])
def gene_suggest():
    in_species = request.args.get('species')
    partial = request.args.get('query')
    in_limit = request.args.get('limit') or 10
    if(in_species == '' or partial == '' or in_limit == ''):
        raise InvalidUsage('Values missing', status_code=410)
    match_string = partial + '%'
    gene = gene_autocomplete.query.filter(and_(gene_autocomplete.species == in_species,gene_autocomplete.display_label.like(match_string))).limit(in_limit).all()
    return flask.jsonify(eqtls=[e.serialize() for e in gene]) 


@app.route('/v1/gene_species', methods=['GET','POST'])
def gene_species():
    in_species = request.args.get('species')
    gene_spec = gene_autocomplete.query.filter(gene_autocomplete.species == in_species).all()
    return flask.jsonify(eqtls=[e.serialize() for e in gene_spec])

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = flask.jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

class gene_autocomplete(db.Model):
    display_label = db.Column(db.String(128), unique=False, nullable=True, primary_key=False)
    species = db.Column(db.String(255), unique=False, nullable=True, primary_key=False)
    stable_id = db.Column(db.String(128), unique=True, nullable=False, primary_key=True)
    location = db.Column(db.String(60), unique=False, nullable=True, primary_key=False)

    def __repr__(self):
        #return self.display_label
        return {
            'label': self.display_label,
            'species': self.species,
            'stable_id': self.stable_id
        }

    def serialize(self):
        return {
            'label': self.display_label,
            'species': self.species,
            'stable_id': self.stable_id
        }
    def __iter__(self):
        return self.to_dict().iteritems()

app.run(host= '0.0.0.0')
