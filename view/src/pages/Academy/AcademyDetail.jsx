import { useEffect, useState } from "react";

const AcademyDetail = () => {
  const [academy, setAcademy] = useState(null);

  useEffect(() => {
    // Fetch the academy details from the API
    fetch("/api/v1/acad/66ed96b4af15ea9a8cb1a13d")
      .then((response) => response.json())
      .then((data) => setAcademy(data.data.data))
      .catch((error) =>
        console.error("Error fetching academy details:", error)
      );
  }, []);

  if (!academy) {
    return <div>Loading academy details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Academy Cover Image */}
      <div className="mb-6">
        <img
          src={academy.imageCover}
          alt={academy.name}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Academy Name and Description */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{academy.name}</h1>
        <p className="text-lg text-gray-700">{academy.description}</p>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Location</h2>
        <p className="text-gray-600">{academy.Location.description}</p>
        <p className="text-gray-600">Address: {academy.Location.address}</p>
        <a
          href={academy.googlelocation}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on Google Maps
        </a>
      </div>

      {/* Sports Offered */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Sports Offered</h2>
        <ul className="list-disc list-inside">
          {academy.sports.map((sport, index) => (
            <li key={index} className="text-gray-700">
              {sport}
            </li>
          ))}
        </ul>
      </div>

      {/* Academy Pricing */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Price</h2>
        <p className="text-gray-700">Price: ${academy.price}</p>
      </div>

      {/* Coaches */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Coaches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {academy.coaches.map((coach) => (
            <div key={coach._id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold mb-2">{coach.name}</h3>
              <p className="text-gray-700">{coach.sport}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Images */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {academy.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
        <p className="text-gray-700">Phone Number: {academy.PhoneNumber}</p>
      </div>
    </div>
  );
};

export default AcademyDetail;
