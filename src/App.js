import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.css';

import Header from './components/Header';
import Row from './components/Row';
import NeedMatrixRow from './components/NeedMatrixRow';
import NeedMatrixHeader from './components/NeedMatrixHeader';
import { Banker, Process } from './vanilla/Banker';
import { safePrinterHelper } from './helpers';
import RequestAdditionalResourcesModal from './components/RequestAdditionalResourcesModal';
import SaveStateModal from './components/SaveStateModal';
import TextModal from './components/TextModal';

function App() {

  const [banker, setBanker] = useState(null);
  const [resourceCount, setResourceCount] = useState('');
  
  const [processes, setProcesses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState('');

  const [saveStateModalOpen, setSaveStateModalOpen] = useState(false);
  const [currentStateString, setCurrentStateString] = useState('');

  const [textModalOpen, setTextModalOpen] = useState(false);
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    banker && banker.processes && setProcesses(banker.processes);
  }, [banker]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleSaveStateModal = () => {
    setSaveStateModalOpen(!saveStateModalOpen);
  }

  const toggleTextModal = () => {
    setTextModalOpen(!textModalOpen);
  }

  const [need, setNeed] = useState(null);

  const addProcess = () => {
    banker.addProcess(new Process(banker.available.length));
    setProcesses([...banker.processes]);
    hideNeedMatrix();
  }

  const showNeedMatrix = () => {
    setNeed(banker.getNeedMatrix());
  }

  const hideNeedMatrix = () => {
    setNeed(null);
  }

  const checkSafeState = () => {
    let result = banker.safe();
    setResultText(safePrinterHelper(result));
    toggleTextModal();
  }

  let k = 0;

  if (banker === null) {
    return (
      <div className="container">
        <div className="row my-4">
          <div className="col row">
            <div className="col-9 m-auto text-center">
              <label className="form-label fs-4 mb-4">
                Enter the number of resources
              </label>
              <input
                className = "form-control fs-5 mb-4"
                onChange = {(event) => {
                  setResourceCount(event.target.value);
                }}
                placeholder = "Resources"
              />
              <button
                className = "btn btn-primary fs-5"
                disabled = {resourceCount === ''}
                onClick = {() => {
                if (resourceCount && !isNaN(parseInt(resourceCount)) && resourceCount > 0) {
                  let newBanker = new Banker(resourceCount);
                  setBanker(newBanker);
                }
              }}>Submit</button>
            </div>
          </div>
          <div className="col-1 d-flex justify-content-center align-items-center">
            OR
          </div>
          <div className="col row">
            <div className="col-9 m-auto text-center">
              <label className="form-label fs-4 mb-4">
                Enter a state string
              </label>
              <textarea
                className = "form-control fs-5 mb-4"
                value = {textAreaContent}
                onChange = {(event) => {setTextAreaContent(event.target.value)}}
              />
              <button className="btn btn-primary fs-5"
                disabled={textAreaContent === ''}
                onClick={() => {
                  if (textAreaContent !== '') {
                    setBanker(Banker.fromString(textAreaContent));
                  }
                }}
              >
                Enter State
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container my-4 py-4 fs-5">
      <TextModal
        text = {resultText}
        modalOpen = {textModalOpen}
        toggleModal = {toggleTextModal}
      />
      <RequestAdditionalResourcesModal
        banker = {banker}
        modalOpen = {modalOpen}
        showResult = {(text) => {
          setResultText(text);
          toggleTextModal();
        }}
        toggleModal = {toggleModal}
      />
      <SaveStateModal
        text = {currentStateString}
        modalOpen = {saveStateModalOpen}
        toggleModal = {toggleSaveStateModal}
      />
      <button className="btn btn-secondary fs-5 me-2 mb-2" onClick={addProcess}>Add Process</button>
      <button className="btn btn-primary fs-5 me-2 mb-2" onClick={showNeedMatrix}>Show Need Matrix</button>
      <button className="btn btn-primary fs-5 me-2 mb-2" onClick={checkSafeState}>Check System Safety</button>
      <button className="btn btn-warning fs-5 me-2 mb-2" onClick={() => {toggleModal()}}>Check Request Safety</button>
      <button className="btn btn-success fs-5 me-2 mb-2" onClick={() => {
        setCurrentStateString(banker.encode());
        toggleSaveStateModal();
      }}>Save State</button>
      <button className="btn btn-dark fs-5 me-2 mb-2" onClick={() => {window.location.reload()}}>Reset</button>
      <Header
        hideNeedMatrix = {hideNeedMatrix}
        banker = {banker}
      />
      {processes.map(process => {
        return (
          <Row
            key = {k}
            index = {k++}
            hideNeedMatrix = {hideNeedMatrix}
            process = {process}
          />
        )
      })}
      <br />
      {need &&
        <div className="row border border-dark">
          <NeedMatrixHeader
            banker = {banker}
          />
          {need.map((needVector, index) => (
            <NeedMatrixRow
              key = {index}
              index = {index}
              needVector = {needVector}
            />
          ))}
        </div>
      }
    </div>
  );
}

export default App;
