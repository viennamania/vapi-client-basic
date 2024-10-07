import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "@/components/app/assistant";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-8 ${inter.className}`}
    >

      <div className="text-center mt-0">

        {/* logo image */}
        <div className="flex justify-center">
          <Image
            src="/therapist2.png"
            alt="AI Companion"
            width={150}
            height={150}
            className="rounded-md"
          />
        </div>

        {/*
        <h1 className="text-3xl">Welcome to AI Companion</h1>
        */}
        {/* 중국어로 번역 */}
        <h1 className="mt-5 text-xl">인공지능 동반자에 오신 것을 환영합니다!</h1>

        {/*
        <p className="text-slate-600 mt-2 text-lg">
          Your personal assistant to help you with your daily tasks.
        </p>

        <p className="text-slate-600 mt-2 text-lg">

          Talk with AI Companion to explore the world.
        </p>
        */}


      </div>

      <div className="w-full flex flex-col items-center justify-center gap-4 mb-10">
        
        <Assistant />
      </div>

    </main>
  );
}
