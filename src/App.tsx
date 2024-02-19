import { useEffect } from 'react';
import './App.css';
import Counter from './components/Counter';
import flatten, { runFlatten } from './utils/flatten';
import Stack, { runStack } from './utils/stack';
import Form from './components/Form';
import cycle, { runCycle } from './utils/cycle';
import HolyGrail from './components/HolyGrail';
import { runInsertionSort } from './utils/insertionSort';
import { runTypes } from './utils/types';
import { runDeepClone } from './utils/deepClone';
import MortgageCalculator from './components/MortgageCalculator';
import binaryGap from './utils/binaryGap';
import { runRotation } from './utils/cyclicRotation';
import { runOddOccurences } from './utils/oddOccurences';
import { FrogJmp, PermMissingElem } from './utils/randomCoding';
import binarySearch from './utils/binarySearch';
import countBy from './utils/countBy';
import debounce from './utils/debounce';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
// import './utils/graph';
// import './utils/bfs';
// import './utils/dfs';
// import './utils/queue';
import './utils/classNames';

function App() {
  useEffect(() => {
    /** Flatten Array Solution */
    // runFlatten();
    /** Stack Solution */
    // runStack();
    /** Cycle Solution */
    // runCycle();
    /** Insertion Sort Solution */
    // runInsertionSort();
    /** Types Solution */
    // runTypes();
    /** Deep Clone Solution */
    // runDeepClone();
    /** Binary Gap Solution */
    // binaryGap(529); //15,20
    /** Cyclic Rotation Solution */
    // runRotation();
    /** Odd Occurences Solution */
    // runOddOccurences();
    // console.log('FrogJmp', FrogJmp(10, 85, 30));
    // console.log('PermMissingElem', PermMissingElem([]));
    /** Binary Search Solution */
    // console.log(binarySearch([1, 2, 3, 10, 11, 20], 20));
    // console.log(countBy([6.1, 4.2, 6.3], Math.floor));
    // console.log(countBy(['one', 'two', 'three'], 'length'));
    /*
    const debounceFn = debounce(() => {
      console.log('Called after delay');
    }, 500);
    debounceFn();
    */
  }, []);
  return (
    <>
      {/* <HolyGrail>
        <Counter />
        <Form />
      </HolyGrail> */}
      <div className="flex items-center justify-center w-screen h-screen bg-slate-100">
        {/* <MortgageCalculator /> */}
        <div className="border border-dashed border-slate-300 w-[500px] h-[500px]">
          <Tabs defaultValue="html">
            <TabsList>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="html">This is HTML Tab Content</TabsContent>
            <TabsContent value="css">This is CSS Tab Content</TabsContent>
            <TabsContent value="js">This is JS Tab Content</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
