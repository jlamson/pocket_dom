import TurnTracker from "./components/TurnTracker";

export default function Home() {
  return (
    <main className="flex flex-col items-start p-24">
      <h1>PocketDom</h1>
      <TurnTracker />
    </main>
  );
}
