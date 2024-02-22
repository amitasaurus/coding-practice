import TransferList from '../components/TransferList';

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-slate-100">
      <TransferList />
    </div>
  );
}
