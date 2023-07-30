import { Outlet } from '@remix-run/react';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { links as pricingPlanLinks } from '~/components/marketing/pricing-plan';
import MainHeader from '~/components/navigation/main-header';
import { getUserFromSession } from '~/data/auth.server';

const MarketingLayout = () => {
  return (
    <>
      <MainHeader/>
      <Outlet/>
    </>
  );
}

export default MarketingLayout;

export const links: LinksFunction = () => {
  return [...pricingPlanLinks()];
}

export const loader = ({request}: LoaderArgs) => {
  // The server will attach to every request the cookie we created. So we can use the cookie in the front end by
  // extracting it here
  return getUserFromSession(request);
}

// The headers are not automatically applied to the child/nested routes. This happens because the headers could cause
// problems if they are applied in pages that the programmer didn't expect they would be applied.
// This was changed in the V2 https://remix.run/docs/en/1.19.1/route/headers#v2-behavior
export const headers = () => {
  return {
    'Cache-Control': 'max-age=3600' // 60 minutes
  }
}