/* eslint-disable react/prop-types */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import competitions from "../../Data/Competitions";

function RecommendedCompetitions({ selectedSport }) {
  // Filter competitions based on selected sport
  const recommendedCompetitions = competitions.filter((comp) =>
    comp.sports.includes(selectedSport)
  );

  // Settings for the Slider component
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true,
    verticalSwiping: true,
    prevArrow: <button className="slick-prev">{"<"}</button>,
    nextArrow: <button className="slick-next">{">"}</button>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommended Competitions</h2>
      <Slider {...settings}>
        {recommendedCompetitions.map((competition) => (
          <div key={competition.id} className="px-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover object-center"
                src={competition.posterImage}
                alt={competition.competitionName}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {competition.competitionName}
                </h3>
                <p className="text-gray-700 mb-2">
                  Location: {competition.location}
                </p>
                <p className="text-gray-700 mb-2">
                  Description: {competition.description}
                </p>
                <p className="text-gray-700">
                  Contact No: {competition.contactNo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecommendedCompetitions;
