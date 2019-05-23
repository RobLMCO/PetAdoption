import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Table, Column, String, create_engine, MetaData
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import logging

app = Flask(__name__)


#################################################
# Database Setup
#################################################

breed_file= "static/data/breed_labels.csv"
breed_df= pd.read_csv(breed_file)

color_file= "static/data/color_labels.csv"
color_df= pd.read_csv(color_file)

train_file= "static/data/train.csv"
train_df= pd.read_csv(train_file)

postcode_file= "static/data/geocoded_state_labels.csv"
postcode_df= pd.read_csv(postcode_file)


logging.basicConfig(level=logging.INFO)
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)
engine = create_engine("sqlite:///pet_adoptions.sqlite", echo=False)

#breed_df.to_sql(name='breed_labels', con=engine, if_exists='append', index=True)
#color_df.to_sql(name='color_labels', con=engine, if_exists='append', index=True)
#train_df.to_sql(name='train', con=engine, if_exists='append', index=True)
#postcode_df.to_sql(name='state_labels', con=engine, if_exists='append', index=True)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/metadata/<attribute>,<sample>")
def sample_metadata(attribute, sample):
    """Return the MetaData for a given sample."""
    if (attribute == "Age"): return jsonify(attribute, sample, 255)
    if (attribute == "Breed1"): return jsonify(attribute, sample, str(len(breed_df)))
    if (attribute == "Breed2"): return jsonify(attribute, sample, str(len(breed_df)))
    if (attribute == "Gender"): return jsonify(attribute, sample, 2)
    if (attribute == "Color1"): return jsonify(attribute, sample, str(len(color_df)))
    if (attribute == "Color2"): return jsonify(attribute, sample, str(len(color_df)))
    if (attribute == "Color3"): return jsonify(attribute, sample, str(len(color_df)))
    if (attribute == "MaturitySize"): return jsonify(attribute, sample, 4)
    if (attribute == "FurLength"): return jsonify(attribute, sample, 3)
    if (attribute == "Vaccinated"): return jsonify(attribute, sample, 3)
    if (attribute == "Dewormed"): return jsonify(attribute, sample, 3)
    if (attribute == "Sterilized"): return jsonify(attribute, sample, 3)
    if (attribute == "Health"): return jsonify(attribute, sample, 3)
    if (attribute == "Quantity"): return jsonify(attribute, sample, 20)    
    if (attribute == "Fee"): return jsonify(attribute, sample, 3000)
    if (attribute == "State"): return jsonify(attribute, sample, 41415)
    if (attribute == "RescuerID"): return jsonify(attribute, sample, str(len(train_df)))    
    if (attribute == "VideoAmt"): return jsonify(attribute, sample, 8)
    if (attribute == "Description"): return jsonify(attribute, sample, str(len(train_df)))
    if (attribute == "PetID"): return jsonify(attribute, sample, str(len(train_df)))
    if (attribute == "PhotoAmt"): return jsonify(attribute, sample, 30)
    if (attribute == "AdoptionSpeed"): return jsonify(attribute, sample, 4)



@app.route("/Adoptions")
def Adoptions():
    """Return a list of adoption metadata."""

    # Return a list of the column adoptions 
    return jsonify(list(train_df.columns)[2:])

@app.route("/api/v1.0/Colors")
def Pet_Colors():

    try:
       result = engine.execute("SELECT ColorID, ColorName from color_labels")
    except:
        print_error(f":: Could not connect!")
    return jsonify("Pet Colors:", str(len(color_df.ColorID)), list(color_df.ColorName))
    
@app.route("/api/v1.0/color/<sample>")
def Pet_Color(sample):
    """Return the MetaData for a given sample."""

    pet_color = str(int(sample) - 1) + ' < ColorID < ' + str(int(sample) + 1)

    try:
        result = engine.execute("SELECT ColorName from color_labels where ColorID = " + str(sample))
    except:
        print_error(f":: Could not connect!")
    return jsonify("Pet Color:", list(color_df.query(pet_color).ColorID), list(color_df.query(pet_color).ColorName))

@app.route("/api/v1.0/Breeds")
def Pet_Breeds():
    dog_breed = 'Type < ' + str(2)
    cat_breed = 'Type > ' + str(1)

    try:
       result = engine.execute("SELECT BreedID, BreedName from breed_labels")
    except:
        print_error(f":: Could not connect!")
    return jsonify("Dog Breeds:", str(len(breed_df.BreedID)), list(breed_df.query(dog_breed).BreedID), list(breed_df.query(dog_breed).BreedName),
    "Cat Breeds:", list(breed_df.query(cat_breed).BreedID), list(breed_df.query(cat_breed).BreedName))


@app.route("/api/v1.0/breed/<sample>")
def Pet_Breed(sample):
   
    pet_breed = str(int(sample) - 1) + ' < BreedID < ' + str(int(sample) + 1)

    try:
       result = engine.execute("SELECT BreedName from breed_labels where BreedID = " + str(sample))
    except:
        print_error(f":: Could not connect!")
    return jsonify("Pet Breed:", list(breed_df.query(pet_breed).BreedID), list(breed_df.query(pet_breed).BreedName))



if __name__ == "__main__":
    app.run()
