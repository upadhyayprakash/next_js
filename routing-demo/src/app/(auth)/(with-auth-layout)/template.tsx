"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Forgot password?", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [input, setInput] = useState("");
  return (
    <>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <nav>
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              href={link.href}
              key={link.name}
              className={
                isActive ? "no-underline font-bold mr-4" : "text-blue-500 mr-4"
              }
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      {children}
    </>
  );
}
