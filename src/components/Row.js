import React, { useState } from 'react'
import CellContent from './CellContent';

export default function Row(props) {

  const [allocated, setAllocated] = useState([]);
  const [max, setMax] = useState([]);

  const incrementAllocated = (index) => {
    props.process.incrementAllocated(index);
    setAllocated(props.process.allocated);
    props.hideNeedMatrix();
  }

  const decrementAllocated = (index) => {
    props.process.decrementAllocated(index);
    setAllocated(props.process.allocated);
    props.hideNeedMatrix();
  }

  const incrementMax = (index) => {
    props.process.incrementMax(index);
    setMax(props.process.max);
    props.hideNeedMatrix();
  }

  const decrementMax = (index) => {
    props.process.decrementMax(index);
    setMax(props.process.max);
    props.hideNeedMatrix();
  }
  
  let k = 0;
  return (
    <div className="row">
      <div className="d-flex col text-center border border-dark border-top-0 m-0 p-1 justify-content-around align-items-center">
        P{props.index}
      </div>
      <div className="row col text-center border border-dark border-top-0 m-0 p-1 justify-content-around">
        {props.process.allocated.map((allocatedResource, allocatedResourceIndex) => (
          <CellContent
            key = {k++}
            text = {allocatedResource}
            index = {allocatedResourceIndex}
            increment = {() => {incrementAllocated(allocatedResourceIndex)}}
            decrement = {() => {decrementAllocated(allocatedResourceIndex)}}
          />
        ))}
      </div>
      <div className="row col text-center border border-dark border-top-0 m-0 p-1 justify-content-around">
        {props.process.max.map((maxResource, maxResourceIndex) => (
          <CellContent
            key = {k++}
            text = {maxResource}
            index = {maxResourceIndex}
            increment = {() => {incrementMax(maxResourceIndex)}}
            decrement = {() => {decrementMax(maxResourceIndex)}}
          />
        ))}
      </div>
    </div>
  )
}