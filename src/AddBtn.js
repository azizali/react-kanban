import React from 'react'

export default function({ clickHandler }) {
  return (
    <button
      className="btn btn-light mt-2  border-secondary btn-block"
      onClick={clickHandler}>
      + Add a Card
    </button>
  )
}