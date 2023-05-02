import { ProgressBarProps } from 'interfaces';

import './progress-bar.scss';

function ProgressBar(props: ProgressBarProps): JSX.Element {
  return (
    <div className={props.isInProgress ? 'progress-bar progress-bar--in-progress' : 'progress-bar'}>
      <div className="progress-bar__wrapper">
        <div className="progress-bar__bar"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
