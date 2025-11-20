"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUserProfile();
  }, []);

  async function loadUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    // Get profile from profiles table
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
      setName(profileData.name || "");
    } else {
      // Create profile if doesn't exist
      const displayName = user.email?.split("@")[0] || "User";
      const { data: newProfile } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            email: user.email,
            name: displayName,
          },
        ])
        .select()
        .single();
      
      setProfile(newProfile);
      setName(newProfile?.name || "");
    }

    setLoading(false);
  }

  async function handleSaveProfile() {
    if (!name.trim()) {
      setMessage("Name cannot be empty!");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({ name: name.trim() })
      .eq("id", user.id);

    if (error) {
      setMessage("Error updating profile!");
    } else {
      setMessage("Profile updated successfully!");
      setProfile({ ...profile, name: name.trim() });
      setEditing(false);
    }

    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const getInitials = () => {
    return profile?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  const memberSince = new Date(user?.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                🚀
              </div>
              <div>
                <h1 className="text-xl font-bold">Apply Next Jobs</h1>
                <p className="text-xs text-gray-400">Your Career Accelerator</p>
              </div>
            </Link>

            <Link
              href="/"
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
              {/* Avatar */}
              <div className="flex justify-between items-start -mt-16 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold border-4 border-slate-950 shadow-2xl">
                    {getInitials()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-slate-950 flex items-center justify-center text-xl">
                    {user?.email_confirmed_at ? "✓" : "✗"}
                  </div>
                </div>

                <button
                  onClick={() => setEditing(!editing)}
                  className="mt-16 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium border border-white/20"
                >
                  {editing ? "Cancel" : "✏️ Edit Profile"}
                </button>
              </div>

              {/* Name & Email */}
              <div className="mb-8">
                {editing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition font-semibold disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => {
                          setEditing(false);
                          setName(profile?.name || "");
                          setMessage("");
                        }}
                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                    {message && (
                      <p
                        className={`text-sm ${
                          message.includes("success") ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {message}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <h2 className="text-4xl font-bold mb-2">{profile?.name || "User"}</h2>
                    <p className="text-gray-400 text-lg flex items-center gap-2">
                      <span>✉️</span> {user?.email}
                    </p>
                  </>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-sm text-gray-400">Member Since</div>
                  <div className="text-xl font-semibold">{memberSince}</div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl mb-2">
                    {user?.email_confirmed_at ? "✅" : "⏳"}
                  </div>
                  <div className="text-sm text-gray-400">Email Status</div>
                  <div className="text-xl font-semibold">
                    {user?.email_confirmed_at ? "Verified" : "Not Verified"}
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm text-gray-400">Account Type</div>
                  <div className="text-xl font-semibold">Free Plan</div>
                </div>
              </div>

              {/* Account Details */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🔐</span> Account Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">User ID</span>
                    <span className="font-mono text-xs bg-white/5 px-3 py-1 rounded">
                      {user?.id.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Email</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Last Sign In</span>
                    <span>
                      {new Date(user?.last_sign_in_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition font-semibold text-red-400 hover:text-red-300"
                >
                  🚪 Logout
                </button>
                <Link
                  href="/contact"
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-semibold text-center"
                >
                  💬 Contact Support
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}