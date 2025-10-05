import useAuth from "@/utils/useAuth";
import { GraduationCap } from "lucide-react";

export default function LogoutPage() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="font-inter font-bold text-2xl text-gray-900 mb-2">
            Sign Out
          </h1>
          <p className="font-inter text-gray-600">
            Are you sure you want to sign out?
          </p>
        </div>

        {/* Sign Out Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <button
            onClick={handleSignOut}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-inter"
          >
            Sign Out
          </button>

          <div className="text-center">
            <a
              href="/"
              className="text-indigo-600 hover:text-indigo-700 font-medium font-inter"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}