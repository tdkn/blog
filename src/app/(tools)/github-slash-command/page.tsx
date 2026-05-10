import type { Metadata } from "next";

import { Form } from "./components/form";

export const metadata: Metadata = {
  description: "Generate a GitHub slash command for your repository with ease.",
  title: "/github",
};

const Page = () => (
  <main className="min-h-screen bg-background px-6 py-14 text-foreground sm:px-24 sm:py-20">
    <div className="mx-auto max-w-3xl">
      <h2 className="font-heading mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        /github
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-center text-base leading-7 text-muted-foreground">
        Generate a GitHub slash command for your repository with ease.
      </p>

      <Form />
    </div>
  </main>
);

export default Page;
