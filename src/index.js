import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import Column from './Column';
import Card from './Card';
import AddBtn from './AddBtn';

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

  handleClick(colIndex) {
    const column = this.state.columns[colIndex];

    const input = prompt('Please enter task');

    if (input) {
      column.cards.push({
        task: input
      });

      this.state.columns[colIndex] = column;

      this.setState({
        columns: this.state.columns
      });
    }
  }

  handleMove(destColumn, currentCol, cardIndex) {
    const card = this.state.columns[currentCol].cards.splice(cardIndex, 1)[0];
    this.state.columns[destColumn].cards.push(card);

    this.setState({
      columns: this.state.columns
    });
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
