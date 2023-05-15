import "@/styles/globals.css";
import { lightTheme } from "@/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { AuthProvider, CartProvider, UiProvider } from "../../context";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {

  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
  }, [])

  return (

    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              {active && <Component {...pageProps} />}
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
