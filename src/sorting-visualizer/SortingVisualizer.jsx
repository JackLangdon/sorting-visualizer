import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      message: '',
    };
  }

  componentDidMount() {
    this.newArray();
  }

  newArray = () => {
    const array = [];

    for (let i = 0; i < 800; i += 10) {
      array.push(this.ranNum());
    }

    this.setState({
      array: array,
      message: 'Choose an algorithm to sort with!',
    });
  };

  ranNum = () => {
    return Math.floor(Math.random() * 490 + 11);
  };

  updateDOM = (stepArray, stepCounter, count) => {
    let runningCount = count;

    if (count < stepCounter) {
      setTimeout(() => {
        this.setState({ array: stepArray[count] });
        runningCount++;
        this.updateDOM(stepArray, stepCounter, runningCount);
      }, 10);
    } else {
      this.setState({
        message: `Sort complete in ${stepCounter} steps! Reset Array and try another algorithm!`,
      });
    }
  };

  bubbleSort = () => {
    this.setState({ message: 'Bubble Sorting!' });
    let newArray = this.state.array.map((value) => {
      return value;
    });
    let stepArray = [];
    let stepCounter = 0;
    let count = 0;

    for (let i = newArray.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (newArray[j] < newArray[j + 1]) {
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;

          // The original code here was: stepArray.push(newArray);
          // However trying to push newArray to stepArray seems to only push the final, completely sorted array to the stepArray each time. This means from a visual perspective, the array is sorted instantly while the program continues to iterate over the stepArray for the full length of time, not updating the DOM.
          // To overcome this, another array; "tempArray", was created where each updated newArray was iterated over and pushed.
          // No idea why this is necessary, but at least it works now.
          let tempArray = [];
          for (i = 0; i < newArray.length; i++) {
            tempArray.push(newArray[i]);
          }
          stepArray.push(tempArray);

          // PUSH NEW ARRAY TO STEP ARRAY
          stepCounter++;
        }
      }
    }

    this.updateDOM(stepArray, stepCounter, count);
  };

  insertionSort = () => {
    this.setState({ message: 'Insertion Sorting!' });
    let newArray = this.state.array.map((value) => {
      return value;
    });
    let stepArray = [];
    let stepCounter = 0;
    let count = 0;

    for (let i = 0; i < newArray.length; i++) {
      // INNER FOR-LOOP VERSION
      // for (let j = i; j > 0; j--) {
      //   if (j > 0 && newArray[j] > newArray[j - 1]) {
      //     let temp = newArray[j];
      //     newArray[j] = newArray[j - 1];
      //     newArray[j - 1] = temp;
      //     // Build tempArray from current newArray
      //     let tempArray = [];
      //     for (let k = 0; k < newArray.length; k++) {
      //       tempArray.push(newArray[k]);
      //     }
      //     stepArray.push(tempArray);
      //     // // PUSH NEW ARRAY TO STEP ARRAY
      //     stepCounter++;
      //   }
      // }

      // INNER WHILE-LOOP VERSION
      let j = i;
      while (j >= 0 && newArray[j] > newArray[j - 1]) {
        let temp = newArray[j];
        newArray[j] = newArray[j - 1];
        newArray[j - 1] = temp;

        // Build tempArray from current newArray
        let tempArray = [];
        for (let k = 0; k < newArray.length; k++) {
          tempArray.push(newArray[k]);
        }
        stepArray.push(tempArray);

        // PUSH NEW ARRAY TO STEP ARRAY
        stepCounter++;
        j--;
      }
    }

    this.updateDOM(stepArray, stepCounter, count);
  };

  selectionSort = () => {
    alert('Selection sort!');
  };

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className="bar-container">
          {array.map((value, index) => (
            <div
              className="bar"
              key={`${index}`}
              style={{ height: `${value}px`, marginLeft: `${index * 10}px` }}
            ></div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={() => this.newArray()}>Reset Array</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.insertionSort()}>Insertion Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
        </div>
        <div className="message-container">{this.state.message}</div>
      </div>
    );
  }
}

export default SortingVisualizer;
