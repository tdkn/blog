import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Head } from "~/components/common";

export default function CustomApp({ Component, pageProps }: AppProps) {
  // noinspection HtmlRequiredTitleElement
  return (
    <>
      <Head />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
