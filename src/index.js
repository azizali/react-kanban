import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import React from 'react';
import produce from 'immer';
import ReactDOM from 'react-dom';
// import { render } from 'react-dom';
import Column from './Column';
import Card from './Card';
import AddBtn from './AddBtn';

const columnsData = [
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
];

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      columns: props.columns
    }
  }
  
  handleAddCard = (columnIndex) => {
    const input = prompt('Enter the task');
    console.log('clicked', input)

    const newColumns = produce(this.state.columns, (draftColumns)=>{
      draftColumns[columnIndex].cards.push({
        task: input
      });
    })
    
    this.setState({
      columns: newColumns
    })
  }

  render(){
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
                      task={task}
                    />
                  );
                })}
                <AddBtn clickHandler={()=> { this.handleAddCard(columnIndex) }} />
                {/* <AddBtn clickHandler={this.handleAddCard} /> */}
              </Column>
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App columns={columnsData} />, document.querySelector('#root'));
