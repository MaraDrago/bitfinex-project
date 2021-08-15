import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
