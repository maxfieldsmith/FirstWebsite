import React from "react";
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
  getInsertionSortAnimations,
  getRadixSortAnimations,
} from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = "brown";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "black";

//const SWAP_COLOR = "green";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isRunning: false,
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  handleChange(yes) {
    this.setState({ array: this.state.array, isRunning: yes });
  }

  generateArray() {
    let newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 250));
    }
    this.setState({ array: newArray });
  }

  clickHelper() {}

  mergeSort() {
    let elem_sort = document.getElementById("current-sort");
    let elem_time = document.getElementById("time-complexity");
    let elem_space = document.getElementById("space-complexity");
    let elem_pros = document.getElementById("pros");
    let elem_cons = document.getElementById("cons");

    elem_sort.innerHTML = "Merge Sort";
    elem_time.innerHTML = "Time Complexity: O(nlog(n))";
    elem_space.innerHTML = "Space Complexity: O(n)";
    elem_pros.innerHTML =
      "Pros: Can be applied to files of any size. Consistent running time, carries out different bits with similar times in a stage.";
    elem_cons.innerHTML =
      "Cons: Uses more memory soace to store the sub elements of the initial split list. Goes through whole process even if the list is sorted.";

    let ass = document.getElementsByClassName("disable-buttons");
    for (let i = 0; i < ass.length; i++) {
      ass[i].style.cursor = "pointer";
      ass[i].disabled = true;
    }
    const animations = getMergeSortAnimations(this.state.array);
    setTimeout(() => {
      for (let i = 0; i < ass.length; i++) {
        ass[i].style.cursor = "auto";
        ass[i].disabled = false;
      }
    }, animations.length * ANIMATION_SPEED_MS + 9);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    let elem_sort = document.getElementById("current-sort");
    let elem_time = document.getElementById("time-complexity");
    let elem_space = document.getElementById("space-complexity");
    let elem_pros = document.getElementById("pros");
    let elem_cons = document.getElementById("cons");

    elem_sort.innerHTML = "Insertion Sort";
    elem_time.innerHTML = "Time Complexity: O(n^2)";
    elem_space.innerHTML = "Space Complexity: O(1)";
    elem_pros.innerHTML =
      "Pros: Very simplistic. Sorts in place so no need for additional storage.";
    elem_cons.innerHTML =
      "Cons: Does not deal well with a huge array. Requires n-squared steps for every n number of elements to be sorted";

    let ass = document.getElementsByClassName("disable-buttons");
    for (let i = 0; i < ass.length; i++) {
      ass[i].style.cursor = "pointer";
      ass[i].disabled = true;
    }
    const animations = getInsertionSortAnimations(this.state.array);

    setTimeout(() => {
      for (let i = 0; i < ass.length; i++) {
        ass[i].style.cursor = "auto";
        ass[i].disabled = false;
      }
    }, animations.length * ANIMATION_SPEED_MS + 9);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, changeFlag] = animations[i];
      let color = PRIMARY_COLOR;
      switch (changeFlag) {
        case 0:
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          color = SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 1:
          const barOneStyle1 = arrayBars[barOneIdx].style;
          const barTwoStyle1 = arrayBars[barTwoIdx].style;
          color = PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle1.backgroundColor = color;
            barTwoStyle1.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 2:
          /*
           * NEED TO COMPLETE
           * FIX COLOR UPDATE WHEN SWITCH HAS BEEN MADE
           */
          color = PRIMARY_COLOR;
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            barOneStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    let elem_sort = document.getElementById("current-sort");
    let elem_time = document.getElementById("time-complexity");
    let elem_space = document.getElementById("space-complexity");
    let elem_pros = document.getElementById("pros");
    let elem_cons = document.getElementById("cons");

    elem_sort.innerHTML = "Quick Sort";
    elem_time.innerHTML = "Time Complexity: O(nlog(n))";
    elem_space.innerHTML = "Space Complexity: O(nlog(n))";
    elem_pros.innerHTML =
      "Pros: Able to deal with a very large list of items. Sorts in place so no additional storage is required.";
    elem_cons.innerHTML =
      "Cons: Its worst-case performance is similar to bubble and insertion sort.";

    let ass = document.getElementsByClassName("disable-buttons");
    for (let i = 0; i < ass.length; i++) {
      ass[i].style.cursor = "pointer";
      ass[i].disabled = true;
    }
    const animations = getQuickSortAnimations(this.state.array);
    setTimeout(() => {
      for (let i = 0; i < ass.length; i++) {
        ass[i].style.cursor = "auto";
        ass[i].disabled = false;
      }
    }, animations.length * ANIMATION_SPEED_MS + 9);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, changeFlag] = animations[i];
      let color = PRIMARY_COLOR;
      switch (changeFlag) {
        case 0:
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          color = SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 1:
          const barOneStyle1 = arrayBars[barOneIdx].style;
          const barTwoStyle1 = arrayBars[barTwoIdx].style;
          color = PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle1.backgroundColor = color;
            barTwoStyle1.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 2:
          /*
           * NEED TO COMPLETE
           * FIX COLOR UPDATE WHEN SWITCH HAS BEEN MADE
           */
          color = PRIMARY_COLOR;
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            barOneStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
    }
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    let elem_sort = document.getElementById("current-sort");
    let elem_time = document.getElementById("time-complexity");
    let elem_space = document.getElementById("space-complexity");
    let elem_pros = document.getElementById("pros");
    let elem_cons = document.getElementById("cons");

    elem_sort.innerHTML = "Heap Sort";
    elem_time.innerHTML = "Time Complexity: O(nlog(n))";
    elem_space.innerHTML = "Space Complexity: O(1)";
    elem_pros.innerHTML =
      "Pros: Memory usage is minimal. Performs equally well in the best, average, and worst cases.";
    elem_cons.innerHTML =
      "Cons: Unstable sort - migth rearrange the relative order of the initial array.";

    let ass = document.getElementsByClassName("disable-buttons");
    for (let i = 0; i < ass.length; i++) {
      ass[i].style.cursor = "pointer";
      ass[i].disabled = true;
    }
    const animations = getHeapSortAnimations(this.state.array);
    setTimeout(() => {
      for (let i = 0; i < ass.length; i++) {
        ass[i].style.cursor = "auto";
        ass[i].disabled = false;
      }
    }, animations.length * ANIMATION_SPEED_MS + 9);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, changeFlag] = animations[i];
      let color = PRIMARY_COLOR;
      switch (changeFlag) {
        case 0:
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          color = SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 1:
          const barOneStyle1 = arrayBars[barOneIdx].style;
          const barTwoStyle1 = arrayBars[barTwoIdx].style;
          color = PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle1.backgroundColor = color;
            barTwoStyle1.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 2:
          /*
           * NEED TO COMPLETE
           * FIX COLOR UPDATE WHEN SWITCH HAS BEEN MADE
           */
          color = PRIMARY_COLOR;
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            barOneStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
    }
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    let elem_sort = document.getElementById("current-sort");
    let elem_time = document.getElementById("time-complexity");
    let elem_space = document.getElementById("space-complexity");
    let elem_pros = document.getElementById("pros");
    let elem_cons = document.getElementById("cons");

    elem_sort.innerHTML = "Bubble Sort";
    elem_time.innerHTML = "Time Complexity: O(n^2)";
    elem_space.innerHTML = "Space Complexity: O(1)";
    elem_pros.innerHTML =
      "Pros: Very easy to implement. Elements are swapped in place so no need for additional storage";
    elem_cons.innerHTML =
      "Cons: Does not deal well with a huge array. Requires n-squared steps for every n number of elements to be sorted";

    let ass = document.getElementsByClassName("disable-buttons");
    for (let i = 0; i < ass.length; i++) {
      ass[i].style.cursor = "pointer";
      ass[i].disabled = true;
    }
    const animations = getBubbleSortAnimations(this.state.array);
    setTimeout(() => {
      for (let i = 0; i < ass.length; i++) {
        ass[i].style.cursor = "auto";
        ass[i].disabled = false;
      }
    }, animations.length * ANIMATION_SPEED_MS + 9);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, changeFlag] = animations[i];
      let color = PRIMARY_COLOR;
      switch (changeFlag) {
        case 0:
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          color = SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 1:
          const barOneStyle1 = arrayBars[barOneIdx].style;
          const barTwoStyle1 = arrayBars[barTwoIdx].style;
          color = PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle1.backgroundColor = color;
            barTwoStyle1.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 2:
          /*
           * NEED TO COMPLETE
           * FIX COLOR UPDATE WHEN SWITCH HAS BEEN MADE
           */
          color = PRIMARY_COLOR;
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            barOneStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
    }
  }

  radixSort() {
    let elem_sort = document.getElementById("current-sort");
    let elem_time = document.getElementById("time-complexity");
    let elem_space = document.getElementById("space-complexity");
    let elem_pros = document.getElementById("pros");
    let elem_cons = document.getElementById("cons");

    elem_sort.innerHTML = "Radix Sort";
    elem_time.innerHTML = "Time Complexity: O(nk)";
    elem_space.innerHTML = "Space Complexity: O(n + k)";
    elem_pros.innerHTML =
      "Pros: Stable sort as relative order of elements with equal values is maintained. Sorts in linear time - fast.";
    elem_cons.innerHTML =
      "Cons: Depends on digits or letters so is less flexible than other sorts. Not an in-place sorting algorithm - requires additional space";

    let ass = document.getElementsByClassName("disable-buttons");
    for (let i = 0; i < ass.length; i++) {
      ass[i].style.cursor = "pointer";
      ass[i].disabled = true;
    }
    const animations = getRadixSortAnimations(this.state.array);
    setTimeout(() => {
      for (let i = 0; i < ass.length; i++) {
        ass[i].style.cursor = "auto";
        ass[i].disabled = false;
      }
    }, animations.length * ANIMATION_SPEED_MS + 9);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, changeFlag] = animations[i];
      let color = PRIMARY_COLOR;
      switch (changeFlag) {
        case 0:
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          color = SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 1:
          const barOneStyle1 = arrayBars[barOneIdx].style;
          const barTwoStyle1 = arrayBars[barTwoIdx].style;
          color = PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle1.backgroundColor = color;
            barTwoStyle1.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        case 2:
          /*
           * NEED TO COMPLETE
           * FIX COLOR UPDATE WHEN SWITCH HAS BEEN MADE
           */
          color = PRIMARY_COLOR;
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            barOneStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { array: array1, isRunning } = this.state;

    const cursor = isRunning ? "auto" : "pointer";

    const color = isRunning
      ? "rgba(158, 158, 158, 0.8)"
      : "rgba(228, 252, 222, 0.76)";

    return (
      <div className="float-container">
        <div className="float-child info">
          <h1>Sorting Visualizer</h1>
          <div className="sort-buttons">
            <button
              style={{ backgroundColor: color, cursor: cursor }}
              className="disable-buttons"
              onClick={!isRunning ? () => this.insertionSort() : null}
            >
              Insertion Sort
            </button>
            <button
              style={{ backgroundColor: color, cursor: cursor }}
              className="disable-buttons"
              onClick={!isRunning ? () => this.bubbleSort() : null}
            >
              Bubble Sort
            </button>
            <button
              style={{ backgroundColor: color, cursor: cursor }}
              className="disable-buttons"
              onClick={!isRunning ? () => this.mergeSort() : null}
            >
              Merge Sort
            </button>
            <button
              className="disable-buttons"
              style={{ backgroundColor: color, cursor: cursor }}
              onClick={!isRunning ? () => this.quickSort() : null}
            >
              Quick Sort
            </button>
            <button
              className="disable-buttons"
              style={{ backgroundColor: color, cursor: cursor }}
              onClick={!isRunning ? () => this.heapSort() : null}
            >
              Heap Sort
            </button>
            <button
              className="disable-buttons"
              style={{ backgroundColor: color, cursor: cursor }}
              onClick={!isRunning ? () => this.radixSort() : null}
            >
              Radix Sort
            </button>
          </div>
          <div className="sort-info">
            <h2 id="current-sort">Sorting Algorithm</h2>
            <ul>
              <li id="time-complexity">Time Complexity: </li>
              <li id="space-complexity">Space Complexity: </li>
              <li id="pros">Pros: </li>
              <li id="cons">Cons: </li>
            </ul>
          </div>
        </div>
        <div className="float-child array">
          <div className="array-container">
            {array1.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}
              ></div>
            ))}
          </div>
          <div className="generate-reset">
            <button
              style={{ backgroundColor: color, cursor: cursor }}
              className="generate-reset-button disable-buttons"
              onClick={!isRunning ? () => this.generateArray() : null}
            >
              Generate New Array
            </button>
            <button
              className="generate-reset-button"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//background: linear-gradient(to bottom right, #9ee954, #e9f9d9);

/*
  TODO: create a flag after first sort to create a new array once another sort
        is pressed

  TRY: create a flag in this.state 

  What to think about:
      -

  Leaving thoughts:
      - if this.state.generateNew === 1 {generateArray();} else {setState({ generateNew: 1 })}
*/
