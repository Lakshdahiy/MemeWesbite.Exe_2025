import React, { use } from 'react';
import Link from 'next/link';
import { Home, Inbox, Settings, LogIn, UserPlus, BarChart2, User, Plus } from 'lucide-react'; // Adjust the import based on your actual icon library

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/Profile",
    icon: User,
  },
  {
    title: "Create",
    url: "/create",
    icon: Plus,
  },
  {
    title: "Sign In",
    url: "/sign-in",
    icon: LogIn,
  },
  {
    title: "Sign Up",
    url: "/sign-up",
    icon: UserPlus,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: BarChart2,
  },
];

export default function CustomSidebar() {
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col">
      <div className="flex items-center justify-center h-16 bg-black">
        <img src="/exe 1.png" alt="Logo" className="h-10" /> {/* Adjust the logo path */}
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {items.map((item) => (
            <li key={item.title} className="mb-4">
              <Link href={item.url} legacyBehavior>
                <a className="flex items-center p-2 rounded hover:bg-gray-700">
                  <item.icon className="mr-2" />
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}