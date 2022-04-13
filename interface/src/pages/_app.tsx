import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from "nextjs-progressbar";
import GlobalStyle from "../styles/global";

import { MenuProvider } from "../providers/MenuProvider";
import { ModalProvider } from "../providers/ModalProvider";

import Modal from "../components/Modal";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <MenuProvider>
        <ModalProvider>
            <Head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <link rel="icon" href="favicon.ico" />
              <title>Gerenciador de Médicos</title>
            </Head>
            <NextNProgress
              color="#FFDF00"
              startPosition={0.3}
              stopDelayMs={100}
              height={4.5}
              options={ { showSpinner : false } }
            />
            <Component {...pageProps} />
            <Modal />
        </ModalProvider>
      </MenuProvider>
    </>
  );
};

export default MyApp;