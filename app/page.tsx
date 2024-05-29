// import { auth } from "@/auth.config";
// import { redirect } from "next/navigation";
import SliderHome from '../components/home/SliderHome';
import MainHome from '../components/home/MainHome';

export default async function Home() {
  // const session = await auth();

  // if (session) {
  //   redirect("/dashboard");
  // }

  return (
    <section className="h-[calc(100vh-7rem)] select-none">
      <SliderHome />
      <MainHome />
    </section>
  );
}
