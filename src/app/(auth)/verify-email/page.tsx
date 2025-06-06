import emailGif from "../../../../public/emailGif.gif";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "./components/Button";

const VerifyEmailPage = () => {
  return (
    <div>
      <nav className="py-4 px-3">
        <Link href={"/auth"}>
          <ArrowLeft />
        </Link>
      </nav>
      <main className="flex items-center text-center max-w-[512px] mx-auto h-[calc(100vh-64px)]  flex-col gap-2">
        <img src={emailGif.src} alt="" />
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] font-medium">Verify email address</h2>
          <p className="text-[#868686]">
            You entered{" "}
            <span className="text-[#444CE7]">coderblip@gmail.com</span> as the
            email address for your account Please verify this email address by
            clicking the link we sent to your inbox.If you don’t see it, be sure
            to check your spam or junk folder.
          </p>
        </div>
        <Button />
      </main>
    </div>
  );
};

export default VerifyEmailPage;
