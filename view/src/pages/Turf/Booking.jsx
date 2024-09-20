const Book = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center">
          <img
            src="images/turf1.webp"
            className="w-3/4  lg:w-half rounded-md shadow-md static"
            alt="Turf"
          />
        </div>
        {/* Right Section */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4 items-center">Box Park</h1>
          <p className="text-lg mb-4 items-center">
            Location :- Box park turf, Shri Hari Narayan Kute Marg, opp. Sandeep
            hotel, Mumbai Naka, Matoshree Nagar, Nashik, Maharashtra 422002{" "}
            <a
              href="https://www.google.com/maps/dir//Box+park+turf,+Shri+Hari+Narayan+Kute+Marg,+opp.+Sandeep+hotel,+Mumbai+Naka,+Matoshree+Nagar,+Nashik,+Maharashtra+422002/@19.9918944,73.7811249,17.21z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3bddebc37fc85c43:0xb5bbc837c2e043f2!2m2!1d73.7818851!2d19.9901299!3e0?entry=ttu"
              className="text-blue-500"
            >
              🗺️Location
            </a>
            <br />
            <span className="items-center">Surfaces :- 2</span>
            <br />
            Sports: Cricket, Football
            <br />
            Phone: 090116 11119
            <br />
            Hours: 6:00 AM - 12:00 AM
          </p>
          +
          <form action="submit" className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg">
                Name :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="timeslot" className="text-lg">
                Time Slot:
              </label>
              <select
                name="timeslot"
                id="timeslot"
                required
                className="border border-gray-300 p-2 rounded-md"
              >
                <option value="" disabled selected>
                  Select a time slot
                </option>
                <option value="slot1">Slot 1 (8:00 AM - 10:00 AM)</option>
                <option value="slot2">Slot 2 (10:00 AM - 12:00 PM)</option>
                <option value="slot3">Slot 3 (12:00 PM - 2:00 PM)</option>
                <option value="slot4">Slot 4 (2:00 PM - 4:00 PM)</option>
                <option value="slot5">Slot 5 (4:00 PM - 6:00 PM)</option>
                {/* Add more options for available time slots */}
              </select>
            </div>
            <div className="text-lg">Advance Booking Charges: 250 rs</div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-lg">
                Date of Booking:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
