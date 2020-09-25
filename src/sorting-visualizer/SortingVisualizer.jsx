import React from 'react';
import './SortingVisualizer.css';

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      message: '',
      STEP_SPEED: 20,
      NUM_OF_BARS: 50,
      tempArray: [],
      steps: 0,
    };
  }

  componentDidMount() {
    this.newArray();
  }

  newArray = () => {
    const array = [];

    for (let i = 0; i < 800; i += 800 / this.state.NUM_OF_BARS) {
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
      }, this.state.STEP_SPEED);
    } else {
      this.setState({
        message: `Sort complete! Reset Array and try another algorithm!`,
      });
    }
  };

  updateDOMMerge = (stepArray, count) => {
    let runningCount = count;

    if (count < stepArray.length) {
      setTimeout(() => {
        this.setState({ array: stepArray[count] });
        runningCount++;
        this.updateDOMMerge(stepArray, runningCount);
      }, this.state.STEP_SPEED);
    } else {
      this.setState({
        message: `Sort complete! Reset Array and try another algorithm!`,
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

    for (let i = 0; i < newArray.length; i++) {
      for (let j = newArray.length; j >= i; j--) {
        if (newArray[j] < newArray[j + 1]) {
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;

          // Later algorithms use newArray.map() method to push each update to the step array. This is essentially the same but more concise.
          let tempArray = [];
          for (let k = 0; k < newArray.length; k++) {
            tempArray.push(newArray[k]);
          }
          stepArray.push(tempArray);

          // Increment step counter
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

        // Update step array
        stepArray.push(
          newArray.map((value) => {
            return value;
          })
        );

        // Increment step counter
        stepCounter++;
        j--;
      }
    }

    this.updateDOM(stepArray, stepCounter, count);
  };

  selectionSort = () => {
    this.setState({ message: 'Selection Sorting!' });
    let newArray = this.state.array.map((value) => {
      return value;
    });
    let stepArray = [];
    let stepCounter = 0;
    let count = 0;

    for (let i = 0; i < newArray.length; i++) {
      let biggest = i;
      for (let j = i; j < newArray.length; j++) {
        if (newArray[j] > newArray[biggest]) {
          biggest = j;
        }
      }

      let temp = newArray[i];
      newArray[i] = newArray[biggest];
      newArray[biggest] = temp;

      // Update step array
      stepArray.push(
        newArray.map((value) => {
          return value;
        })
      );

      // Increment step counter
      stepCounter++;
    }

    this.updateDOM(stepArray, stepCounter, count);
  };

  shellSort = () => {
    this.setState({ message: 'Shell Sorting!' });
    let newArray = this.state.array.map((value) => {
      return value;
    });
    let stepArray = [];
    let stepCounter = 0;
    let count = 0;

    let inner, outer, temp;
    let interval = 1;

    while (interval <= newArray.length / 3) {
      interval = interval * 3 + 1;
    }
    while (interval > 0) {
      for (outer = interval; outer < newArray.length; outer++) {
        temp = newArray[outer];

        inner = outer;

        while (inner > interval - 1 && newArray[inner - interval] < temp) {
          newArray[inner] = newArray[inner - interval];

          inner -= interval;

          // Increment step counter
          stepCounter++;

          // Update step array
          stepArray.push(
            newArray.map((value) => {
              return value;
            })
          );
        }

        newArray[inner] = temp;

        // Increment step counter
        stepCounter++;

        // Update step array
        stepArray.push(
          newArray.map((value) => {
            return value;
          })
        );
      }

      interval = (interval - 1) / 3;
    }
    this.updateDOM(stepArray, stepCounter, count);
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
              style={{
                height: `${value}px`,
                width: `${800 / this.state.NUM_OF_BARS - 2}px`,
                marginLeft: `${index * (800 / this.state.NUM_OF_BARS)}px`,
              }}
            ></div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={() => this.newArray()}>Reset Array</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.insertionSort()}>Insertion Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
          <button onClick={() => this.shellSort()}>Shell Sort</button>
        </div>
        <div className="message-container">{this.state.message}</div>
      </div>
    );
  }
}

export default SortingVisualizer;
