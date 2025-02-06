import Leaderboard from '../components/Leaderboard';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/SideBar';

export default function page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow px-4 py-6 bg-gray-50">
        <SearchBar />
        <div className="border rounded p-4 shadow-md">
          {/* Meme feed goes here */}
        </div>
      </main>
      <Leaderboard />
    </div>
  );
}
