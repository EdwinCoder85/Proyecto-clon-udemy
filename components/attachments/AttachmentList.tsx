import { getAttachmentsByChapterId } from "@/actions";
import { Attachement } from "@/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMovieLine } from "react-icons/ri";
import VideoPlayer from "../VideoPlayer";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

interface Props {
  chapterId: string;
}

export default function AttachmentList({ chapterId }: Props) {
  const [attachments, setAttachments] = useState<Attachement[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Agregamos estado para mostrar mensaje de carga

  const handleOpenModal = (url: string) => {
    setCurrentVideoUrl(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentVideoUrl("");
  };

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const attachmentsData = await getAttachmentsByChapterId(chapterId);
        const sanitizedAttachmentsData = attachmentsData.map((attachment) => ({
          ...attachment,
          chapterId: attachment.chapterId ?? "",
        }));
        setAttachments(sanitizedAttachmentsData);
        setLoading(false); // Marcamos que los datos están cargados
      } catch (error) {
        console.error("Error fetching attachments:", error);
      }
    };

    fetchAttachments();
  }, [chapterId]);

  // if (loading) {
  //   return <div>Cargando archivos adjuntos...</div>; // Mostrar mensaje de carga
  // }

  return (
    <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
      {loading ? (
        <div>Cargando archivos adjuntos...</div>
      ) : attachments.length === 0 ? (
        <div className="flex items-center gap-x-2 w-full text-gray-500">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          <span className="text-base">
            No hay archivos adjuntos disponibles...
          </span>
        </div>
      ) : (
        attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="w-full flex justify-between items-center gap-4 relative"
          >
            <div>
              <Link href="#" onClick={() => handleOpenModal(attachment.url)}>
                <div className="flex items-center gap-x-2">
                  <RiMovieLine className="text-primary-600 text-xl" />
                  <span className="text-base">{attachment.name}</span>
                </div>
              </Link>
            </div>
            <div className="text-base">{attachment.duration}</div>
          </div>
        ))
      )}
      {showModal && (
        <VideoPlayer url={currentVideoUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
}
