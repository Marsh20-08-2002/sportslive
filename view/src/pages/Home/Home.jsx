// import { Link } from "react-router-dom";

// //import backgroundImage from "../../../public/images/homei.webp";
// const Home = () => {
//   return (
//     <>
//       <div className="w-full bg-white py-24">
//         <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0">
//           <div className="flex flex-col justify-start gap-4">
//             <p className="py-2 text-2xl text-[#228B22] font-medium">
//               Welcome to our Sports Booking Website!
//             </p>
//             <h1 className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
//               Find Turf, Academies & Competitions
//             </h1>
//             <p className="py-2 text-lg text-gray-600">
//               Discover and book sports turfs, explore sports academies, and find
//               competitions for all sports in your city.
//             </p>
//           </div>

//           <img
//             src="images/homei.webp"
//             className="md:order-last order-first "
//             alt="Sports Booking Website"
//           />
//         </div>
//       </div>

//       <div className="flex justify-center items-center bg-[#e7f9e7] p-20 h-auto">
//         <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-2/3 max-w-[48rem] flex-row">
//           <div className="relative w-1/2 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
//             <img
//               src="images/turf4.jpg"
//               alt="card-image"
//               className="object-cover w-full h-full"
//             />
//           </div>
//           <div className="w-1/2 p-6">
//             <h4 className="block mb-4 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
//               Register Now
//             </h4>
//             <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
//               If you are a turf owner, academy owner, or competition organizer,
//               you can register here to join our platform.
//             </p>
//             <Link to="/registerToourWebsite" className="inline-block">
//               <button
//                 className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
//                 type="button"
//               >
//                 Learn More
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   className="w-4 h-4"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//                   ></path>
//                 </svg>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="relative flex flex-col items-center justify-center space-y-8 p-8 md:space-x-8 md:p-30 bg-white md:flex-row md:justify-center md:items-start md:space-y-0">
//         <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-2/3 md:w-96">
//           <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-40">
//             <img
//               src="images/turffoot.avif"
//               alt="Turf"
//               className="object-cover w-full h-full"
//             />
//           </div>

//           <div className="p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
//                 Turf Booking
//               </p>
//             </div>
//             <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
//               Find and book turf facilities in your city.
//             </p>
//           </div>
//           <div className="p-6 pt-0">
//             <Link
//               to="/turf"
//               onClick={() => window.scrollTo(0, 0)}
//               className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
//               type="button"
//             >
//               Book Turf
//             </Link>
//           </div>
//         </div>

//         <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-2/3 md:w-96">
//           <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-40">
//             <img
//               src="images/turf4.jpg"
//               alt="Turf"
//               className="object-cover w-full h-full"
//             />
//           </div>
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
//                 Sports Academy
//               </p>
//             </div>
//             <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
//               Explore sports academies offering training in various sports
//               disciplines.
//             </p>
//           </div>
//           <div className="p-6 pt-0">
//             <Link
//               to="/academy"
//               onClick={() => window.scrollTo(0, 0)}
//               className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
//               type="button"
//             >
//               Explore Academy
//             </Link>
//           </div>
//         </div>

//         <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-2/3 md:w-96">
//           <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-40">
//             <img
//               src="images\turfbg.jpg"
//               alt="Turf"
//               className="object-cover w-full h-full"
//             />
//           </div>
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-2">
//               <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
//                 Sports Competition
//               </p>
//             </div>
//             <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
//               Register for sports competitions and events happening near you.
//             </p>
//           </div>
//           <div className="p-6 pt-0">
//             <Link
//               to="/competition"
//               onClick={() => window.scrollTo(0, 0)}
//               className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
//               type="button"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [competitions, setCompetitions] = useState([]);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch("api/v1/comp/randomCompetitions");
        const data = await response.json();
        if (data.status === "success") {
          setCompetitions(data.data.data); // Set the competition data
        }
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
    fetchCompetitions();
  }, []);

  return (
    <>
      {/* Welcome Section */}
      <div className="w-full bg-white py-24">
        <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] px-4 md:px-0">
          <div className="flex flex-col justify-start gap-4">
            <p className="py-2 text-2xl text-[#228B22] font-medium">
              Welcome to our Sports Booking Website!
            </p>
            <h1 className="md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold">
              Find Turf, Academies & Competitions
            </h1>
            <p className="py-2 text-lg text-gray-600">
              Discover and book sports turfs, explore sports academies, and find
              competitions for all sports in your city.
            </p>
          </div>

          <img
            src="images/homei.webp"
            className="md:order-last order-first"
            alt="Sports Booking Website"
          />
        </div>
      </div>

      {/* Card Section */}
      <div className="relative flex flex-col items-center justify-center space-y-8 p-8 md:space-x-8 md:p-30 bg-white md:flex-row md:justify-center md:items-start md:space-y-0">
        {/* Turf Booking Card */}
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-2/3 md:w-96">
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-40">
            <img
              src="images/turffoot.avif"
              alt="Turf"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                Turf Booking
              </p>
            </div>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              Find and book turf facilities in your city.
            </p>
          </div>
          <div className="p-6 pt-0">
            <Link
              to="/turf"
              onClick={() => window.scrollTo(0, 0)}
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105"
              type="button"
            >
              Book Turf
            </Link>
          </div>
        </div>

        {/* Sports Academy Card */}
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-2/3 md:w-96">
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-40">
            <img
              src="images/turf4.jpg"
              alt="Academy"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                Sports Academy
              </p>
            </div>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              Explore sports academies offering training in various sports
              disciplines.
            </p>
          </div>
          <div className="p-6 pt-0">
            <Link
              to="/academy"
              onClick={() => window.scrollTo(0, 0)}
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105"
              type="button"
            >
              Explore Academy
            </Link>
          </div>
        </div>
        <br />
        {/* Competitions dynamically rendered */}
        {competitions.map((competition) => (
          <div
            key={competition._id}
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-2/3 md:w-96"
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-40">
              <img
                src={competition.imageCover || "images/turfbg.jpg"}
                alt={competition.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {competition.name}
                </p>
              </div>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {competition.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link
                to={`/competition/${competition.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105"
                type="button"
              >
                Register
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
