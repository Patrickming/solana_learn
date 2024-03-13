import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { AppBar } from './components/AppBar';
import { ContextProvider } from "./contexts/ContextProvider";
import { LinksFunction } from "@remix-run/node";

import stylesUrl from "~/styles/globals.css";
import walletstylesUrl from "@solana/wallet-adapter-react-ui/styles.css";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl }, { rel: 'stylesheet', href: walletstylesUrl },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <ContextProvider>
          <div className="flex flex-col h-screen">
            <AppBar />
            <Outlet />
          </div>
        </ContextProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
