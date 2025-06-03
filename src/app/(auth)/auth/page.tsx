import Image from "next/image";

const AuthPage = () => {
  return (
    <main className="grid w-full grid-cols-2">
      <section className="flex   items-center justify-center">
        <h2>Hello</h2>
      </section>

      <section className=" border h-screen relative border-red-500 ">
        <div className="w-[433px] ">
          <Image
            src="https://res.cloudinary.com/dh3c9ay9z/image/upload/v1748957920/Banner_ji5s0q.png"
            alt="Banner"
            fill={true}
            objectFit="contain"
            // className="w-full  h-full"
          />
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
