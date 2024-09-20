import { useState } from "react";

function TournamentForm() {
  const [formData, setFormData] = useState({
    id: 1,
    competitionName: "",
    location: "",
    sports: [""],
    description: "",
    competitionType: "",
    contactNo: "",
    organizers: [
      { name: "", phone: "" },
      { name: "", phone: "" },
    ],
    posterImage: "",
    registrationDate: "",
    registrationFees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Competition Name:
        <input
          type="text"
          name="competitionName"
          value={formData.competitionName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Sports:
        <input
          type="text"
          name="sports"
          value={formData.sports}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Competition Type:
        <input
          type="text"
          name="competitionType"
          value={formData.competitionType}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Contact No:
        <input
          type="text"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Organizers:
        <input
          type="text"
          name="organizers"
          value={formData.organizers.map((org) => org.name)}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Poster Image:
        <input
          type="text"
          name="posterImage"
          value={formData.posterImage}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Registration Date:
        <input
          type="text"
          name="registrationDate"
          value={formData.registrationDate}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Registration Fees:
        <input
          type="text"
          name="registrationFees"
          value={formData.registrationFees}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TournamentForm;
