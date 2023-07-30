import type { ChartBarProps } from '~/components/expenses/chart/bar/types';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

const ChartBar = ({ maxValue, value, label }: ChartBarProps) => {
  let barFillHeight = '0%';

  if (maxValue > 0) {
    barFillHeight = Math.round((value / maxValue) * 100) + '%';
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar--inner">
        <div
          className="chart-bar--fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar--label">{label}</div>
    </div>
  );
};

export default ChartBar;

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
}
