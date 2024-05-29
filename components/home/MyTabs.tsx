"use client";

import { useState } from "react";
import TabPageByPopularTheme from './TabPageByPopularTheme';

type TabProps = {
  tabs: string[];
};

const Tabs: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <div className="flex gap-x-4 mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`text-xl font-bold py-2 rounded block leading-normal ${
              activeTab === tab ? "text-black" : "text-primary-600 bg-white"
            }`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="relative flex flex-col break-words bg-white max-w-screen-2xl mx-auto mb-6">
        <div className="">
          <div className="tab-content tab-space">
            <div className={activeTab === tabs[0] ? "block" : "hidden"}>
              <div className=" text-left border-2 border-gray-300 p-7">
                <div className="">
                  <h2 className="text-2xl font-bold mb-2">
                    Amplía tus oportunidades profesionales con Python
                  </h2>
                  <h3>{`Tanto si trabajas en el segmento del aprendizaje automático o de las finanzas como si deseas desarrollar tu carrera en ciencias de datos o desarrollo web, Python es una de las habilidades más importantes que puedes aprender. La sencilla sintaxis de Python es especialmente adecuada para equipos de escritorio, web y...`}</h3>
                  <button
                    className="border border-black font-bold text-sm p-2 mt-4 mb-8"
                    type="button"
                  >
                    Explora {tabs[0]}
                  </button>
                  <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
                    <TabPageByPopularTheme categoryName={tabs[0]} />
                  </div>
                </div>
              </div>
            </div>
            <div className={activeTab === tabs[1] ? "block" : "hidden"}>
              <div className="text-left w-full border border-gray-300 p-7 mx-auto">
                <div className="">
                  <h2 className="text-2xl font-bold mb-2">
                    Analiza y visualiza datos con Excel
                  </h2>
                  <h3>{`Independientemente del sector en el que trabajes, Microsoft Office Excel es un valioso programa de hoja de cálculo para la organización y representación de datos. Excel ofrece funciones, fórmulas y tablas dinámicas para ayudarte a añadir y analizar grandes conjuntos de información.`}</h3>
                  <button
                    className="border border-black font-bold text-sm p-2 mt-4 mb-8"
                    type="button"
                  >
                    Explora {tabs[1]}
                  </button>
                  <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
                    <TabPageByPopularTheme categoryName={tabs[1]} />
                  </div>
                </div>
              </div>
            </div>
            <div className={activeTab === tabs[2] ? "block" : "hidden"}>
              <div className="text-left w-full border border-gray-300 p-7 mx-auto">
                <div className="">
                  <h2 className="text-2xl font-bold mb-2">
                    Crea sitios web y aplicaciones con el desarrollo web
                  </h2>
                  <h3>{`El mundo del desarrollo web es tan amplio como la propia Internet. Gran parte de nuestra vida social y profesional se desarrolla en Internet, lo que ha fomentado la creación de nuevas industrias encaminadas a crear, administrar y depurar los sitios web y las aplicaciones de los que dependemos en cada vez mayor medida.`}</h3>
                  <button
                    className="border border-black font-bold text-sm p-2 mt-4 mb-8"
                    type="button"
                  >
                    Explora {tabs[2]}
                  </button>
                  <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
                    <TabPageByPopularTheme categoryName={tabs[2]} />
                  </div>
                </div>
              </div>
            </div>
            <div className={activeTab === tabs[3] ? "block" : "hidden"}>
              <div className="text-left w-full border border-gray-300 p-7 mx-auto">
                <div className="">
                  <h2 className="text-2xl font-bold mb-2">
                    Mejora tus habilidades de desarrollo de software con
                    JavaScript
                  </h2>
                  <h3>{`JavaScript es uno de los lenguajes de programación más extendidos del mundo, sobre todo porque es la columna vertebral de las aplicaciones web interactivas. Además, JavaScript es un lenguaje estupendo para los principiantes, porque les da la oportunidad de escribir un código que hace algo visual, lo que resulta útil y...`}</h3>
                  <button
                    className="border border-black font-bold text-sm p-2 mt-4 mb-8"
                    type="button"
                  >
                    Explora {tabs[3]}
                  </button>
                  <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
                    <TabPageByPopularTheme categoryName={tabs[3]} />
                  </div>
                </div>
              </div>
            </div>
            <div className={activeTab === tabs[4] ? "block" : "hidden"}>
              <div className="text-left w-full border border-gray-300 p-7 mx-auto">
                <div className="">
                  <h2 className="text-2xl font-bold mb-2">
                    Lidera la toma de decisiones basadas en datos con las
                    ciencias de la información
                  </h2>
                  <h3>{`Las ciencias de la información están en todas partes. Las mejores prácticas en ciencias de la información están permitiendo a las empresas recortar gastos innecesarios, automatizar la computación y analizar los mercados. Básicamente, las ciencias de la información son la clave para mantener la delantera en un entorno competitivo...`}</h3>
                  <button
                    className="border border-black font-bold text-sm p-2 mt-4 mb-8"
                    type="button"
                  >
                    Explora {tabs[4]}
                  </button>
                  <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
                    <TabPageByPopularTheme categoryName={tabs[4]} />
                  </div>
                </div>
              </div>
            </div>
            <div className={activeTab === tabs[5] ? "block" : "hidden"}>
              <div className="text-left w-full border border-gray-300 p-7 mx-auto">
                <div className="">
                  <h2 className="text-2xl font-bold mb-2">
                    Conviértete en un experto en computación en la nube con la
                    certificación AWS
                  </h2>
                  <button
                    className="border border-black font-bold text-sm p-2 mt-4 mb-8"
                    type="button"
                  >
                    Explora {tabs[5]}
                  </button>
                  <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
                    <TabPageByPopularTheme categoryName={tabs[5]} />
                  </div>
                </div>
              </div>
            </div>
            <div className={activeTab === tabs[6] ? "block" : "hidden"}>
              <div className="text-left w-full border border-gray-300 p-7 mx-auto">
                <div className="">
                  <h2 className="text-2xl font-bold mb-2">
                    Amplía tus habilidades creativas con el dibujo
                  </h2>
                  <h3>{`Además de ser la base sobre la que se construyen la mayoría de las formas de arte, el dibujo es también una excelente manera de aliviar el estrés y de alimentar tu creatividad interior. El dibujo nos enseña a ser observadores, a desarrollar la atención al detalle y a expresarnos.`}</h3>
                  <button
                    className="border border-black font-bold text-sm p-2 mt-4 mb-8"
                    type="button"
                  >
                    Explora {tabs[6]}
                  </button>
                  <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
                    {/* <TabPageByPopularTheme categoryName={tabs[6]} /> */}
                    <TabPageByPopularTheme categoryName={"Dibujo"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
