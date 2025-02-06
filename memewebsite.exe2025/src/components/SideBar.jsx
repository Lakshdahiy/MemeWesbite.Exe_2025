'use client'
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <img src="/logo.png" alt="Logo" className="mb-4 w-32 h-auto" />
      <nav>
        <ul className="space-y-2">
          <li>Home</li>
          <li>Create</li>
          <li>
            <Link href="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}