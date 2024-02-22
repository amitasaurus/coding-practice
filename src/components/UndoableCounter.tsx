import React, { useState } from 'react';
import ButtonPrimitive from './Button';
import cn from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

type Props = {};

type TOperation = {
  operation: string;
  old: number;
  new: number;
};

enum EAction {
  UNDO,
  REDO,
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      {...props}
      className={cn(
        'text-sm font-bold tracking-wide uppercase hover:bg-indigo-500 hover:text-white bg-slate-100',
        className
      )}
    >
      {children}
    </ButtonPrimitive>
  );
}

export default function UndoableCounter({}: Props) {
  const [result, setResult] = useState(0);
  const [cursor, setCursor] = useState<number | null>(null);
  const [history, setHistory] = useState<Array<TOperation>>([]);
  const [deletedHistory, setDeletedHistory] = useState<Array<TOperation>>([]);

  function resetCounter() {
    setHistory([]);
    setCursor(null);
    setResult(0);
  }
  function handleHistory(action: EAction) {
    let currentHistory: TOperation | undefined;
    let cursorPos = cursor;
    let historyClone = [...history];
    let deletedHistoryClone = [...deletedHistory];
    switch (action) {
      case EAction.UNDO:
        if (history.length === 0) return;
        if (!cursorPos) cursorPos = 0;
        currentHistory = historyClone.shift();
        setHistory(historyClone);
        if (currentHistory) {
          deletedHistoryClone.push(currentHistory);
          setResult(currentHistory?.old);
          setDeletedHistory(deletedHistoryClone.reverse());
        }
        break;
      case EAction.REDO:
        if (deletedHistory.length === 0) return;
        const restoreHistory = deletedHistoryClone.shift();
        if (restoreHistory) {
          historyClone.unshift(restoreHistory);
          setResult(restoreHistory?.new);
        }
        setHistory(historyClone);
        setDeletedHistory(deletedHistoryClone);
        break;
      default:
        break;
    }
  }
  function handleMath(operation: string) {
    switch (operation) {
      case '/2':
        setHistory(
          [
            ...history,
            ...[
              {
                operation: '/2',
                old: result,
                new: result / 2,
              },
            ],
          ].reverse()
        );
        setResult(result / 2);
        break;
      case '-1':
        setHistory(
          [
            ...history,
            ...[
              {
                operation: '-1',
                old: result,
                new: result - 1,
              },
            ],
          ].reverse()
        );
        setResult(result - 1);
        break;
      case '+1':
        setHistory(
          [
            ...history,
            ...[
              {
                operation: '+1',
                old: result,
                new: result + 1,
              },
            ],
          ].reverse()
        );
        setResult(result + 1);
        break;
      case 'x2':
        setHistory(
          [
            ...history,
            ...[
              {
                operation: 'x2',
                old: result,
                new: result * 2,
              },
            ],
          ].reverse()
        );
        setResult(result * 2);
        break;
      default:
        break;
    }
  }
  return (
    <div className="w-1/3 p-4 bg-white rounded shadow-sm">
      <div className="flex items-center justify-center">
        <Button onClick={() => handleHistory(EAction.UNDO)}>Undo</Button>
        <Button className="mx-2" onClick={() => handleHistory(EAction.REDO)}>
          Redo
        </Button>
        <Button onClick={resetCounter}>Reset</Button>
      </div>
      <div className="my-8 text-5xl font-light text-center text-slate-800">
        {result}
      </div>
      <div className="flex items-center justify-center">
        <Button className="bg-slate-200" onClick={() => handleMath('/2')}>
          /2
        </Button>
        <Button className="ml-2 bg-slate-200" onClick={() => handleMath('-1')}>
          -1
        </Button>
        <Button className="mx-2 bg-slate-200" onClick={() => handleMath('+1')}>
          +1
        </Button>
        <Button className="bg-slate-200" onClick={() => handleMath('x2')}>
          x2
        </Button>
      </div>
      <table className="w-full mt-8 table-fixed">
        <thead>
          <tr>
            <th>Operation</th>
            <th>Old</th>
            <th>New</th>
          </tr>
        </thead>
        <tbody>
          {history.map((e, i) => (
            <tr key={i}>
              <td>{e.operation}</td>
              <td>{e.old}</td>
              <td>{e.new}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
