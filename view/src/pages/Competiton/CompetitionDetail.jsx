/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import competitions from "../../Data/Competitions";
/* import RecommendedCompetitions from "./RecommendedCompetitions";
import Carousel from "../../components/Carousle/Carosuel"; */
function CompetitionDetail() {
  const params = useParams();
  const competition = competitions.find(
    (comp) => comp.id === parseInt(params.id)
  );
  console.log("Conpetions", competitions);
  if (!competition) {
    return <div>Competition not found</div>;
  }
  const sports = Array.isArray(competition.sports)
    ? competition.sports.join(", ")
    : competition.sports;
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-screen-lg md:flex">
          {/* Left Div for Poster Image */}
          <div className="md:w-1/3 p-4">
            <img
              src={competition.posterImage}
              alt={competition.posterImage}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Div for Competition Information */}
          <div className="md:w-2/3 p-4">
            <h1 className="text-3xl font-bold mb-4">
              {competition.competitionName}
            </h1>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Location:</span>{" "}
              {competition.location}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Sports:</span> {sports}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Description:</span>{" "}
              {competition.description}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Competition Type:</span>{" "}
              {competition.competitionType}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Contact No:</span>{" "}
              {competition.contactNo}
            </p>
            <div className="mb-4">
              <span className="font-bold">Organizers:</span>
              <ul className="list-disc ml-4">
                {competition.organizers.map((organizer, index) => (
                  <li key={index}>
                    {organizer.name} - {organizer.phone}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={competition.locationURL}
              className="text-blue-500 hover:underline"
            >
              Location URL
            </a>
          </div>
        </div>
      </div>
      {/* <Carousel
        items={competitions.filter((comp) =>
          comp.sports.includes(competition.sports[0])
        )}
      />
      <Carousel items={competitions} />
      <RecommendedCompetitions selectedSport={competition.sports[0]} /> */}
    </>
  );
}

export default CompetitionDetail;
