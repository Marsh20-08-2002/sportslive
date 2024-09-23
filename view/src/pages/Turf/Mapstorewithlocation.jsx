/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars
// import React, { useRef, useEffect } from "react";
// import * as maptilersdk from "@maptiler/sdk";
// import "@maptiler/sdk/dist/maptiler-sdk.css";

// const MapWithStoreLocations = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);

//   // Static store location
//   const storeLocations = [
//     {
//       name: "Static Store Location",
//       locations: {
//         coordinates: [73.678384, 19.957774], // Static coordinates (lng, lat)
//       },
//     },
//   ];

//   useEffect(() => {
//     maptilersdk.config.apiKey = "DrLHBz4sGQJTXNNCWdc3";

//     if (!map.current && storeLocations && storeLocations.length > 0) {
//       map.current = new maptilersdk.Map({
//         container: mapContainer.current,
//         style: maptilersdk.MapStyle.STREETS,
//         center: storeLocations[0].locations.coordinates, // Centering on the static location
//         zoom: 8,
//       });

//       // Add a marker for the static store location
//       storeLocations.forEach((location) => {
//         const { coordinates } = location.locations;
//         const name = location.name;
//         const marker = new maptilersdk.Marker({ color: "#DD5746" })
//           .setLngLat(coordinates)
//           .setPopup(new maptilersdk.Popup().setHTML(name))
//           .addTo(map.current);

//         marker.getElement().addEventListener("mouseover", () => {
//           marker.togglePopup();
//         });

//         marker.getElement().addEventListener("mouseout", () => {
//           marker.togglePopup();
//         });
//       });
//     }
//   }, [storeLocations]);

//   return (
//     <div
//       ref={mapContainer}
//       style={{
//         height: "500px",
//         width: "80%",
//         marginLeft: "auto",
//         marginRight: "auto",
//       }}
//     />
//   );
// };

// export default MapWithStoreLocations;
import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapWithStoreLocations = ({ storeLocations }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Maptiler API key configuration
    maptilersdk.config.apiKey = "DrLHBz4sGQJTXNNCWdc3";

    // Ensure there are store locations with valid coordinates
    if (
      !map.current &&
      storeLocations.length > 0 &&
      storeLocations[0].locations.coordinates
    ) {
      const [lng, lat] = storeLocations[0].locations.coordinates;

      // Initialize the map
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 8,
      });

      // Add markers for each store location
      storeLocations.forEach((location) => {
        const { coordinates } = location.locations;
        const name = location.name;

        // Check if coordinates are valid
        if (coordinates && coordinates.length === 2) {
          const marker = new maptilersdk.Marker({ color: "#DD5746" })
            .setLngLat(coordinates)
            .setPopup(new maptilersdk.Popup().setHTML(`<h3>${name}</h3>`))
            .addTo(map.current);

          // Toggle popup on mouseover and mouseout
          const markerElement = marker.getElement();
          markerElement.addEventListener("mouseover", () =>
            marker.togglePopup()
          );
          markerElement.addEventListener("mouseout", () =>
            marker.togglePopup()
          );
        }
      });
    }
  }, [storeLocations]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "500px",
        width: "80%",
        margin: "0 auto",
      }}
    />
  );
};

export default MapWithStoreLocations;
