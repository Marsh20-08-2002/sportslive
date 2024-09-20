/* eslint-disable react/prop-types */
import { useState } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={index}
              className={`transform transition-transform ${
                index === currentIndex ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ width: "100%" }}
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover object-center"
                  src={item.posterImage}
                  alt={item.competitionName}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {item.competitionName}
                  </h3>
                  <p className="text-gray-700 mb-2">{item.description}</p>
                  <p className="text-gray-700">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-md"
        onClick={goToPrevSlide}
      >
        Prev
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-md"
        onClick={goToNextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
