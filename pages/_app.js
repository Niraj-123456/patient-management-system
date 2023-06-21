import "../styles/globals.css";
import Layout from "../components/common/Layout/Layout";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "../utils/customTheme";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
