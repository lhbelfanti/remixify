import { Link } from '@remix-run/react';
import { FaArrowRight, FaChartBar, FaDollarSign } from 'react-icons/fa';

const Index = () => {
  return (
    <main>
      <section className="marketing-section">
        <header>
          <FaDollarSign/>
          <h2>A Central Space</h2>
        </header>
        <div className="marketing-content">
          <div className="marketing-image">
            <img src="images/expenses-management.jpg" alt="A list of expenses."/>
          </div>
          <div className="marketing-explanation">
            <p>Manage your expenses in one central place.</p>
            <p>
              <Link className="cta" to="/expenses">
                <span>Get Started</span>
                <FaArrowRight/>
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="marketing-section">
        <header>
          <FaChartBar/>
          <h2>Detailed Analytics</h2>
        </header>
        <div className="marketing-content">
          <p className="marketing-explanation">
            Benefit from best-in-class analytics to understand your spending
            patterns.
          </p>
          <div className="marketing-image">
            <img src="images/expenses-chart.jpg" alt="A demo bar chart."/>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Index;

// This constant called 'handle' allow us to set some variables that can be obtained from the 'useMatches' hook
// The name of the variables are decided by the programmer
export const handle = {disableJS: true};