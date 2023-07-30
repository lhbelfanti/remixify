import { FaExclamationCircle } from 'react-icons/fa';
import type { ErrorProps } from '~/components/util/error/types';

const Error = ({ title, children }: ErrorProps) => {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
