import React from 'react';
import Modal from 'react-modal';
import { modalStyle, closeBtnStyle } from '../styles';

export default function TextModal(props) {

  let status = props.text.toLowerCase().startsWith('yes') ? 'success' : 'danger';

  return (
    <Modal
      isOpen = {props.modalOpen}
      style = {modalStyle}
      onRequestClose = {props.toggleModal}
      shouldCloseOnOverlayClick = {true}
    >
      <button
        className="btn btn-white p-0"
        style={closeBtnStyle}
        onClick={props.toggleModal}
      >
        <i
          className="fas fa-times-circle fa-lg hover-pointer text-danger m-0"
        ></i>
      </button>
      <div className={`alert alert-${status}`}>
        {props.text}
      </div>
    </Modal>
  )
}
