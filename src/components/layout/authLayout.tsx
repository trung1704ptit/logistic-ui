import { Outlet } from "react-router";
import Footer from "../Footer";

const AuthLayout = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
            <section>
              <h2 className="text-green-600 text-4xl text-center mt-20">
                VẬN TẢI T&T
              </h2>
              <div className="flex flex-col items-center justify-center px-6 py-8 mt-20 mx-auto lg:py-0 md:mt-auto">
                <div
                  className="bg-white rounded-2xl shadow-xl w-full sm:w-96"
                  style={{
                    maxWidth: "calc(100vw - 5rem)",
                    padding: "2.375rem 1rem 3rem",
                  }}
                >
                  <div className="p-4 space-y-4 md:space-y-6 md:p-5">
                    <Outlet />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
