"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-lg w-full backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Your Profile
        </h1>

        <div className="space-y-4 text-gray-200">
          <p><span className="font-semibold">User ID:</span> {user?.id}</p>
          <p><span className="font-semibold">Email:</span> {user?.email}</p>
          <p>
            <span className="font-semibold">Email Verified:</span>{" "}
            {user?.email_confirmed_at ? "Yes" : "No"}
          </p>
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
