import { useState } from "react";
import axios from "axios";
function RegistrationForm() {
  const [formData, setFormData] = useState({
    userType: "",
    name: "",
    contactNo: "",
    email: "",
  });
  const [error, setError] = useState({
    userType: "",
    name: "",
    contactNo: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the error message when user starts typing again
    setError((prevError) => ({
      ...prevError,
      [name]: "", // Clear error message for the corresponding input field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      setError((prevError) => ({
        ...prevError,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    // Simple validation for contact number format
    if (formData.contactNo.length !== 10 || isNaN(formData.contactNo)) {
      setError((prevError) => ({
        ...prevError,
        contactNo: "Please enter a 10-digit contact number.",
      }));
      return;
    }
    try {
      const response = await axios.post("api/register");
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center bg-[#ffffff] p-20 h-auto">
      <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-2/3 max-w-[48rem] flex-row">
        <div className="relative w-1/2 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
          <img
            src="images/turf4.jpg"
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-6">
          <h4 className="block mb-4 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Register Now
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userType"
                className="block mb-1 font-sans text-sm font-semibold text-gray-700"
              >
                User Type
              </label>
              <select
                name="userType"
                id="userType"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="">Select User Type</option>
                <option value="turfOwner">Turf Owner</option>
                <option value="academyOwner">Academy Owner</option>
                <option value="competitionOrganizer">
                  Competition Organizer
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-1 font-sans text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactNo"
                className="block mb-1 font-sans text-sm font-semibold text-gray-700"
              >
                Contact No
              </label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.contactNo}
                onChange={handleChange}
              />
            </div>
            <div>{error.contactNo}</div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-1 font-sans text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>{error.email}</div>
            {/*  <div className="mb-4">
              <label
                htmlFor="message"
                className="block mb-1 font-sans text-sm font-semibold text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.message}
                onChange={handleChange}
              />
            </div> */}
            <button
              type="submit"
              className="block w-full px-6 py-3 font-sans text-sm font-bold text-white bg-[#E9522C]  rounded-md hover:bg-[#228B22]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
