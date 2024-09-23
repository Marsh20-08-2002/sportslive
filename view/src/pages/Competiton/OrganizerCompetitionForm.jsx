// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import axios from "axios";

// const CreateCompetition = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     PhoneNumber: "",
//     sports: "",
//     price: "",
//     description: "",
//     imageCover: null,
//     coordinates: {
//       lat: "",
//       lng: "",
//     },
//     address: "",
//     locationDescription: "",
//     googlelocation: "",
//     date: "",
//     time: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCoordinatesChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       coordinates: { ...formData.coordinates, [name]: value },
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, imageCover: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("PhoneNumber", formData.PhoneNumber);
//     formDataToSend.append("sports", formData.sports);
//     formDataToSend.append("price", formData.price);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("imageCover", formData.imageCover);
//     formDataToSend.append("Location[coordinates][0]", formData.coordinates.lat);
//     formDataToSend.append("Location[coordinates][1]", formData.coordinates.lng);
//     formDataToSend.append("Location[address]", formData.address);
//     formDataToSend.append(
//       "Location[description]",
//       formData.locationDescription
//     );
//     formDataToSend.append("googlelocation", formData.googlelocation);
//     formDataToSend.append("date", formData.date);
//     formDataToSend.append("time", formData.time);

//     try {
//       const response = await axios.post(
//         "api/v1/comp/competitions",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Competition created successfully:", response.data);
//     } catch (error) {
//       console.error("Error creating competition:", error);
//     }
//   };

//   return (
//     <div className="create-competition">
//       <h2>Create a New Competition</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             name="PhoneNumber"
//             value={formData.PhoneNumber}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Sports:</label>
//           <input
//             type="text"
//             name="sports"
//             value={formData.sports}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//         <div>
//           <label>Image Cover:</label>
//           <input type="file" name="imageCover" onChange={handleImageChange} />
//         </div>
//         <div>
//           <label>Coordinates (Latitude):</label>
//           <input
//             type="text"
//             name="lat"
//             value={formData.coordinates.lat}
//             onChange={handleCoordinatesChange}
//           />
//         </div>
//         <div>
//           <label>Coordinates (Longitude):</label>
//           <input
//             type="text"
//             name="lng"
//             value={formData.coordinates.lng}
//             onChange={handleCoordinatesChange}
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Location Description:</label>
//           <input
//             type="text"
//             name="locationDescription"
//             value={formData.locationDescription}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Google Location URL:</label>
//           <input
//             type="text"
//             name="googlelocation"
//             value={formData.googlelocation}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Time:</label>
//           <input
//             type="time"
//             name="time"
//             value={formData.time}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Create Competition</button>
//       </form>
//     </div>
//   );
// };

// export default CreateCompetition;
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const CreateCompetition = () => {
  const [formData, setFormData] = useState({
    name: "",
    PhoneNumber: "",
    sports: "",
    price: "",
    description: "",
    imageCover: null,
    coordinates: {
      lat: "",
      lng: "",
    },
    address: "",
    locationDescription: "",
    googlelocation: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      coordinates: { ...formData.coordinates, [name]: value },
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageCover: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("PhoneNumber", formData.PhoneNumber);
    formDataToSend.append("sports", formData.sports);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("imageCover", formData.imageCover);
    formDataToSend.append("Location[coordinates][0]", formData.coordinates.lat);
    formDataToSend.append("Location[coordinates][1]", formData.coordinates.lng);
    formDataToSend.append("Location[address]", formData.address);
    formDataToSend.append(
      "Location[description]",
      formData.locationDescription
    );
    formDataToSend.append("googlelocation", formData.googlelocation);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);

    try {
      const response = await axios.post(
        "api/v1/comp/competitions",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Competition created successfully:", response.data);

      // Redirect on successful API call
      navigate("/competition");
    } catch (error) {
      console.error("Error creating competition:", error);

      // Show error popup
      alert("Error creating competition: " + error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center mb-8">
          Create a New Competition
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Competition Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter competition name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Phone Number</label>
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter contact number"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Sports</label>
            <input
              type="text"
              name="sports"
              value={formData.sports}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter sports name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter a brief description"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Image Cover</label>
            <input
              type="file"
              name="imageCover"
              onChange={handleImageChange}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-lg font-semibold">
                Coordinates (Longitude)
              </label>
              <input
                type="text"
                name="lat"
                value={formData.coordinates.lat}
                onChange={handleCoordinatesChange}
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Longitude"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold">
                Coordinates (Latitude)
              </label>
              <input
                type="text"
                name="lng"
                value={formData.coordinates.lng}
                onChange={handleCoordinatesChange}
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Latitude"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter address"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">
              Location Description
            </label>
            <input
              type="text"
              name="locationDescription"
              value={formData.locationDescription}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter location description"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Google Location URL</label>
            <input
              type="text"
              name="googlelocation"
              value={formData.googlelocation}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Paste Google Maps URL"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Create Competition
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompetition;
