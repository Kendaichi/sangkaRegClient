import tomoe from "../../assets/tomoe.png";
import raiden from "../../assets/raidenLogIn.mp4";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const EventRegistration = () => {
  const [success, setSuccess] = useState(false);
  const [message, SetMessage] = useState("");
  const [email, setEmail] = useState("");

  const [majorEvents, setMajorEvents] = useState([]);
  const [literaryEvents, setLiteraryEvents] = useState([]);
  const [artsEvents, setArtsEvents] = useState([]);
  const [sportsAndEsportsEvents, setSportsAndEsportsEvents] = useState([]);

  const [register, setRegister] = useState({
    name: "",
    course: "",
    year: "",
    email: "",
    event: "",
    address: "",
    birthdate: "",
    gender: "",
    contact: "",
    idnum: "",
    experience: "",
  });

  // console.log(register);

  const handleInputChange = (e) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const auth = useAuthUser();
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    setRegister((prev) => ({ ...prev, email: auth().email }));
    setEmail(auth().email);
    SetMessage(`Logged-in ${email}`);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/events/getEvents"
        );
        // console.log(response.data);
        const eventsByCategory = response.data;

        setMajorEvents(eventsByCategory["Major Event"] || []);
        setLiteraryEvents(eventsByCategory["Literary"] || []);
        setArtsEvents(eventsByCategory["Arts"] || []);
        setSportsAndEsportsEvents(eventsByCategory["Sports & E-sports"] || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();

    // on mount
    document.body.style.overflow = "hidden";

    // on un-mount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [email]);

  const handleLogOut = () => {
    signOut();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/register/userInformation",
        register
      );
      console.log(response.data);
      setRegister({
        name: "",
        course: "",
        year: "",
        email: "",
        event: "",
        address: "",
        birthdate: "",
        gender: "",
        contact: "",
        idnum: "",
        experience: "",
      });
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="font-header overflow-hidden">
      <div className="h-screen flex justify-center">
        <div className="relative h-full w-full bg-black/30 flex justify-center p-5">
          <button
            onClick={handleLogOut}
            className="absolute right-8 text-white tracking-wider font-semibold cursor-pointer text-xs"
          >
            Logout
          </button>
          <div className="absolute hover:text-gray-200 text-white tracking-wider cursor-pointer text-xs font-semibold left-8">
            <RouteLink to="/">Return</RouteLink>
          </div>
          <div className="flex flex-col justify-center mt-16 mb-16 w-1/3 rounded-3xl backdrop-blur-sm pl-2 pr-2 pb-5 pt-5 shadow-black/60 shadow-lg">
            <img
              src={tomoe}
              alt=""
              className="absolute object-contain h-full w-full -z-10 opacity-50"
            />

            <form
              onSubmit={handleSubmit}
              className="flex flex-col  h-full p-4 gap-2"
            >
              <div className="flex flex-row  h-10 w-full text-white gap-2">
                <input
                  type="text"
                  name="email"
                  value={email}
                  required
                  onChange={handleInputChange}
                  placeholder="Input Name"
                  className="hidden"
                />
                <input
                  type="text"
                  name="name"
                  value={register.name}
                  required
                  onChange={handleInputChange}
                  placeholder="Input Name"
                  className="w-full bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-row  h-10 w-full text-white gap-2">
                <select
                  name="course"
                  required
                  value={register.course}
                  onChange={handleInputChange}
                  className="select-input w-1/3 bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                >
                  <option value="">Course</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSIS">BSIS</option>
                  <option value="BSCS">BSCS</option>
                </select>
                <select
                  name="year"
                  required
                  value={register.year}
                  onChange={handleInputChange}
                  className="select-input w-1/3 bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                >
                  <option value="">Year</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
                <select
                  name="event"
                  value={register.event}
                  required
                  onChange={handleInputChange}
                  className="w-1/3 bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                >
                  <option value="">Event</option>
                  <optgroup label="Major Event">
                    {majorEvents.map((eventName) => (
                      <option key={eventName} value={eventName}>
                        {eventName}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Literary">
                    {literaryEvents.map((eventName) => (
                      <option
                        key={eventName}
                        value={eventName}
                        className="text-white"
                      >
                        {eventName}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Arts">
                    {artsEvents.map((eventName) => (
                      <option key={eventName} value={eventName}>
                        {eventName}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Sports & E-sports">
                    {sportsAndEsportsEvents.map((eventName) => (
                      <option key={eventName} value={eventName}>
                        {eventName}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div className=" h-10 w-full text-white">
                <input
                  type="text"
                  name="address"
                  value={register.address}
                  required
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-row  h-10 w-full text-white gap-2">
                <input
                  type="date"
                  name="birthdate"
                  value={register.birthdate}
                  required
                  onChange={handleInputChange}
                  placeholder="Birthdate"
                  className="calendar-input w-full bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                />
                <select
                  name="gender"
                  required
                  value={register.gender}
                  onChange={handleInputChange}
                  className="select-input w-1/2 bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-row  h-10 w-full text-white gap-2">
                <input
                  type="text"
                  name="contact"
                  value={register.contact}
                  required
                  onChange={handleInputChange}
                  placeholder="Contact Number"
                  className="w-full bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="idnum"
                  value={register.idnum}
                  required
                  onChange={handleInputChange}
                  placeholder="Id-number"
                  className="w-1/2 bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                />
              </div>
              <textarea
                name="experience"
                value={register.experience}
                required
                onChange={handleInputChange}
                placeholder="Experience"
                className="resize-none w-full h-full bg-black/50 rounded-md text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
              />
              <button
                type="submit"
                className="text-white w-1/3 place-self-center font-bold button bottom-0"
              >
                SUBMIT
              </button>
            </form>
          </div>
          {success && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.0, type: "spring", bounce: 0.75 }}
              className="p-2 absolute flex items-center h-14 bottom-5 right-10 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">{message}</div>
            </motion.div>
          )}
        </div>
        <video
          src={raiden}
          autoPlay
          muted
          loop
          className="absolute place-self-center object-contain scale-125 -z-20 opacity-90"
        />
      </div>
    </div>
  );
};

export default EventRegistration;
