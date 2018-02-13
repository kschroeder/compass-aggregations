import React, { PureComponent } from 'react';
import classnames from 'classnames';

import styles from './stage-preview.less';

/**
 * The stage preview component.
 */
class StagePreview extends PureComponent {
  static displayName = 'StagePreview';

  /**
   * Renders the stage preview.
   *
   * @returns {React.Component} The component.
   */
  render() {
    const iconClassName = classnames({
      'fa': true,
      'fa-angle-double-right': true,
      [ styles['stage-preview-arrow'] ]: true
    });
    return (
      <div className={classnames(styles['stage-preview'])}>
        <i className={iconClassName} aria-hidden />
      </div>
    );
  }
}

export default StagePreview;