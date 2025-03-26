import Authors from "./(admin)/authors/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-screen min-h-screen">
      <Authors />
    </div>
  );
}
