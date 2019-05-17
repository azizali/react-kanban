import React, { useState } from 'react'
import produce from 'immer'

import columnsData from '../columnsData'

import Header from './Header'
import Column from './Column'
import Card from './Card'
import AddBtn from './AddBtn'

export default function Board() {
  const [columns, setColumns] = useState(columnsData)

  const handleEdit = (colIndex, cardIndex) => {
    const { task } = columns[colIndex].cards[cardIndex]
    const input = prompt('Please change the task', task)

    if (input && input !== task) {
      const nextState = produce(columns, (draftColumns) => {
        draftColumns[colIndex].cards[cardIndex].task = input
      })
      setColumns(nextState)
    }
  }

  const handleClick = (colIndex) => {
    const input = prompt('Please enter task')

    if (input) {
      const nextState = produce(columns, (draftColumns) => {
        const column = draftColumns[colIndex]
        column.cards.push({
          task: input
        })
      })

      setColumns(nextState)
    }
  }

  const handleMove = (destColumn, currentCol, cardIndex) => {
    const nextState = produce(columns, (draftColumns) => {
      const card = draftColumns[currentCol].cards.splice(cardIndex, 1)[0]
      draftColumns[destColumn].cards.push(card)
    })

    setColumns(nextState)
  }

  const columnSize = columns.length

  return (
    <div className="container mt-4">
      <Header />
      <div className="row">
        {columns.map(({ name, color, cards }, colIndex) => (
          <Column key={colIndex} name={name} color={color}>
            {cards.map(({ task }, cardIndex) => (
              <Card
                key={cardIndex}
                isFirstColumn={colIndex !== 0}
                isLastColumn={colIndex < columnSize - 1}
                moveLeftCb={handleMove.bind(this, colIndex - 1, colIndex, cardIndex)}
                moveRightCb={handleMove.bind(this, colIndex + 1, colIndex, cardIndex)}
                editCardCb={handleEdit.bind(this, colIndex, cardIndex)}
                task={task}
              />
            ))}
            <AddBtn clickHandler={handleClick.bind(this, colIndex)} />
          </Column>
        ))}
      </div>
    </div>
  )
}
