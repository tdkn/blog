import type { Metadata } from "next";

import { MacOSDefaultsPicker } from "./components/picker";

export const metadata: Metadata = {
  description: "Pick nix-darwin system.defaults values and generate Nix output.",
  title: "macOS defaults picker",
};

const Page = () => (
  <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-8 lg:px-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <header>
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            macOS Defaults Picker
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            nix-darwin manual 26.05 の system.defaults から選択
            <span aria-hidden="true"> / </span>
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://nix-darwin.github.io/nix-darwin/manual/"
              rel="noreferrer"
              target="_blank"
            >
              manual
            </a>
          </p>
        </div>
      </header>

      <MacOSDefaultsPicker />
    </div>
  </main>
);

export default Page;
