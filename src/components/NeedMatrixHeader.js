import React from 'react'

export default function NeedMatrixHeader(props) {
  return (
    <div className="row m-0 p-0">
      <div className="col-4 text-center">
        Process Name
      </div>
      <div className="col-8">
        <div className="row text-center">
          <div className="col">
            Needed Resources
          </div>
        </div>
        <div className="row text-center p-1">
          {props.banker.available.map((value, index) => (
            <div key={index} className="col">
              <b>{String.fromCharCode('A'.charCodeAt(0) + index)}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
