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
@app.route("/petAdoption.html")
def petAdoption():
    """Return the homepage."""
    return render_template("petAdoption.html")

@app.route("/metadata/<attribute>,<sample>")
def sample_metadata(attribute, sample):
    """Return the MetaData for a given sample."""
    if (attribute == "Age"): return jsonify(attribute, 255, sample)
    if (attribute == "Breed1"): return jsonify(attribute, str(len(breed_df)), sample)
    if (attribute == "Breed2"): return jsonify(attribute, str(len(breed_df)), sample)
    if (attribute == "Gender"): return jsonify(attribute, 2, sample)
    if (attribute == "Color1"): return jsonify(attribute, str(len(color_df)), sample)
    if (attribute == "Color2"): return jsonify(attribute, str(len(color_df)), sample)
    if (attribute == "Color3"): return jsonify(attribute, str(len(color_df)), sample)
    if (attribute == "MaturitySize"): return jsonify(attribute, 4, sample)
    if (attribute == "FurLength"): return jsonify(attribute, 3, sample)
    if (attribute == "Vaccinated"): return jsonify(attribute, 3, sample)
    if (attribute == "Dewormed"): return jsonify(attribute, 3, sample)
    if (attribute == "Sterilized"): return jsonify(attribute, 3, sample)
    if (attribute == "Health"): return jsonify(attribute, 3, sample)
    if (attribute == "Quantity"): return jsonify(attribute, 20, sample)    
    if (attribute == "Fee"): return jsonify(attribute, 3000, sample)
    if (attribute == "State"): return jsonify(attribute, 95, sample)
    if (attribute == "RescuerID"): return jsonify(attribute, str(len(train_df)), sample)    
    if (attribute == "VideoAmt"): return jsonify(attribute, 8, sample)
    if (attribute == "Description"): return jsonify(attribute, str(len(train_df)), sample)
    if (attribute == "PetID"): return jsonify(attribute, str(len(train_df)), sample)
    if (attribute == "PhotoAmt"): return jsonify(attribute, 30, sample)
    if (attribute == "AdoptionSpeed"): return jsonify(attribute, 4, sample)



@app.route("/api/v1.0/Adoptions")
def Adoptions():
    """Return a list of adoption metadata."""

    # Return a list of the column adoptions 
    return jsonify(list(train_df.columns)[2:])

@app.route("/api/v1.0/Research")
def Research():
    """Return the research render_template"""

    return render_template("__results__.html")

@app.route("/api/v1.0")
def API():
    """Return API details."""

    return render_template("APIv1.0.html")

@app.route("/api/v1.0/Postcodes")
def Pet_Postcodes():

    try:
       result = engine.execute("SELECT StateID, StateName from state_labels")
    except:
        print_error(f":: Could not connect!")
    return jsonify("Pet States:", str(len(postcode_df.StateID)), list(postcode_df.StateName), list(postcode_df.LatLong))
    
@app.route("/api/v1.0/postcode/<sample>")
def Pet_Postcode(sample):
    """Return the MetaData for a given sample."""

    pet_state = str(int(sample) - 1) + ' < StateID < ' + str(int(sample) + 1)

    try:
        result = engine.execute("SELECT StateName from state_labels where StateID = " + str(sample))
    except:
        print_error(f":: Could not connect!")
    return jsonify("Pet State:", list(postcode_df.query(pet_state).StateID), list(postcode_df.query(pet_state).StateName), list(postcode_df.query(pet_state).LatLong))

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
