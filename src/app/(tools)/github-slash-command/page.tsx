import { Metadata } from "next";

import "~/styles/globals.css";

import { Form } from "./components/form";

export const metadata: Metadata = {
  description: "Generate a GitHub slash command for your repository with ease.",
  title: "/github",
};

export default function Page() {
  return (
    <div className="relative isolate h-screen overflow-scroll bg-gray-900 px-6 py-14 shadow-2xl sm:px-24 sm:py-24">
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
        /github
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
        Generate a GitHub slash command for your repository with ease.
      </p>

      <Form />
    </div>
  );
}
