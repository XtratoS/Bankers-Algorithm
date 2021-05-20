import React, { useState, useEffect } from 'react'
import CellContent from './CellContent';

function Header(props) {
  const [available, setAvailable] = useState([]);
  useEffect(() => {}, [available]);

  const incrementAvailable = (i) => {
    let available = [...props.banker.available];
    available[i]++;
    setAvailable(available);
    props.banker.available = available;
  }

  const decrementAvailable = (i) => {
    let available = [...props.banker.available];
    available[i] > 0 && available[i]--;
    setAvailable(available);
    props.banker.available = available;
  }

  return (<>
    <div className="row col-6 m-auto mt-4 pt-2 justify-content-center border border-dark">
      <div className="row text-center">
        <div className="col">
          Available
        </div>
      </div>
      <div className="row text-center border-bottom border-dark">
        {props.banker.available.map((e, i) => (
          <div key={i} className="col">
            <b>{String.fromCharCode('A'.charCodeAt(0) + i)}</b>
          </div>
        ))}
      </div>
      <div className="row text-center p-1">
        {props.banker.available.map((e, i) => (
          <CellContent
            key = {i}
            text = {e}
            increment = {() => {incrementAvailable(i)}}
            decrement = {() => {decrementAvailable(i)}}
          />
        ))}
      </div>
    </div>
      
    <br/>
    <div className="row">
      <div className="col text-center border border-dark border-bottom-0 m-0 p-1">
        Process Name
      </div>
      <div className="col text-center border border-dark border-bottom-0 m-0 p-1">
        Allocated
      </div>
      <div className="col text-center border border-dark border-bottom-0 m-0 p-1">
        Max
      </div>
    </div>
    
    <div className="row">
      <div className="row col text-center border border-top-0 border-dark m-0 p-1 justify-content-around">
      </div>
      <div className="row col text-center border border-top-0 border-dark m-0 p-1 justify-content-around">
        {props.banker.available.map((e, i) => (
          <div key={i} className="col">
            <b>{String.fromCharCode('A'.charCodeAt(0) + i)}</b>
          </div>
        ))}
      </div>
      <div className="row col text-center border border-top-0 border-dark m-0 p-1 justify-content-around">
        {props.banker.available.map((e, i) => (
          <div key={i} className="col">
            <b>{String.fromCharCode('A'.charCodeAt(0) + i)}</b>
          </div>
        ))}
      </div>
    </div>
  </>)
}

export default Header;