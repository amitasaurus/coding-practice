import React, { useState } from 'react';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
} from 'react-icons/md';

type Props = {};

const defaultListLeft: string[] = ['HTML', 'JS', 'CSS', 'TS'];
const defaultListRight: string[] = ['React', 'Angular', 'Vue', 'Svelte'];

export default function TransferList({}: Props) {
  const [itemsLeft, setItemsLeft] = useState<Array<string>>(defaultListLeft);
  const [itemsRight, setItemsRight] = useState<Array<string>>(defaultListRight);
  const selectedItemsLeft: string[] = [];
  const selectedItemsRight: string[] = [];
  function handleCheckboxClick(
    event: React.ChangeEvent<HTMLInputElement>,
    list: string
  ): void {
    const { id, checked } = event.target;
    if (list === 'left') {
      if (checked) {
        selectedItemsLeft.push(id);
      } else {
        const index = selectedItemsLeft.indexOf(id);
        selectedItemsLeft.splice(index, 1);
      }
    } else {
      if (checked) {
        selectedItemsRight.push(id);
      } else {
        const index = selectedItemsRight.indexOf(id);
        selectedItemsRight.splice(index, 1);
      }
    }
  }
  function handleListTransfer(action: string): void {
    switch (action) {
      case 'ALL_LEFT':
        setItemsLeft([...itemsLeft].concat(itemsRight));
        setItemsRight([]);
        break;
      case 'ALL_RIGHT':
        setItemsRight([...itemsRight].concat(itemsLeft));
        setItemsLeft([]);
        break;
      case 'RIGHT':
        if (selectedItemsLeft.length === 0) return;
        setItemsRight([...itemsRight].concat(selectedItemsLeft));
        setItemsLeft(
          itemsLeft.filter((item) => !selectedItemsLeft.includes(item))
        );
        selectedItemsLeft.length = 0;
        break;
      case 'LEFT':
        if (selectedItemsRight.length === 0) return;
        setItemsLeft([...itemsLeft].concat(selectedItemsRight));
        setItemsRight(
          itemsRight.filter((item) => !selectedItemsRight.includes(item))
        );
        selectedItemsRight.length = 0;
        break;
    }
  }
  return (
    <div className="grid w-1/2 grid-cols-12 p-4 bg-white rounded shadow-sm">
      <div className="flex justify-center col-span-5 border-r border-slate-600">
        <div>
          {itemsLeft.map((e) => (
            <div className="flex items-center justify-start mb-2" key={e}>
              <input
                type="checkbox"
                id={e}
                name={e}
                value={e}
                onChange={(e) => handleCheckboxClick(e, 'left')}
              />
              <label htmlFor={e} className="ml-2 font-semibold text-slate-800">
                {' '}
                {e}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-2">
        <button
          type="button"
          className="p-1 mb-2"
          onClick={() => handleListTransfer('ALL_LEFT')}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button
          type="button"
          className="p-1 mb-2"
          onClick={() => handleListTransfer('LEFT')}
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          type="button"
          className="p-1 mb-2"
          onClick={() => handleListTransfer('RIGHT')}
        >
          <MdKeyboardArrowRight />
        </button>
        <button type="button" className="p-1 mb-2">
          <MdKeyboardDoubleArrowRight
            onClick={() => handleListTransfer('ALL_RIGHT')}
          />
        </button>
      </div>
      <div className="flex justify-center col-span-5 border-l border-slate-600">
        <div>
          {itemsRight.map((e) => (
            <div className="flex items-center justify-start mb-2" key={e}>
              <input
                type="checkbox"
                id={e}
                name={e}
                value={e}
                onChange={(e) => handleCheckboxClick(e, 'right')}
              />
              <label htmlFor={e} className="ml-2 font-semibold text-slate-800">
                {' '}
                {e}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
