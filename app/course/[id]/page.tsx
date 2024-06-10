import { Metadata } from "next";
import Image from "next/image";
import { ShieldExclamationIcon } from "@heroicons/react/24/solid";
import {
  VideoCameraIcon,
  ClipboardIcon,
  DocumentIcon,
  FolderArrowDownIcon,
  DevicePhoneMobileIcon,
  LinkIcon,
  TrophyIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import ReviewGallery from "@/components/reviews/ReviewGallery";
import StartRate from "@/components/StartRate";
import ReviewForm from "@/components/reviews/ReviewForm";
import { getSingleCourse } from "@/actions/getSingleCourse";
import { Accordion } from "@/components/ui";
import { getChaptersByCourseId } from "@/actions";
import { Price } from '@/components/Price';

export const metadata: Metadata = {
  title: "Nextfull - Ver detalle de curso",
  description: "Ver detalle de curso",
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleCourse = await getSingleCourse(params.id);

  if (!singleCourse) {
    return <div>Curso no encontrado</div>;
  }

  const chapters = await getChaptersByCourseId(params.id);

  return (
    <div className="bg-[#2d2f31] w-full h-96">
      <div className="flex flex-col lg:flex-row mx-auto max-w-screen-lg">
        <div className="lg:w-2/3 lg:h-[1500px]">
          <div className="text-white p-5 lg:py-10 lg:px-5 flex flex-col h-96">
            <h2 className="text-xl lg:text-3xl font-bold mb-4">{singleCourse.title}</h2>
            <h3 className="text-base lg:text-xl mb-4">{singleCourse.description}</h3>
            <div className="flex justify-start items-center gap-x-2 mb-4">
              {singleCourse.bestSeller ? (
                <span className="text-xs text-slate-700 font-semibold bg-amber-200 py-1 px-2">
                  Lo más vendido
                </span>
              ) : null}
              <h3 className="text-yellow-400 text-sm font-bold">
                {singleCourse.vote}
              </h3>
              <StartRate rating={singleCourse.vote} />
            </div>
            <p className="text-xs mb-4">
              Creado por {singleCourse.user?.username}
            </p>
            <div className="text-xs mb-4 flex items-center gap-x-4">
              <p className="flex gap-x-1">
                <ShieldExclamationIcon className="h-4 w-4 text-white" />
                <span>
                  Última actualización:{" "}
                  {singleCourse.updatedAt.toLocaleString()}
                </span>
              </p>
              <p className="flex gap-x-1">
                <GlobeAltIcon className="h-4 w-4 text-white" />
                <span>Español</span>
              </p>
            </div>
          </div>
          <div className="pb-2 lg:pb-10 m-4 lg:m-0">
            <Accordion data={chapters} />
          </div>
          <div className="block :w-1/3 h-auto px-6 py-8 lg:hidden">
          <div className="border border-white w-full h-auto bg-white shadow shadow-slate-500">
            <Image
              src={singleCourse.imageUrl}
              alt={singleCourse.title}
              className="object-contain"
              width={3000}
              height={3000}
              priority={true}
            />
            <div className="px-4 py-6">
              <Price course={singleCourse} />
              <button
                type="button"
                className="text-black font-bold border-2 border-black w-full px-2 py-3 mt-2"
              >
                Comprar ahora
              </button>
              <p className="text-xs text-center mt-4 mb-6">
                Garantía de reembolso 30 días
              </p>
              <div className="text-xs">
                <p className="font-bold mb-2">Este curso incluye:</p>
                <p className="flex gap-x-2 mb-2">
                  <VideoCameraIcon className="h-4 w-4 font-bold text-black" />
                  8,5 horas de vídeo bajo demanda
                </p>
                <p className="flex gap-x-2 mb-2">
                  <ClipboardIcon className="h-4 w-4 font-bold text-black" />
                  tareas
                </p>
                <p className="flex gap-x-2 mb-2">
                  <DocumentIcon className="h-4 w-4 font-bold text-black" />7
                  artículos
                </p>
                <p className="flex gap-x-2 mb-2">
                  <FolderArrowDownIcon className="h-4 w-4 font-bold text-black" />
                  12 recursos descargables
                </p>
                <p className="flex gap-x-2 mb-2">
                  <DevicePhoneMobileIcon className="h-4 w-4 font-bold text-black" />
                  Acceso en dispositivos móviles y TV
                </p>
                <p className="flex gap-x-2 mb-2">
                  <LinkIcon className="h-4 w-4 font-bold text-black" />
                  Acceso de por vida
                </p>
                <p className="flex gap-x-2 mb-2">
                  <TrophyIcon className="h-4 w-4 font-bold text-black" />
                  Certificado de finalización
                </p>
              </div>
            </div>
            <div className="px-4 py-6">
              <h2 className="font-bold font-2xl mb-2">
                ¿La formación es para 5 o más personas?
              </h2>
              <p className="text-xs mb-2">
                Dale a tu equipo acceso a más de 25.000 de los mejores cursos de
                Udemy en cualquier momento y lugar.
              </p>
            </div>
          </div>
        </div>
          <div className="pb-2 lg:pb-10 m-4 lg:m-0">
            <ReviewForm courseId={singleCourse.id} />
          </div>
          <div className="pb-2 lg:pb-10 m-4 lg:m-0">
            <ReviewGallery courseId={singleCourse.id} />
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/3 lg:h-[1500px] lg:px-6 lg:py-8">
          <div className="border border-white w-full h-auto bg-white shadow shadow-slate-500">
            <Image
              src={singleCourse.imageUrl}
              alt={singleCourse.title}
              className="object-contain"
              width={3000}
              height={3000}
              priority={true}
            />
            <div className="px-4 py-6">
              <Price course={singleCourse} />
              <button
                type="button"
                className="text-black font-bold border-2 border-black w-full px-2 py-3 mt-2"
              >
                Comprar ahora
              </button>
              <p className="text-xs text-center mt-4 mb-6">
                Garantía de reembolso 30 días
              </p>
              <div className="text-xs">
                <p className="font-bold mb-2">Este curso incluye:</p>
                <p className="flex gap-x-2 mb-2">
                  <VideoCameraIcon className="h-4 w-4 font-bold text-black" />
                  8,5 horas de vídeo bajo demanda
                </p>
                <p className="flex gap-x-2 mb-2">
                  <ClipboardIcon className="h-4 w-4 font-bold text-black" />
                  tareas
                </p>
                <p className="flex gap-x-2 mb-2">
                  <DocumentIcon className="h-4 w-4 font-bold text-black" />7
                  artículos
                </p>
                <p className="flex gap-x-2 mb-2">
                  <FolderArrowDownIcon className="h-4 w-4 font-bold text-black" />
                  12 recursos descargables
                </p>
                <p className="flex gap-x-2 mb-2">
                  <DevicePhoneMobileIcon className="h-4 w-4 font-bold text-black" />
                  Acceso en dispositivos móviles y TV
                </p>
                <p className="flex gap-x-2 mb-2">
                  <LinkIcon className="h-4 w-4 font-bold text-black" />
                  Acceso de por vida
                </p>
                <p className="flex gap-x-2 mb-2">
                  <TrophyIcon className="h-4 w-4 font-bold text-black" />
                  Certificado de finalización
                </p>
              </div>
            </div>
            <div className="px-4 py-6">
              <h2 className="font-bold font-2xl mb-2">
                ¿La formación es para 5 o más personas?
              </h2>
              <p className="text-xs mb-2">
                Dale a tu equipo acceso a más de 25.000 de los mejores cursos de
                Udemy en cualquier momento y lugar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
