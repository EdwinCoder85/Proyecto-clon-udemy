import prisma from "@/libs/prisma";
import { auth } from '@/auth.config';
import Confetti from '@/utils/Confetti';

async function  SuccessPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
        <div className="text-3xl font-bold text-center py-10 h-screen flex items-center justify-center">
        <div>
          <span className="text-7xl">
              🎉
          </span>
          <h1 className="text-4xl font-bold">¡Pago exitoso!</h1>
          <h1>Gracias por tu compra</h1>
        </div>
        <Confetti/>
      </div>
  );
}


export default SuccessPage;
