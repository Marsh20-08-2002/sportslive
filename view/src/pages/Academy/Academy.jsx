import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import clubs from "../../Data/Clubs";
function Academy() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clubs");
        console.log("reponse Clubs ", response.data.data);
        setClubs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    FetchData();
  }, []);
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
      <div className="  flex flex-wrap justify-center">
        <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 p-5 ">
          <div className="py-4">
            <h1 className="py-3 text-3xl font-bold">
              <span className="text-[#228B22]">Acadmey </span>
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

          {/* <Slider {...settings} className="px-5">
            {courses.map((course, i) => (
              <div key={i}>
                <Card course={course} />
              </div>
            ))}
          </Slider> */}
        </div>
        {/* <h1 className="text-3xl font-bold mb-8"></h1> */}
        {clubs.map((club, index) => (
          <div
            key={index}
            className="  max-w-md mx-4 mb-8 rounded-lg overflow-hidden shadow-lg p-6"
          >
            <Link to={`/academy/${club.id}`}>
              <img
                className="w-1/3 rounded mx-auto my-4"
                src={club.logo}
                alt={club.clubName}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{club.clubName}</div>
                <p className="text-gray-700 text-base">
                  Location: {club.location}
                </p>
                <p className="text-gray-700 text-base">Sports:</p>
                <ul className="text-gray-700 text-base">
                  {club.sports.map((sport, index) => (
                    <li key={index}>{sport}</li>
                  ))}
                </ul>
                <p className="text-gray-700 text-base">
                  Established Year: {club.establishedYear}
                </p>
                {/* <a
                className="text-blue-500 hover:underline"
                href={club.locationURL}
              >
                Location URL
              </a> */}
              </div>
            </Link>
            <a
              className="text-blue-500 hover:underline"
              href={club.locationURL}
            >
              Location URL
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Academy;
