import os
import csv
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################
# Need to read color labels and breed labels

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pet_adoptions.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
#Colors = Base.classes.color_labels
#Breeds = Base.classes.breed_labels
Adoptions = Base.classes.train




breed_file= "static/data/breed_labels.csv"
breed_df= pd.read_csv(breed_file)



@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/Adoptions")
def Adoptions():
    """Return a list of sample adoptions."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Adoptions).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column adoptions (sample adoptions)
    return jsonify(list(df.columns)[2:])


@app.route("/colors/<sample>")
def Pet_Colors(sample):
    """Return the MetaData for a given sample."""
    sel = [
        Pet_Colors.ColorID,
        Pet_Colors.ColorName,
    ]

    results = db.session.query(*sel).filter(Pet_Colors.ColorName == Adoptions).all()

    # Create a dictionary entry for each row of pet adoption
    adopted_colors = {}
    for result in results:
        adopted_colors["black"] = result[0]
        adopted_colors["brown"] = result[1]
        adopted_colors["golden"] = result[2]
        adopted_colors["yellow"] = result[3]
        adopted_colors["cream"] = result[4]
        adopted_colors["gray"] = result[5]
        adopted_colors["white"] = result[6]

    print(adopted_breeds)
    return jsonify(sample_adopted_breeds)


@app.route("/breeds/<sample>")
def Pet_Breeds(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt = db.session.query(Adoptions).statement
    df = pd.read_sql_query(stmt, db.session.bind)


    return jsonify(data)


if __name__ == "__main__":
    app.run()
