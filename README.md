# Crown Castle Case Study

## by Alan Hong

### Technologies Used:

- React
- Redux
- Mapbox-GL
- Material UI (4.10.0)
- Immer
- Lodash
- Redux-Saga

First of all, thank you so much to Crown Castle for the opportunity to create this project! I learned a lot while creating and working on this project! Let me outline some of the features of this small web app.

Using the technologies listed above, I paired a CSV I found that contained COVID-19 data. The CSV came from the same data source that the famous John Hopkins visualization came from. (https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6)

Reading up on Mapbox-GL documentation, I had to supply a geojson file. I also found an existing geojson file that contained the shapes of the US States. But I wanted to append the COVID data to this geojson file, so I wrote a small script to do just that. It's in the `scripts` folder inside `src`.

Now that I had the data I needed, I uploaded what I had to Mapbox Studio. Using their web app, I created a "style" that I could import using their SDK into React. Allowing their code to do most of the heavy lifting of rendering the map and data.

The code I wrote in the `Map` component consists of showing various layers that are already embedded in the "style" that I added via Mapbox Studio. And also leveraging their SDK to show tooltips/popup info boxes on the map itself.

For such a small web app, Redux and Sagas is probably overkill but I wanted to show case its usage and my knowledge of how to integrate it into a React project. Plus, if the web app ever needs to expand, it can be easily done now that Redux and Sagas is already in the project.
