import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import Column from './Column';
import Card from './Card';
import AddBtn from './AddBtn';
import produce from 'immer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'To dos',
          color: '#be6dd0',
          cards: [
            {
              task: 'Setup app layout'
            },
            {
              task: 'Learn about state'
            },
            {
              task: 'Learn about using events'
            },
            {
              task: 'keep building'
            }
          ]
        },
        {
          name: 'Blocked',
          color: '#d63d3d',
          cards: [
            {
              task: 'B 1'
            },
            {
              task: 'B 2 '
            }
          ]
        },
        {
          name: 'Doing',
          color: '#344759',
          cards: [
            {
              task: 'T 1'
            },
            {
              task: 'T 2'
            }
          ]
        },
        {
          name: 'Done',
          color: '#55ce36',
          cards: [
            {
              task: 'G 1'
            },
            {
              task: 'G 2'
            }
          ]
        }
      ]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  handleEdit = (colIndex, cardIndex) => {
    const { task } = this.state.columns[colIndex].cards[cardIndex]
    const input = prompt('Please change the task', task);

    if (input && input !== task) {
      const nextState = produce(this.state, (draft) => {
        draft.columns[colIndex].cards[cardIndex].task = input
      })
      this.setState(() => nextState)
    }
  }

  handleClick(colIndex) {

    const input = prompt('Please enter task');

    if (input) {
      const nextState = produce(this.state, (draft) => {
        const column = draft.columns[colIndex];
        column.cards.push({
          task: input
        });

      })

      this.setState(() => nextState);
    }
  }

  handleMove(destColumn, currentCol, cardIndex) {
    const nextState = produce(this.state, (draft) => {
      const card = draft.columns[currentCol].cards.splice(cardIndex, 1)[0];
      draft.columns[destColumn].cards.push(card);

    })

    this.setState(() => nextState);
  }

  render() {
    const { columns } = this.state;
    const columnSize = columns.length;
    return (
      <div className="container mt-4">
        <div className="row text-center">
          <div className="col">
            <h1>Kanban Board</h1>
            <p className="lead">Perfect way to stay organized</p>
            <hr />
          </div>
        </div>
        <div className="row">
          {columns.map(({ name, color, cards }, columnIndex) => {
            return (
              <Column key={columnIndex} name={name} color={color}>
                {cards.map(({ task }, cardIndex) => {
                  return (
                    <Card
                      key={cardIndex}
                      leftEnabled={columnIndex !== 0 ? true : false}
                      rightEnabled={columnIndex < columnSize - 1 ? true : false}
                      moveLeftCb={() => {
                        this.handleMove(columnIndex - 1, columnIndex, cardIndex);
                      }}
                      moveRightCb={() => {
                        this.handleMove(columnIndex + 1, columnIndex, cardIndex);
                      }}
                      editCardCb={() => { this.handleEdit(columnIndex, cardIndex) }}
                      task={task}
                    />
                  );
                })}
                <AddBtn
                  clickHandler={() => {
                    this.handleClick(columnIndex);
                  }}
                />
              </Column>
            );
          })}
        </div>
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));
