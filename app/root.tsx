import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useRouteError
} from '@remix-run/react';
import { default as ErrorComponent } from '~/components/util/error';
import styles from './styles.css';
import type { ReactNode } from 'react';

interface DocumentProps {
  title?: string;
  children: ReactNode
}

export const meta: V2_MetaFunction = () => {
  return [
    {title: "Remix Expenses App"},
    {property: "og:title", content: "Remix Expenses App"},
    {name: "description", content: "Manage your expenses with ease."},
  ];
};

const Document = ({title, children}: DocumentProps) => {
  const matches = useMatches();

  const disableJS = matches.some(match => match.handle?.disableJS);

  return (
    <html lang="en">
    <head>
      { title && <title>{ title }</title> }
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    { children }
    <ScrollRestoration/>
    { !disableJS &&
        <Scripts/> } {/* Removing this tag will allow us to download the javascript files for pages that don't rely on JS code*/ }
    <LiveReload/>
    </body>
    </html>
  );
}

const App = () => {
  return (
    <Document>
      <Outlet/>
    </Document>
  );
}
export default App;

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
  {rel: 'stylesheet', href: styles},
  {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
  {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
  {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap'},
];

export const ErrorBoundary = () => {
  const error: unknown = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={ error.statusText }>
        <main>
          <ErrorComponent title={ error.statusText }>
            <p>{ error.data?.messsage || 'Something went wrong. Please try again later.' }</p>
            <p>Back to <Link to="/">safety</Link>.</p>
          </ErrorComponent>
        </main>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document title={ "An error occurred" }>
        <main>
          <ErrorComponent title={ "An error occurred" }>
            <p>{ error.message || 'Something went wrong. Please try again later.' }</p>
            <p>Back to <Link to="/">safety</Link>.</p>
          </ErrorComponent>
        </main>
      </Document>
    );
  }

  return (
    <Document title={ "An error occurred" }>
      <p>Back to <Link to="/">safety</Link>.</p>
    </Document>
  )
}