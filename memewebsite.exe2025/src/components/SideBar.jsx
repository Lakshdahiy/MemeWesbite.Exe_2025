import React from 'react';
import Link from 'next/link';
import { Home, Inbox, Settings, LogIn, UserPlus } from 'lucide-react'; // Adjust the import based on your actual icon library

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Create",
    url: "/create",
    icon: Settings,
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
];

export default function CustomSidebar() {
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col">
      <div className="flex items-center justify-center h-32 bg-black">
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