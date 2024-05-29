import { redirect } from "next/navigation";
// import UpdateSession from "./update-session";
import Stripe from "stripe";

import prisma from "@/libs/prisma";
import { auth } from '@/auth.config';

async function SuccessPage() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const session = await auth();

  // if (!session) {
  //   redirect("/login");
  // }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  // obtener id de base de datos
  // const sessionId =
  //   "cs_test_a1uB4TfCZ0WpuEnV4Xqm0rhLE4wDnNqZCiUH4Rufqh94YMQCgEV43r0gaF";

  // const result = await stripe.checkout.sessions.retrieve(sessionId);
  // const result = await stripe.checkout.sessions.retrieve(
  //   "SESSION_ID", {stripeAccount: "ACCOUNT_ID"}
  // );

  // if (result.status === "complete") {
  //   redirect("/dashboard");
  // }

  return (
        <div className="text-3xl font-bold text-center py-10 h-screen flex items-center justify-center">
        <div>
          <span className="text-7xl">
              🎉
          </span>
          <h1 className="text-4xl font-bold">¡Pago exitoso!</h1>
          <h1>Gracias por tu compra</h1>
          {/* <a href="/" className="text-blue-500 block mt-4">
            Volver a la tienda
          </a> */}
        </div>
      </div>
  );
}
export default SuccessPage;
