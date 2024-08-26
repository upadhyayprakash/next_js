"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

export const navLinks = [
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
    { name: "Forgot password?", href: "/forgot-password" },
  ];

export default function ForgotPassword() {
    const pathname = usePathname();
    return (
        <>
            {
                <nav>
                {navLinks?.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link href={link.href} key={link.name} className={isActive ? "no-underline font-bold mr-4" : "text-blue-500 mr-4"}>
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            }
            <h1>Forgot Password</h1>
        </>
    )
}