import Apple from "@/app/components/icons/Apple";
import Facebook from "@/app/components/icons/Facebook";
import Google from "@/app/components/icons/Google";
import Image from "next/image";

const AuthPage = () => {
  return (
    <main className="grid grid-cols-2">
      <section className="flex   flex-col flex-1  items-center justify-center">
        <h2 className="font-medium text-3xl">Get started</h2>

        <div className="bg-[#F0EFF2] w-[390px] pl-1 mt-10 rounded-lg h-14 flex items-center justify-between">
          <button className="bg-white cursor-pointer w-[169px]  py-3  my-[0.5px] font-medium rounded-lg">
            signup
          </button>
          <button className=" w-[169px] cursor-pointer py-3  my-[0.5px] font-medium rounded-lg text-[#868686]">
            login
          </button>
        </div>

        <form className="flex flex-col mt-8   gap-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="bio">Bio</label>
              <input
                type="bio"
                id="bio"
                name="bio"
                className="border-[#D9D9D9] outline-[#444CE7] placeholder-font-normal placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
                placeholder="Enter your bio"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
              placeholder="Enter your password"
            />
          </div>

          <button className="bg-[#444CE7] cursor-pointer text-center font-medium rounded-lg text-white py-4">
            Get started
          </button>
        </form>

        <div className="flex items-center justify-center mt-6 w-[390px] gap-2">
          <hr className="border-[#C4C4C4] border w-[117px]" />

          <span className="text-[#C4C4C4]">Or continue with</span>

          <hr className="border-[#C4C4C4] border w-[117px]" />
        </div>

        <div className="flex items-center mt-8 justify-center">
          <button className="rounded-full cursor-pointer flex items-center justify-center w-12 h-12 text-[#C4C4C4] text-size-12 border-[0.5px] border-[#D9D9D9] ">
            <Google />
          </button>

          <button>
            <Facebook />
          </button>

          <button>
            <Apple />
          </button>
        </div>
      </section>

      <section className=" sticky right-0 top-0 ml-auto w-fit h-screen pl-auto ">
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
