import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import inazuma from "../assets/inazuma.png";

const Contact = () => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMess, setErrorMess] = useState("");

  const handleInputChange = (e) => {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!message.email.endsWith("@carsu.edu.ph")) {
      setIsError(true);
      setErrorMess("Input email from carsu.edu.ph");
      setTimeout(() => {
        setIsError(false);
        setErrorMess("");
      }, 3000);
      return;
    }

    try {
      setIsSending(true);
      const response = await axios.post(
        "http://localhost:5000/message/messages",
        message
      );
      console.log(response.data);
      setMessage({ name: "", email: "", message: "" });
      setIsMessageSent(true);
      setIsSending(false);
      setTimeout(() => {
        setIsMessageSent(false);
      }, 3000);
    } catch (err) {
      setIsSending(false);
      setIsError(true);
      setErrorMess("An Error Occured");
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <section className="container mx-auto font-header" id="contact">
      <div className="p-14 mt-10 flex h-screen justify-center">
        <div className="flex flex-row mt-10 justify-center  relative ">
          <div className="flex-1 flex justify-start items-center p-10 leading-normal ">
            <div>
              <h4 className="text-xl uppercase text-secondary font-medium mb-2 tracking-wide">
                Get in touch
              </h4>
              <h2 className="text-[45px] ls:text-[90px] leading-none mb-12 text-white">
                Join the fun!
              </h2>
            </div>
          </div>

          <div className="flex-1 absolute place-self-center  h-[700px] w-[700px] -z-10 opacity-20">
            <img src={inazuma} alt="inazuma" className="h-full w-full" />
          </div>

          <div
            className=" flex-1 rounded-2xl flex flex-col gap-y-2 pb-24 p-10 items-start"
            style={{ width: "1000px" }}
          >
            <form onSubmit={handleClick}>
              <input
                type="text"
                value={message.name}
                required
                onChange={handleInputChange}
                name="name"
                className="text-white bg-transparent  border-b py-3 outline-none w-full placeholder:text-white focus:border-secondary transition-all"
                placeholder="Your Name"
              />
              <input
                type="email"
                value={message.email}
                required
                onChange={handleInputChange}
                name="email"
                className="text-white bg-transparent  border-b py-3 outline-none w-full placeholder:text-white focus:border-secondary transition-all"
                placeholder="Your Email"
              />
              <textarea
                value={message.message}
                required
                onChange={handleInputChange}
                name="message"
                className="text-white bg-transparent border-b py-12 outline-none w-full placeholder:text-white focus:border-secondary transition-all resize-none mb-12"
                placeholder="Your Message"
              />
              {isSending ? (
                <div className="border-2 text-white backdrop-blur-sm bg-black/50 loading">
                  Loading...
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-white button backdrop-blur-sm bg-black/50 tracking-wide font-semibold"
                >
                  Send Message
                </button>
              )}
            </form>
          </div>

          {isMessageSent && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.0, type: "spring", bounce: 0.75 }}
              className="p-2 absolute flex items-center h-14 bottom-0 right-0 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
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
              <div className="pl-4 text-sm font-normal">
                Message sent successfully.
              </div>
            </motion.div>
          )}

          {isError && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.0, type: "spring", bounce: 0.75 }}
              className="absolute flex items-center h-14 bottom-0 right-0 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800 p-2"
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
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">{errorMess}</div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
