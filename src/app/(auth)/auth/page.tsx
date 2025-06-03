import Image from "next/image";

const AuthPage = () => {
  return (
    <main className="grid grid-cols-2">
      <section className="flex   flex-col flex-1  items-center justify-center">
        <h2 className="font-medium text-3xl">Get started</h2>

        <div className="bg-[#F0EFF2] w-[381px] pl-1 mt-10 rounded-lg h-14 flex items-center justify-between">
          <button className="bg-white w-[169px]  py-3  my-[0.5px] font-medium rounded-lg">
            signup
          </button>
          <button className=" w-[169px]  py-3  my-[0.5px] font-medium rounded-lg text-[#868686]">
            login
          </button>
        </div>

        <form className="flex flex-col  gap-6"></form>
      </section>

      <section className=" ml-auto w-fit h-screen pl-auto relative ">
        <div className=" h-[inherit]">
          <img
            src="https://res.cloudinary.com/dh3c9ay9z/image/upload/v1748957920/Banner_ji5s0q.png"
            alt="Banner"
            className=" h-full"
          />
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
