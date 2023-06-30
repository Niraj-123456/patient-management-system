import "../styles/globals.css";
import Layout from "../components/common/Layout/Layout";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "../utils/customTheme";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
