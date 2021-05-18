import React from 'react'

export default function NeedMatrixRow(props) {
  return (
    <div className="row m-0 p-0">
      <div className="col-4 text-center border border-dark border-bottom-0 border-start-0 m-0 p-1 justify-content-around">
        P{props.index}
      </div>
      <div className="row col-8 text-center border border-dark border-bottom-0 border-end-0 m-0 p-1 justify-content-around">
        {props.needVector.map((resourceNeed, resourceIndex) => (
            <div className="col" key={resourceIndex}>
              {resourceNeed}
            </div>
          )
        )}
      </div>
    </div>
  )
}
