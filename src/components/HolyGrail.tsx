type Props = {
  children: React.ReactNode;
};

export default function HolyGrail({ children }: Props) {
  return (
    <div className="grid w-screen h-screen grid-cols-6 grid-rows-12 bg-slate-50">
      <header className="col-span-6 text-white bg-indigo-500">Header</header>
      <nav className="col-span-1 bg-orange-300 row-span-10">Navigation</nav>
      <main className="col-span-4 row-span-10">{children}</main>
      <aside className="col-span-1 bg-green-400 row-span-10">Sidebar</aside>
      <footer className="col-span-6 text-white bg-slate-800">Footer</footer>
    </div>
  );
}

// <HolyGrail>Page's Main Content</HolyGrail>
