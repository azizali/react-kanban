import React from 'react';

export default function Card({ task, moveLeftCb, moveRightCb, isFirstColumn, isLastColumn, editCardCb }) {
  return (
    <div
      onDoubleClick={editCardCb}
      className="border d-flex justify-content-between p-2 bg-white">
      {
        isFirstColumn
        &&
        <button
          className="btn btn-light strong"
          onClick={moveLeftCb}>
          &lt;
        </button>
      }
      <div className="flex-grow-1 text-center">{task}</div>
      {
        isLastColumn
        &&
        <button
          className="btn btn-light strong"
          onClick={moveRightCb}>
          &gt;
        </button>
      }
    </div>
  );
}
