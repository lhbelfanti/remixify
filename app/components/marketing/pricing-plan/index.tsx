import type { PricingPlanProps } from '~/components/marketing/pricing-plan/types';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

const PricingPlan = ({ title, price, perks, icon }: PricingPlanProps) => {
  const Icon = icon;
  return (
    <article>
      <header>
        <div className="icon">
          <Icon />
        </div>
        <h2>{title}</h2>
        <p>{price}</p>
      </header>
      <div className="plan-content">
        <ol>
          {perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ol>
        <div className='actions'>
          <a href="/not-implemented">Learn More</a>
        </div>
      </div>
    </article>
  );
}

export default PricingPlan;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
}