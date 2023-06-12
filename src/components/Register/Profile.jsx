import raiden from "../../assets/raidenLogIn.mp4";
import tomoe from "../../assets/tomoe.png";
import user from "../../assets/user.png";

import axios from "axios";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [message, SetMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [approved, setApproved] = useState(false);
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");

  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(auth().email);
    SetMessage(`Logged-in ${email}`);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      SetMessage("");
    }, 3000);

    checkStatus();

    // on mount
    document.body.style.overflow = "hidden";

    // on un-mount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [email]);

  const checkStatus = async () => {
    const response = await axios.post(
      "http://localhost:5000/status/checkStatus",
      { email: email }
    );

    console.log(response.data);
    console.log(response.data[0].eventname);

    if (response.data.length > 0 && response.data[0].approved === 1) {
      const eventname = response.data[0].eventname;
      setEvent(eventname);
      setApproved(true);
    } else {
      const eventname = response.data[0].eventname;
      setEvent(eventname);
      setApproved(false);
    }
  };

  const handleLogOut = () => {
    signOut();
    navigate("/login");
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
          <div className=" flex flex-col justify-center mt-16 mb-16 w-1/3 rounded-3xl backdrop-blur-sm pl-2 pr-2 pb-5 pt-5 shadow-black/60 shadow-lg">
            <img
              src={tomoe}
              alt=""
              className="object-contain h-1/3 w-1/3 place-self-center -z-10"
            />

            <div className=" flex flex-col  h-full p-4 gap-2">
              <div className=" justify-start place-self-center text-secondary tracking-wider font-semibold text-xl">
                My Event
              </div>
              <table className="table-auto ">
                <thead className="bg-gray-400">
                  <tr>
                    <th className="w-1/3 text-white  border-gray-400">
                      Status
                    </th>
                    <th className="text-white  border-gray-400 w-full">
                      Event Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black/40">
                  <tr>
                    <td className="text-center w-1/4 text-white  border-gray-400">
                      {approved ? "Approved" : "Pending"}
                    </td>
                    <td className="text-center w-1/4 text-white  border-gray-400">
                      {event}
                    </td>
                  </tr>
                </tbody>
              </table>
              {approved && (
                <div className=" h-1/2">
                  <div className=" text-white text-sm">
                    Contact your Coordinator:
                  </div>
                  <div className=" w-full flex flex-row h-full">
                    <div className=" w-1/2">
                      <img src={user} alt="" className="h-full w-full" />
                    </div>
                    <div className="pl-1  w-full flex flex-col text-sm justify-center">
                      <div className=" text-white">Franclloyd D. Dagdag</div>
                      <div className=" text-white">09667262876</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

export default Profile;
