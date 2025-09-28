"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 700);
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image
                src="/logoNew.jpg"
                alt="YatraBook Logo"
                width={60}
                height={60}
                className="rounded-full mb-2"
              />
            </a>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">YatraBook</h1>
          <p className="text-sm text-gray-500">
            Integrated Tourism Safety & Travel Management
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Your Name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition-all"
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-xs text-blue-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
          <button
            className="text-xs text-gray-500 hover:text-orange-600"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-400">
        © 2025 YatraBook. All rights reserved.
      </p>
    </div>
  );
}
