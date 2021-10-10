import React from 'react'
import './SortingView.css'
import { mergeSort, testSort, quickSort } from '../algo/SortingAlgo'

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
  async selectionsort(){
    // this approach alters the state array directly for color and heights instead of making extra animation array
    const arrayBars = document.getElementsByClassName('array-bar')
    let arr = this.state.array;
    console.log(arr)
    const n = arr.length;
    let swapped = true;
    
    for(let i = 0; i< n && swapped; i++){
      const barOneStyle = arrayBars[i].style;
      await timeout(1)
      barOneStyle.backgroundColor = SECONDARY_COLOR
      swapped = false;
      for(let j = i+1; j < n; j++){
        await timeout(1)
        const barTwoStyle = arrayBars[j].style;
        barTwoStyle.backgroundColor = SECONDARY_COLOR

        if(arr[i]> arr[j]){
          swapped = true;
          await swap(arr, i,j)
          this.setState({arr})
        }
        await timeout(1)
        barTwoStyle.backgroundColor = PRIMARY_COLOR
      }
      await timeout(1)
      barOneStyle.backgroundColor = PRIMARY_COLOR
    }
    console.log(arr)
  }
  async insertionsort(){
    // this approach alters the state array directly for color and heights instead of making extra animation array
    const arrayBars = document.getElementsByClassName('array-bar')
    let arr = this.state.array;

    const n = arr.length;

    for(let i = 0; i< n; i++){
      const barOneStyle = arrayBars[i].style;
      await timeout(1)
      barOneStyle.backgroundColor = SECONDARY_COLOR;
      let key = arr[i];
      let j = i-1;

      while(j>=0 && arr[j]>key){
        const barTwoStyle = arrayBars[j].style;
        arr[j+1] = arr[j]
        j=j-1
        this.setState({arr})
        await timeout(1)
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
        await timeout(1)
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }
      arr[j+1] = key
      await timeout(1)
      barOneStyle.backgroundColor = PRIMARY_COLOR;
    }
    console.log(arr)
  }
  async bubblesort() {
    // this approach alters the state array directly for color and heights instead of making extra animation array

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

  async quicksort(){
    const arrayBars = document.getElementsByClassName('array-bar')
    let arr = this.state.array;
    const n = arr.length;
    quickSort(arr,0,n-1)
    console.log(arr)
    this.setState({arr})
  }
  tester() {
    testSort(this.state.array)
  }
  mergesort() {
    //this approach does not alter the state array directly, instead it creates an extra animation array to track animation progress.
    
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
        <button onClick={() => this.selectionsort()}>SelectionSort</button>
        <button onClick={() => this.insertionsort()}>InsertionSort</button>
        <button onClick={() => this.quicksort()}>QuickSort</button>
        <button onClick={() => this.tester()}>tester</button>

      </div>
    )
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function  swap(arr,a,b){
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