"use client"
import { useState } from "react";
import Link from "next/link";

// SVG icon Google
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block mr-2">
    <g>
      <path fill="#fbc02d" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.5 5.5 29.6 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8 20.5-20.5 0-1.4-.2-2.7-.4-4z"/>
      <path fill="#e53935" d="M6.3 14.1l6.6 4.8C15.1 16.1 19.2 13.5 24 13.5c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.5 5.5 29.6 3.5 24 3.5c-6.6 0-12.3 2.7-16.7 7.1z"/>
      <path fill="#4caf50" d="M24 44.5c5.6 0 10.5-1.9 14.4-5.1l-6.6-5.4c-2 1.5-4.6 2.5-7.8 2.5-5.6 0-10.3-3.8-12-9l-6.6 5.1C7.7 40.2 15.3 44.5 24 44.5z"/>
      <path fill="#1565c0" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-4.1 4.9l6.6 5.4c3.8-3.5 6.2-8.7 6.2-14.8 0-1.4-.2-2.7-.4-4z"/>
    </g>
  </svg>
);

// SVG icon Facebook
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" className="inline-block mr-2">
    <path fill="#1877f3" d="M32 16c0-8.837-7.163-16-16-16S0 7.163 0 16c0 7.982 5.84 14.584 13.438 15.854v-11.22H9.398v-4.634h4.04V12.41c0-4.007 2.393-6.22 6.058-6.22 1.754 0 3.584.313 3.584.313v3.953h-2.019c-1.989 0-2.607 1.236-2.607 2.504v3.01h4.437l-.71 4.634h-3.727v11.22C26.16 30.584 32 23.982 32 16z"/>
    <path fill="#fff" d="M22.69 20.634l.71-4.634h-4.437v-3.01c0-1.268.618-2.504 2.607-2.504h2.019V6.543s-1.83-.313-3.584-.313c-3.665 0-6.058 2.213-6.058 6.22v3.22h-4.04v4.634h4.04v11.22a16.06 16.06 0 0 0 4.924 0v-11.22h3.727z"/>
  </svg>
);

// Nhận props user, nếu null thì hiển thị nút đăng nhập/đăng ký
export default function UserMenu({ user }: { user: { name: string } | null }) {
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex gap-2">
        <button className="ancient-button px-4 py-2 rounded shadow hover:ancient-glow transition">
          Đăng nhập
        </button>
        <button className="ancient-button px-4 py-2 rounded shadow hover:ancient-glow transition bg-[var(--ancient-red)] text-white border-[var(--ancient-bronze)]">
          Đăng ký
        </button>
        <button className="ancient-button px-4 py-2 rounded shadow hover:ancient-glow transition flex items-center bg-[var(--parchment)] border border-[var(--jade-green)] text-[var(--jade-green)]">
          <GoogleIcon />
          Google
        </button>
        <button className="ancient-button px-4 py-2 rounded shadow hover:ancient-glow transition flex items-center bg-[var(--parchment)] border border-[var(--bamboo-green)] text-[var(--bamboo-green)]">
          <FacebookIcon />
          Facebook
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="px-4 py-2 rounded ancient-button bg-[var(--ancient-cream)] text-[var(--ancient-red)] font-semibold shadow hover:ancient-glow transition"
        onClick={() => setOpen((o) => !o)}
      >
        Xin chào, {user.name}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-[var(--parchment)] border border-[var(--ancient-bronze)] shadow-lg rounded z-50">
          <Link href="/profile" className="block px-4 py-2 hover:bg-[var(--ancient-gold)] hover:text-[var(--ink-black)] ancient-font">Trang cá nhân</Link>
          <Link href="/settings" className="block px-4 py-2 hover:bg-[var(--ancient-gold)] hover:text-[var(--ink-black)] ancient-font">Cài đặt</Link>
          <button className="block w-full text-left px-4 py-2 hover:bg-[var(--ancient-red)] hover:text-white rounded-b ancient-font">Đăng xuất</button>
        </div>
      )}
    </div>
  );
}