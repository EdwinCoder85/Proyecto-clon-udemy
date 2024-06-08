import React from "react";
import Tabs from "./MyTabs";

export default function MainHome() {
  return (
    <div className="flex flex-col items-start max-w-screen-2xl mx-auto space-y-3 mt-4 lg:mt-14 mb-8 p-6 lg:p-0">
      <h2 className="text-4xl font-bold">Una amplia selección de cursos</h2>
      <h3 className="text-xl">
        Elige entre más de 210.000 cursos de vídeo en línea con nuevo contenido
        cada mes
      </h3>
      <Tabs
        tabs={[
          "Python",
          "Excel",
          "Desarrollo web",
          "Javascript",
          "Ciencia de la informacion",
          "Amazon AWS",
          "Dibujo",
        ]}
      />
    </div>
  );
}
