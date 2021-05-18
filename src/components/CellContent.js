import React from 'react'

export default function CellContent(props) {

  let k = 0;
  return (
    <div className="col" key={k++}>
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center pe-0">
          {props.text}
        </div>
        <div className="col fs-6 text-center ps-0">
          <div className="row">
            <div className="col p-0">
              <i
                className="fas fa-plus-square fa-lg hover-pointer text-success m-0"
                onClick={props.increment}
              ></i>
            </div>
          </div>
          <div className="row">
            <div className="col p-0">
              <i
                className="fas fa-minus-square fa-lg hover-pointer text-danger m-0"
                onClick={props.decrement}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
