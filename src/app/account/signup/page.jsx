import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { GraduationCap, Target, Users, Award } from "lucide-react";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("student_12th");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !fullName) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        name: fullName,
        userType,
        callbackUrl: userType === "student_12th" ? "/student/dashboard" :
                     userType === "graduate" ? "/graduate/dashboard" :
                     userType === "mentor" ? "/mentor/dashboard" : "/admin/dashboard",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        CredentialsSignin: "This email is already registered. Please sign in instead.",
        EmailCreateAccount: "This email can't be used. It may already be registered.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration: "Sign-up isn't working right now. Please try again later.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="font-inter font-bold text-2xl text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="font-inter text-gray-600">
            Join thousands of students and professionals
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 font-inter">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-inter"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 font-inter">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-inter"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 font-inter">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-inter"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 font-inter">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType("student_12th")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  userType === "student_12th"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <GraduationCap size={20} className={userType === "student_12th" ? "text-blue-600 mb-2" : "text-gray-600 mb-2"} />
                <div className="text-sm font-semibold font-inter text-gray-900">12th Student</div>
              </button>

              <button
                type="button"
                onClick={() => setUserType("graduate")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  userType === "graduate"
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Target size={20} className={userType === "graduate" ? "text-cyan-600 mb-2" : "text-gray-600 mb-2"} />
                <div className="text-sm font-semibold font-inter text-gray-900">Graduate</div>
              </button>

              <button
                type="button"
                onClick={() => setUserType("mentor")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  userType === "mentor"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Users size={20} className={userType === "mentor" ? "text-green-600 mb-2" : "text-gray-600 mb-2"} />
                <div className="text-sm font-semibold font-inter text-gray-900">Mentor</div>
              </button>

              <button
                type="button"
                onClick={() => setUserType("admin")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  userType === "admin"
                    ? "border-amber-600 bg-amber-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Award size={20} className={userType === "admin" ? "text-amber-600 mb-2" : "text-gray-600 mb-2"} />
                <div className="text-sm font-semibold font-inter text-gray-900">Admin</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600 font-inter">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 font-inter">
              Already have an account?{" "}
              <a
                href={`/account/signin${
                  typeof window !== "undefined" ? window.location.search : ""
                }`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
