import React from 'react';

export default function Column({ name, children, color }) {
  return (
    <div name="name" className="col-3">
      <div className="border p-2 col-header" style={{ backgroundColor: color }}>
        {name}
      </div>
      {children}
    </div>
  );
}
