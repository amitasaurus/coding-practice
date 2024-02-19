import { useState } from 'react';
import Button from './Button';

type Props = {};

export default function Counter({}: Props) {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center p-4 border border-dashed border-slate-300">
      <Button
        className="bg-green-400 hover:bg-green-500"
        onClick={() => setCount(count + 1)}
      >
        +
      </Button>
      <div className="text-xl text-slate-800 w-[32px]">{count}</div>
      <Button
        className="bg-rose-500 hover:bg-rose-600"
        onClick={() => setCount(count - 1)}
      >
        -
      </Button>
    </div>
  );
}
