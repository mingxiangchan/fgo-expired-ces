import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PageLayout } from "../components/PageLayout";
import { Provider } from "react-redux";
import { store } from "../utils/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </Provider>
  );
}

export default MyApp;
