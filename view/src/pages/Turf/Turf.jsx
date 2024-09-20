/* eslint-disable react/no-unescaped-entities */
import turfs from "../../Data/Turfs";
import { Link } from "react-router-dom";
import MapWithStoreLocation from "./Mapstorewithlocation";
function Turf() {
  return (
    <>
      {/* <div className="w-full bg-[#e7f9e7] py-32 p-4">
        <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0">
          <div className="py-4">
            <h1 className="py-3 text-3xl font-bold">
              Most Popular <span className="text-[#228B22]">Acadmey </span>
            </h1>
            <p className="text-[#6D737A]">
              Explore a world of athletic prowess and excellence as we showcase
              the finest sports academies. Whether youre an aspiring athlete
              seeking professional training or a sports enthusiast looking to
              hone your skills, our curated selection of academies offers the
              perfect platform to elevate your game. Step into a realm where
              passion meets precision, and embark on a journey towards sporting
              greatness.
            </p>
          </div>
        </div>
      </div> */}
      <div className="  flex flex-wrap justify-center ">
        <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 p-5 ">
          <div className="py-4">
            <h1 className="py-3 text-3xl font-bold">
              <span className="text-[#228B22]">Turf </span>
            </h1>
            <p className="text-[#6D737A]">
              Uncover athletic excitement at premier turf destinations. Whether
              youre a seasoned athlete or a recreational player, our handpicked
              turfs offer unparalleled quality. Step onto these grounds where
              passion meets play, and start your journey to unforgettable
              sporting moments.
            </p>
          </div>
        </div>

        {turfs.map((turf, index) => (
          <div
            key={index}
            className="  max-w-md mx-4 mb-8 rounded-lg overflow-hidden shadow-lg p-6"
          >
            <Link to={`/turf/${turf.id}`}>
              <div className="relative w-full m-0 overflow-hidden text-gray-700 bg-white  bg-clip-border rounded-xl shrink-0">
                <img
                  className=/* "w-1/3 rounded mx-auto my-4" */ "object-cover w-full h-full"
                  src={turf.logo}
                  alt={turf.turfName}
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{turf.turfName}</div>
                <p className="text-gray-700 text-base">
                  Location: {turf.location}
                </p>
                <p className="text-gray-700 text-base">
                  Surface: {turf.surfaces}
                </p>
                <p className="text-gray-700 text-base">
                  Sports:{" "}
                  {turf.sports.map((sport, index) => (
                    <li key={index}>{sport}</li>
                  ))}
                </p>

                <p className="text-gray-700 text-base">
                  Timing : {turf.timings}
                </p>
                <p className="text-gray-700 text-base">
                  Contact No : {turf.phone}
                </p>
                <p className="text-gray-700 text-base">
                  Description : {turf.description}
                </p>
              </div>
            </Link>
            <a
              className="text-blue-500 hover:underline"
              href={turf.locationURL}
            >
              Location URL
            </a>
            <Link
              to="/booking"
              className="mx-10  inline-block px-4 py-2 bg-[#2354] text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Booking
            </Link>
          </div>
        ))}
      </div>
      <div className="w-full h-[500px]">
        <MapWithStoreLocation />
      </div>
    </>
  );
}

export default Turf;
