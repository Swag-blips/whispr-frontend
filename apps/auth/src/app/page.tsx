import { AuthForm } from "./(auth)/auth/components/AuthForm";
import { Apple, Facebook, Google } from "./components/icons";

const AuthPage = () => {
  return (
    <main className="grid grid-cols-2">
      <section className="flex   flex-col flex-1  items-center justify-center">
        <h2 className="font-medium text-3xl">Get started</h2>

        <AuthForm />

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
