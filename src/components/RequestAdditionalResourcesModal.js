import React, { useState } from 'react';
import Modal from 'react-modal';
import { requestPrinterHelper } from '../helpers';
import { modalStyle, closeBtnStyle } from '../styles';

Modal.setAppElement("#root");

export default function RequestAdditionalResourcesModal(props) {
  const [selectedProcess, selectProcess] = useState(null);
  const [requestedResources, setRequestedResources] = useState(
    props.banker.available.map(() => 0)
  );

  const handleChange = (event) => {
    let newRequestedResources = [...requestedResources];
    newRequestedResources[parseInt(event.target.name)] = parseInt(event.target.value);
    setRequestedResources(newRequestedResources);
  }

  const submitRequest = () => {
    if (selectedProcess === null) {
      props.toggleModal();
      return;
    }

    let result = props.banker.requestAdditionalResources(selectedProcess, requestedResources);
    props.showResult(requestPrinterHelper(result));
    props.toggleModal();
  }

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
        onClick={props.toggleModal}>
          <i
            className="fas fa-times-circle fa-lg hover-pointer text-danger m-0"
          ></i>
      </button>
      <div className="row text-center mb-4">
        <div className="col">
          <select
            name="process"
            id="process"
            defaultValue="-"
            onChange={(event) => {
              selectProcess(parseInt(event.target.value))
            }}
          >
            <option key={-1} value={'-'} disabled={true}>Please select a process</option>
            {props.banker.processes.map((_, index) => {
              return (
                <option key={index} value={index}>
                  P{index}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="row justify-content-around mb-4">
      {props.banker.available.map((availableResourceCount, index) => (
        <div className="col" key={index}>
          <input
            name={index}
            onChange={handleChange}
            className="form-control"
            placeholder={String.fromCharCode('A'.charCodeAt(0) + index)}
            style={{maxWidth: '60px'}}
          />
        </div>
      ))}
      </div>

      <div className="row text-center">
        <div className="col">
          <button className="btn btn-success" onClick={submitRequest}>
            Request Resources
          </button>
        </div>
      </div>

    </Modal>
  )
}
