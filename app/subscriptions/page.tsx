"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

const frequencies = [
  { value: "mensual", label: "Mensual", priceSuffix: "/mensual" },
  { value: "anual", label: "Anual", priceSuffix: "/anual" },
];
const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "#",
    price: { mensual: "$15", anual: "$144" },
    description: "Lo esencial para ofrecer el mejor trabajo a los clientes.",
    features: ["5 products", "Up to 1,000 subscribers", "Basic analytics"],
    mostPopular: false,
    price_id_month: "price_1PFpZCRwrT4unYqSDvdTwgC8",
    price_id_year: "price_1PFqsfRwrT4unYqSnxPSPAay",
  },
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    price: { mensual: "$30", anual: "$288" },
    description: "Lo esencial para ofrecer el mejor trabajo a los clientes.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: true,
    price_id_month: "price_1PFpZlRwrT4unYqSRbWRUZNE",
    price_id_year: "price_1PFqx6RwrT4unYqSaVD3HXSq",
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    price: { mensual: "$40", anual: "$350" },
    description: "Un plan que crece con su negocio en rápido crecimiento.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: false,
    price_id_month: "price_1PFpaKRwrT4unYqSUUf8L6RX",
    price_id_year: "price_1PFr3GRwrT4unYqSGfQkdSbw",
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",

    price: { mensual: "$60", anual: "$576" },
    description: "Un plan que crece con su negocio en rápido crecimiento.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
      "Custom reporting tools",
    ],
    mostPopular: false,
    price_id_month: "price_1PFpaiRwrT4unYqSF61GmfKb",
    price_id_year: "price_1PFqy5RwrT4unYqSLxziBxho",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Planes de precios para equipos de todos los tamaños
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Elija un plan asequible que incluya las mejores funciones para atraer
          a su audiencia, generar lealtad en los clientes e impulsar las ventas.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked
                      ? "bg-primary-600 text-white text-lg"
                      : "text-black",
                    "cursor-pointer rounded-full px-2.5 py-1 text-lg"
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? "ring-2 ring-primary-600"
                  : "ring-1 ring-gray-200",
                "rounded-3xl p-8"
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.mostPopular ? "text-primary-600" : "text-gray-900",
                  "text-lg font-semibold leading-8"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {/* {tier.price[frequency.value]} */}
                  {tier.price[frequency.value as keyof typeof tier.price]}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  {frequency.priceSuffix}
                </span>
              </p>
              <button
                type="button"
                // href={tier.href}
                onClick={async () => {
                  const res = await fetch("/api/checkout/subscription", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      priceId:
                        frequency.value === "mensual"
                          ? tier.price_id_month
                          : tier.price_id_year,
                    }),
                  });
                  const data = await res.json();

                  window.location.href = data.url;
                }}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-primary-600 text-white shadow-sm hover:bg-primary-500"
                    : "text-primary-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                )}
              >
                Buy plan
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-primary-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
