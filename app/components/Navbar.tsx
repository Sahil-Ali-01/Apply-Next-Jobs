// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";

// export default function Navbar() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     async function load() {
//       const { data } = await supabase.auth.getUser();
//       setUser(data.user);
//     }
//     load();
//   }, []);

//   return (
//     <nav className="w-full px-6 py-4 backdrop-blur-xl bg-white/10 border-b border-white/10 flex justify-between items-center">
//       <Link href="/" className="text-xl font-bold text-white">
//         ANJs
//       </Link>

//       <div className="flex items-center gap-6">
//         <Link href="/" className="hover:text-blue-400 transition">Home</Link>
//         <Link href="/profile" className="hover:text-blue-400 transition">
//           Dashboard
//         </Link>

//         {!user ? (
//           <>
//             <Link
//               href="/login"
//               className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
//             >
//               Login
//             </Link>

//             <Link
//               href="/register"
//               className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition border border-gray-600"
//             >
//               Register
//             </Link>
//           </>
//         ) : (
//           <button
//             className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
//             onClick={async () => {
//               await supabase.auth.signOut();
//               window.location.href = "/login";
//             }}
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }
