"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import AttachmentList from "../attachments/AttachmentList";

interface QuestionAnswer {
  id: string;
  title: string;
  content: string;
  classes?: number | null;
}

interface Props {
  data: QuestionAnswer[];
}

export function Accordion({ data }: Props) {
  // Verificar si hay datos
  if (!data || data.length === 0) {
    return null; // No renderizar nada si data está vacío
  }

  return (
    <div className="w-full pt-2">
      <div className="mx-auto w-full max-w-2xl bg-white border border-gray-300">
        {data.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75 border border-gray-300">
                  <div className="flex justify-between w-full">
                    <span className="py-2 text-base font-bold text-slate-900">
                      {item.title}
                    </span>
                    <span className="flex py-2 text-xs font-bold text-slate-900">
                      {item.classes} clases
                    </span>
                  </div>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-8 w-8 font-bold text-slate-900`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  <AttachmentList chapterId={item.id} />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
