// /* eslint-disable react/no-unescaped-entities */
// import { useEffect, useState } from "react";
// //import competitions from "../../Data/Competitions";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function Competition() {
//   const [competitions, setCompetitions] = useState([]);

//   useEffect(() => {
//     const FetchData = async () => {
//       try {
//         const response = await axios.get(`/api/v1/comp/competitions`);
//         //console.log("response Competitions", response.data.data.data);
//         setCompetitions(response.data.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     FetchData();
//   }, []);
//   return (
//     <>
//       {/* <div className="w-full bg-[#e7f9e7] py-32 p-4">
//         <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0">
//           <div className="py-4">
//             <h1 className="py-3 text-3xl font-bold">
//               Most Popular <span className="text-[#228B22]">Acadmey </span>
//             </h1>
//             <p className="text-[#6D737A]">
//               Explore a world of athletic prowess and excellence as we showcase
//               the finest sports academies. Whether youre an aspiring athlete
//               seeking professional training or a sports enthusiast looking to
//               hone your skills, our curated selection of academies offers the
//               perfect platform to elevate your game. Step into a realm where
//               passion meets precision, and embark on a journey towards sporting
//               greatness.
//             </p>
//           </div>
//         </div>
//       </div> */}
//       <div className="  flex flex-wrap justify-center ">
//         <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 p-5 ">
//           <div className="py-4">
//             <h1 className="py-3 text-3xl font-bold">
//               <span className="text-[#228B22]">Competitions </span>
//             </h1>
//             <p className="text-[#6D737A]">
//               Uncover athletic excitement at premier turf destinations. Whether
//               youre a seasoned athlete or a recreational player, our handpicked
//               turfs offer unparalleled quality. Step onto these grounds where
//               passion meets play, and start your journey to unforgettable
//               sporting moments.
//             </p>
//           </div>
//         </div>
//         {/* <div className="filter">
//           <h1>sports</h1>
//           <h2>location</h2>
//           <h3></h3>
//         </div> */}
//         {competitions.map((competition, index) => (
//           <div
//             key={index}
//             className="  max-w-md mx-4 mb-8 rounded-lg overflow-hidden shadow-lg p-6"
//           >
//             <Link to={`/competition/${competition._id}`}>
//               <div className="relative w-full m-0 overflow-hidden text-gray-700 bg-white  bg-clip-border rounded-xl shrink-0">
//                 <img
//                   className="w-1/2 h-1/2 rounded mx-auto my-4" /* "object-cover w-full h-full" */
//                   src={competition.imageCover}
//                   alt={competition.name}
//                 />
//               </div>
//               <div className="px-6 py-4">
//                 <div className="font-bold text-xl mb-2">{competition.name}</div>
//                 {/* <p className="text-gray-700 text-base">
//                   Location: {competition.location}
//                 </p> */}
//                 {/*  <p className="text-gray-700 text-base">
//                   competitionType: {competition.competitionType}
//                 </p> */}
//                 <p className="text-gray-700 text-base">
//                   Sports: {competition.sports}
//                 </p>

//                 <p className="text-gray-700 text-base">
//                   Entry Fees: {competition.price}
//                 </p>

//                 {/*  <p className="text-gray-700 text-base">
//                   organizers:{" "}
//                   {competition.organizers.map((sport, index) => (
//                     <ul key={index}>
//                       <li> organizers Name : {sport.name}</li>
//                       <li> Phone : {sport.phone}</li>
//                     </ul>
//                   ))}
//                 </p>

//                 <p className="text-gray-700 text-base">
//                   Contact No : {competition.phone}
//                 </p>
//                 <p className="text-gray-700 text-base">
//                   Description : {competition.description}
//                 </p> */}
//               </div>
//             </Link>
//             <a
//               className="text-blue-500 hover:underline"
//               href={competition.googlelocation}
//             >
//               Location URL
//             </a>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Competition;
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MapWithStoreLocations from "./../Turf/Mapstorewithlocation"; // Assuming this is the correct path to the Map component

function Competition() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/comp/competitions`);
        setCompetitions(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, []);

  // Extract store locations from competition data
  const storeLocations = competitions.map((competition) => ({
    name: competition.name,
    locations: competition.Location, // Assuming 'Location' has 'coordinates'
  }));

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 p-5">
          <div className="py-4">
            <h1 className="py-3 text-3xl font-bold">
              <span className="text-[#228B22]">Competitions</span>
            </h1>
            <p className="text-[#6D737A]">
              Uncover athletic excitement at premier turf destinations. Whether
              you're a seasoned athlete or a recreational player, our handpicked
              turfs offer unparalleled quality. Step onto these grounds where
              passion meets play, and start your journey to unforgettable
              sporting moments.
            </p>
          </div>
        </div>

        {/* Render Competition Cards */}
        {competitions.map((competition, index) => (
          <div
            key={index}
            className="max-w-md mx-4 mb-8 rounded-lg overflow-hidden shadow-lg p-6"
          >
            <Link to={`/competition/${competition._id}`}>
              <div className="relative w-full m-0 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl shrink-0">
                <img
                  className="w-1/2 h-1/2 rounded mx-auto my-4"
                  src={competition.imageCover}
                  alt={competition.name}
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{competition.name}</div>
                <p className="text-gray-700 text-base">
                  Sports: {competition.sports}
                </p>
                <p className="text-gray-700 text-base">
                  Entry Fees: {competition.price}
                </p>
              </div>
            </Link>
            <a
              className="text-blue-500 hover:underline"
              href={competition.googlelocation}
            >
              Location URL
            </a>
          </div>
        ))}

        {/* Render Map Component */}
        <div className="w-full p-5">
          <MapWithStoreLocations storeLocations={storeLocations} />
        </div>
      </div>
    </>
  );
}

export default Competition;
