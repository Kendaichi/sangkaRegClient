import Major from "../assets/Major.png";
import Literary from "../assets/literary.png";
import Sports from "../assets/sports.png";
import Art from "../assets/arts.png";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [majorEvents, setMajorEvents] = useState([]);
  const [literaryEvents, setLiteraryEvents] = useState([]);
  const [artsEvents, setArtsEvents] = useState([]);
  const [sportsAndEsportsEvents, setSportsAndEsportsEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/events/getEvents"
        );
        const eventsByCategory = response.data;
        console.log(response.data);

        setMajorEvents(eventsByCategory["Major Event"] || []);
        setLiteraryEvents(eventsByCategory["Literary"] || []);
        setArtsEvents(eventsByCategory["Arts"] || []);
        setSportsAndEsportsEvents(eventsByCategory["Sports & E-sports"] || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleClick = (eventName) => {
    setSelectedEvent(eventName);
    setIsDisplayed(true);
  };

  const handleClose = () => {
    setSelectedEvent("");
    setIsDisplayed(false);
  };

  const EventCard = ({ imageSrc, eventName }) => (
    <div
      onClick={() => handleClick(eventName)}
      className="group relative w-64 rounded-xl overflow-hidden shadow-lg"
    >
      <img
        className="group-hover:scale-125 transition-all duration-500 opacity-80"
        src={imageSrc}
      />
      <div className="absolute group-hover:bg-black/50 z-10 w-full h-full rounded-xl top-0 transition-all duration-300 flex items-center justify-center">
        <div className="absolute -bottom-full group-hover:bottom-24 transition-all duration-500 z-20">
          <span className="text-2xl font-semibold text-white flex text-center justify-center h-full">
            {eventName}
          </span>
        </div>
      </div>
    </div>
  );

  const DetailsCard = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 2,
        type: "spring",
        bounce: 0.4,
      }}
      className="flex flex-center p-5 h-full w-full bg-black/40 rounded-3xl shadow-black shadow-md"
    >
      <div className="relative  h-full w-full p-2 overflow-hidden">
        <div
          onClick={handleClose}
          className="absolute  right-0 text-white cursor-pointer text-lg"
        >
          Close
        </div>
        <div className=" h-1/6 text-6xl text-center text-white font-semibold tracking-wider">
          {selectedEvent}
        </div>
        <div className="grid grid-rows-5 grid-flow-col  gap-7 overflow-x-auto">
          {selectedEvent === "Major Events" && (
            <>
              {majorEvents.map((event) => (
                <button
                  onClick={() => navigate("/register")}
                  key={event}
                  className="w-[250px] text-center text-xl text-white bg-black/20 rounded-md shadow-black shadow-sm"
                >
                  {event}
                </button>
              ))}
            </>
          )}
          {selectedEvent === "Literary Events" && (
            <>
              {literaryEvents.map((event) => (
                <button
                  onClick={() => navigate("/register")}
                  key={event}
                  className="w-[250px] text-center text-xl text-white bg-black/20 rounded-md shadow-black shadow-sm"
                >
                  {event}
                </button>
              ))}
            </>
          )}
          {selectedEvent === "Art Events" && (
            <>
              {artsEvents.map((event) => (
                <button
                  onClick={() => navigate("/register")}
                  key={event}
                  className="w-[250px] text-center text-xl text-white bg-black/20 rounded-md shadow-black shadow-sm"
                >
                  {event}
                </button>
              ))}
            </>
          )}
          {selectedEvent === "Sports & E-Sports Events" && (
            <>
              {sportsAndEsportsEvents.map((event) => (
                <button
                  onClick={() => navigate("/register")}
                  key={event}
                  className="w-[250px] h-[50px] text-center text-2xl text-white bg-black/20 rounded-md shadow-black shadow-sm"
                >
                  {event}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="events" className="font-header">
      <div className="p-14 mt-10 flex h-screen justify-center">
        {isDisplayed ? (
          <DetailsCard />
        ) : (
          <div className="flex flex-row gap-20">
            <EventCard imageSrc={Major} eventName="Major Events" />
            <EventCard imageSrc={Literary} eventName="Literary Events" />
            <EventCard imageSrc={Art} eventName="Art Events" />
            <EventCard
              imageSrc={Sports}
              eventName="Sports &amp; E-Sports Events"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
