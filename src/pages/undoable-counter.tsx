import UndoableCounter from '../components/UndoableCounter';

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-slate-100">
      <UndoableCounter />
    </div>
  );
}
