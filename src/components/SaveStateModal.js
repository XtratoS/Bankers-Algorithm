import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from 'react-modal';
import { modalStyle } from '../styles';

export default function SaveStateModal(props) {
  return (
    <Modal
      isOpen = {props.modalOpen}
      style = {modalStyle}
      onRequestClose = {props.toggleModal}
      shouldCloseOnOverlayClick = {true}
    >
      <div className="m-4">
        {props.text}
      </div>
      <div className="m-4 text-center">
        <CopyToClipboard text={props.text}
          onCopy={() => alert('Copied to clipboard')}>
          <button className="btn btn-primary">Copy to Clipboard</button>
        </CopyToClipboard>
      </div>
    </Modal>
  )
}
