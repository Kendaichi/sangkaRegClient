import Nav from "./components/Navbar";
import HomeMultimedia from "./components/Home";
import Contact from "./components/Contact";
import Info from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Register/Login";
import Events from "./components/Events";

import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Sample from "./components/sample";
import EventRegistration from "./components/Register/EventRegistration";
import { RequireAuth } from "react-auth-kit";
import Profile from "./components/Register/Profile";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          element={
            <div className="overflow-hidden bg-site bg-cover">
              <div>
                <Nav />
                <div className="backdrop-blur-3xl">
                  <HomeMultimedia />
                  <Info />
                  <Events />
                  <Contact />
                  {/* <Sample /> */}
                </div>
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="backdrop-blur-3xl">
              <Login />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <RequireAuth loginPath="/login">
              <EventRegistration />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            // <RequireAuth loginPath="/login">
            <Profile />
            // </RequireAuth>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
