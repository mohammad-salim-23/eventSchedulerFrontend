

import RegisterForm from "../../Component/RegisterForm";
import logo from "../../assets/images/logo.jpg";
import homeImg from "../../assets/images/background.jpg";
const RegisterPage = () => {
  return ( 
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-between items-center">
        <div className="relative w-full h-screen hidden lg:flex">
          {/* Background Image */}
          <img
            src={homeImg}
            alt="Home"
            className="object-cover w-full h-screen z-0"
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/* Logo and content */}
          <div className="absolute left-1/2 top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 text-center">
            <h1 className="text-3xl font-black flex items-center justify-center">
              <img src={logo} width={50} height={50} alt="Logo" />
              <span className="text-white"> EventScheduler</span>
            </h1>
            <p className="text-white px-4">
              Easily plan your next event or offer your services as an event planner. Log in or sign up to get started with smart and simple event planning.
            </p>
          </div>
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
