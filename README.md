# Pet Adoption

Team BAM: Lillian Bolfer, Andrew Michael Machata, Robbie Phillips

This project will draw upon and extend an existing data science project posted on Kaggle
https://www.kaggle.com/c/petfinder-adoption-prediction/data

Using the same dataset, our team plans to provide an API and server (via Flask or Heroku - Rob) 
which will allow pet adoption data to be retieved from an SQLlite file (Lillian), be sorted by pet 
characteristics (i.e. breed, color), and plot the results on a map of Malaysia.

- Lillian extracts data from CSV files and populates tables in an SQLlite file
- Mike extract the postcode data from the CSV file and store coordinate data for the 15 postcodes via Geocode API
- Rob retrieves the data from the SQLlite file, sort by Javascript dropbox and display on a page

In order to do this, we will need to extract the postcode and utilize a geocode API (Mike) to
retrieve the coordinates to plot on a mapbox map using Leaflet. 
Our API will also provide the use of a dropdown list (for color) or a search text box 
(for breed) to sort the data by at least three criteria and provide a simple plot of the 
search results using CanvasJS.

This set of interactive visualizations will tell a story about Pet Adoption in Malaysia, 
supported by a 10 minute presentation.

Search dropdown / text box - Rob

Mapbox plot - Mike

Presentation - Lillian

1) Adoptions per postcode mapped (by criteria) - hover for total data (number by breeds and adoptions)
2) Postcode bubble chart  / bar graph - colors (Lillian), breeds (Mike), adoption rate (Rob) 

Three pages to tell the story, each linked with an arrow button to advance to the next interactive
visualization. The story will reveal where the most popular breeds and colors are adopted the quickest across Malaysia. 

As an animal fostering agency, we require The Pet Adoption service to identify the best locations in Malaysia 
that will ensure quick adoption, depending on its breed and color.
