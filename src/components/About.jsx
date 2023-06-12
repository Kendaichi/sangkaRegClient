import raiden from "../assets/raiden_shogun.png";

const Info = () => {
  return (
    <section id="about" className="font-header">
      <div className="relative p-14 mt-10 flex h-screen justify-center ">
        <div className=" w-full flex flex-row">
          <div className=" w-1/2 text-secondary">
            <div className="flex-1 opacity-40 absolute top-0 -left-36 -z-10">
              <img src={raiden} alt="" />
            </div>
          </div>
          <div className=" w-1/2 leading-snug mt-5">
            <div className=" text-secondary text-2xl font-semibold text-center tracking-normal">
              ABOUT SANGKA
            </div>
            <div className=" p-7 text-justify text-white tracking-wide leading-relaxed">
              SANGKA is a highly anticipated annual intramural event held at
              CARAGA STATE UNIVERSITY MAIN CAMPUS, orchestrated by the dynamic
              UNIVERSITY STUDENT GOVERNMENT. This grand affair serves as a
              remarkable platform for every college within the institution to
              exhibit the remarkable talents, skills, and expertise of their
              representatives across a diverse range of disciplines encompassing
              literature, sports, and arts. With fervor and enthusiasm,
              participants engage in friendly competitions, captivating
              performances, and awe-inspiring showcases that captivate the
              entire campus community. SANGKA unites students, faculty, and
              staff, fostering a vibrant atmosphere of camaraderie, healthy
              rivalry, and an unwavering spirit of celebration. It is an
              extraordinary spectacle that embodies the richness and vibrancy of
              the academic and creative pursuits at CARAGA STATE UNIVERSITY MAIN
              CAMPUS.
            </div>
            {/* <div className="button text-white ml-7   cursor-pointer font-semibold">Register Now!</div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
