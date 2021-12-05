import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/m-plus-rounded-1c";
import { theme } from "../theme/theme";
import "../style/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
