import raiden from "../../assets/raidenLogIn.mp4";
import tomoe from "../../assets/tomoe.png";

import axios from "axios";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { motion } from "framer-motion";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setisError] = useState(false);
  const [message, SetMessage] = useState("");
  const [success, setisSuccess] = useState(false);

  useEffect(() => {
    // on mount
    document.body.style.overflow = "hidden";

    // on un-mount
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  // for log in
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/authentication/check-email",
        {
          email,
        }
      );
      console.log(response.data);
      if (response.data.exists) {
        setIsLogin(false);
        setIsVerification(true);
        sendOTP();
      } else {
        setisError(true);
        SetMessage("Email Not Found");
        setTimeout(() => {
          setisError(false);
          SetMessage("");
          console.log(isError);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // sending otp
  const sendOTP = async () => {
    try {
      console.log(email);
      const response = await axios.post(
        "http://localhost:5000/authentication/send-otp",
        {
          email,
        }
      );
      if (response.data.sent) {
        // OTP sent successfully
        setisSuccess(true);
        SetMessage("We've Sent the OTP");
        setTimeout(() => {
          setisSuccess(false);
          SetMessage("");
          console.log(isError);
        }, 3000);
      } else {
        // Unable to send OTP
        setisError(true);
        SetMessage("Unable to send OTP(Please contact administration)");
        setTimeout(() => {
          setisError(false);
          SetMessage("");
          console.log(isError);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      // // Handle error
      // setVerificationResult(false);
    }
  };

  const [code, setCode] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleCodeInput = (e) => {
    setCode(e.target.value);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/authentication/verify-otp",
        {
          email: email,
          code: code,
        }
      );

      if (response.data.verified) {
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: email },
        });
        const check = await axios.post(
          "http://localhost:5000/authentication/checkUser",
          { email: email }
        );

        console.log(check.data.exists);

        if (check.data.exists) {
          navigate("/profile");
        } else {
          navigate("/register");
        }
      } else {
        setisError(true);
        SetMessage("OTP not matched");
        setTimeout(() => {
          setisError(false);
          SetMessage("");
          console.log(isError);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-header overflow-hidden">
      <div className="h-screen flex justify-center">
        <div className="relative h-full w-full bg-black/30 flex justify-center p-5">
          <div className="absolute hover:text-gray-200 text-white tracking-wider cursor-pointer text-xs font-semibold left-8">
            <RouteLink to="/">Return</RouteLink>
          </div>
          {isLogin && (
            <div className="  flex flex-col justify-center mt-28 mb-28 w-1/4 rounded-3xl backdrop-blur-sm p-8 shadow-black/60 shadow-lg">
              <div className="h-1/2 mb-8 relative">
                <img
                  src={tomoe}
                  alt=""
                  className="absolute object-contain h-full w-full -z-10"
                />
              </div>
              <div className="h-1/2">
                <form onSubmit={handleLogIn}>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={handleInputChange}
                    placeholder="Carsu Email"
                    className="w-full bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="text-white font-bold button bottom-0 -z-10 ml-20 mt-2"
                  >
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          )}
          {isVerification && (
            <div className="flex flex-col justify-center mt-28 mb-28 w-1/4 rounded-3xl backdrop-blur-sm p-8 shadow-black/60 shadow-lg">
              <div className="h-1/2 mb-8 relative">
                <img
                  src={tomoe}
                  alt=""
                  className="absolute object-contain h-full w-full -z-10"
                />
              </div>

              <div className="h-1/2 text-white">
                <form onSubmit={handleVerificationSubmit}>
                  <input
                    type="text"
                    name="code"
                    required
                    value={code}
                    onChange={handleCodeInput}
                    placeholder="Enter Code"
                    className="w-full bg-black/50 rounded-md h-[40px] text-white/70 p-2 border-none invalid:border-red-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="text-white font-bold button bottom-0 -z-10 ml-20 mt-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          {success && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.0, type: "spring", bounce: 0.75 }}
              className="p-2 absolute flex items-center h-14 bottom-5 right-10 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-blue-600 dark:text-blue-500"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
                ></path>
              </svg>
              <div className="pl-4 text-sm font-normal">{message}</div>
            </motion.div>
          )}

          {isError && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.0, type: "spring", bounce: 0.75 }}
              className="absolute flex items-center h-14 bottom-5 right-10 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 p-2"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Error icon</span>
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

export default Login;
