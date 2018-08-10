import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Modal } from 'react-bootstrap';
import AceEditor from 'react-ace';

import 'brace/ext/language_tools';
import 'mongodb-ace-mode';
import 'mongodb-ace-theme';

import styles from './import-pipeline.less';

/**
 * Note.
 */
const NOTE = 'Supports MongoDB Shell syntax. Pasting a pipeline will create a new pipeline.';

/**
 * Options for the ACE editor.
 */
const OPTIONS = {
  enableLiveAutocompletion: false,
  tabSize: 2,
  fontSize: 11,
  minLines: 10,
  maxLines: Infinity,
  showGutter: true,
  useWorker: false
};

/**
 * Import pipeline modal.
 */
class ImportPipeline extends PureComponent {
  static displayName = 'ImportPipelineComponent';

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeImport: PropTypes.func.isRequired
  }

  onChange = () => {

  }

  /**
   * Render the component.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeImport}>
        <Modal.Header closeButton>
          <h4>New Pipeline From Plain Text</h4>
        </Modal.Header>
        <Modal.Body>
          <div className={classnames(styles['import-pipeline-note'])}>
            {NOTE}
          </div>
          <div className={classnames(styles['import-pipeline-editor'])}>
            <AceEditor
              mode="mongodb"
              theme="mongodb"
              width="100%"
              value=""
              onChange={this.onChange}
              editorProps={{ $blockScrolling: Infinity }}
              name="import-pipeline-editor"
              setOptions={OPTIONS} />
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ImportPipeline;