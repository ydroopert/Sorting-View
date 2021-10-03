import React from 'react'
import './SortingView.css'
import { mergeSort, bubbleSort } from '../algo/SortingAlgo'

const PRIMARY_COLOR = 'aqua';

const SECONDARY_COLOR = 'red';

export default class SortingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 200; i++) {
      array.push(randomIntFromInterval(1, 1000));
    }
    this.setState({ array });
  }

  async bubblesort() {
    // this approach alters the state array

    const arrayBars = document.getElementsByClassName('array-bar')
    let arr = this.state.array;

    const n = arr.length;
    let swapped = true;

    for (let i = 0; i < n && swapped; i++) {
      swapped = false;
      for (let j = 0; j < n - 1 - i; j++) {
        const barOneStyle = arrayBars[j].style;
        const barTwoStyle = arrayBars[j+1].style;
        await changeColor(barOneStyle, barTwoStyle)
        if (arr[j] > arr[j + 1]) {
          swapped = true;
         await swap(arr, j, j + 1);
         this.setState({arr})
        } if(j===(n-2-i)){
          barTwoStyle.backgroundColor = SECONDARY_COLOR
        }
      }
    }
  }

  tester() {
    const array = [];
    console.log({ array })
    console.log(array)
    this.setState({ array });
  }
  mergesort() {
    //this approach does not alter the state array instead alters the DOM height element
    
    const animations = mergeSort(this.state.array);
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 2);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 2);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="arrayContainer">
        {array.map((value, idx) => (
          <div className='array-bar'
            key={idx}
            style={{
              backgroundColor: 'aqua',
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Refresh Array</button>
        <button onClick={() => this.mergesort()}>MergeSort</button>
        <button onClick={() => this.bubblesort()}>BubbleSort</button>
        <button onClick={() => this.tester()}>tester</button>

      </div>
    )
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function  swap(arr,a,b){
  await timeout(2)
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function timeout(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function changeColor(a,b){
  await timeout(2)
  a.backgroundColor = SECONDARY_COLOR;
  b.backgroundColor = SECONDARY_COLOR
  await timeout(2)
  a.backgroundColor = PRIMARY_COLOR;
  b.backgroundColor = PRIMARY_COLOR
}