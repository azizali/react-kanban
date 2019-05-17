import React from 'react'
import produce from 'immer'

import columnsData from '../columnsData'
import Header from './Header'
import Column from './Column'
import Card from './Card'
import AddBtn from './AddBtn'

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: columnsData
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMove = this.handleMove.bind(this)
  }

  handleEdit = (colIndex, cardIndex) => {
    const { task } = this.state.columns[colIndex].cards[cardIndex]
    const input = prompt('Please change the task', task)

    if (input && input !== task) {
      const nextState = produce(this.state, (draft) => {
        draft.columns[colIndex].cards[cardIndex].task = input
      })
      this.setState(() => nextState)
    }
  }

  handleClick(colIndex) {
    const input = prompt('Please enter task')

    if (input) {
      const nextState = produce(this.state, (draft) => {
        const column = draft.columns[colIndex]
        column.cards.push({
          task: input
        })

      })

      this.setState(() => nextState)
    }
  }

  handleMove(destColumn, currentCol, cardIndex) {
    const nextState = produce(this.state, (draft) => {
      const card = draft.columns[currentCol].cards.splice(cardIndex, 1)[0]
      draft.columns[destColumn].cards.push(card)

    })

    this.setState(() => nextState)
  }

  render() {
    const { columns } = this.state
    const columnSize = columns.length
    return (
      <div className="container mt-4">
        <Header />
        <div className="row">
          {columns.map(({ name, color, cards }, columnIndex) => {
            return (
              <Column key={columnIndex} name={name} color={color}>
                {cards.map(({ task }, cardIndex) => {
                  return (
                    <Card
                      key={cardIndex}
                      isFirstColumn={columnIndex !== 0 ? true : false}
                      isLastColumn={columnIndex < columnSize - 1 ? true : false}
                      moveLeftCb={() => {
                        this.handleMove(columnIndex - 1, columnIndex, cardIndex)
                      }}
                      moveRightCb={() => {
                        this.handleMove(columnIndex + 1, columnIndex, cardIndex)
                      }}
                      editCardCb={() => { this.handleEdit(columnIndex, cardIndex) }}
                      task={task}
                    />
                  )
                })}
                <AddBtn
                  clickHandler={() => {
                    this.handleClick(columnIndex)
                  }}
                />
              </Column>
            )
          })}
        </div>
      </div>
    )
  }
}
