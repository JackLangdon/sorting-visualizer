import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      array: [],
    }
  }

  componentDidMount() {
    this.newArray();
  }

  newArray = () => {
    const array = [];

    for (let i = 0; i < 800; i+= 4) {
      array.push(this.ranNum());
    }

    this.setState({
      array: array
    })
  }

  ranNum = () => {
    return Math.floor(Math.random() * 490 + 11);
  }

// This is so inefficient I want to be ill
// But delaying Javascript is a pain
// So this is only to visualise
// Never use in practice
  bubbleSort = () => {

    let newArray = this.state.array;

    for (let i = newArray.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (newArray[j] < newArray[j + 1]) {
            let temp = newArray[j];
            newArray[j] = newArray[j+1];
            newArray[j+1] = temp;
            this.setState({ array: newArray})
            return;
        }
      }
    }
  }

  callBubble = () => {
      let i = 0;
      while (i < this.state.array.length-1) {
        for (let j = 1; j < this.state.array.length; j++) {
          if (this.state.array[i] < this.state.array[j]) {
            setTimeout(() => {this.bubbleSort()}, 5);
          }
        }
        i++;
      }
  }

  insertionSort = (array) => {
    alert('Insertion!')
  }

  selectionSort = (array) => {
    alert('Selection!')
  }

  render() {
    const {array} = this.state;

    return (
      <div>
        <div className="container">
          {array.map((value, index) =>
              <div
                className="bar"
                key={`${index}`}
                style={{height: `${value}px`, marginLeft: `${index * 4}px`}}
                >
              </div>
            )}
         </div>
         <button onClick={() => this.newArray()}>Reset Array</button>
         <button onClick={() => this.callBubble()}>Bubble Sort</button>
         <button onClick={() => this.insertionSort()}>Insertion Sort</button>
         <button onClick={() => this.selectionSort()}>Selection Sort</button>
      </div>
    );
  }
}

export default SortingVisualizer;
