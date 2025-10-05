import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Award,
  BarChart3,
  TrendingUp,
  GraduationCap,
  Target,
  Briefcase,
  Database,
  Activity,
  Shield
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import useUser from "@/utils/useUser";

export default function AdminDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [timeRange, setTimeRange] = useState("7d");

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats', timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/admin/stats?range=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    enabled: !!user
  });

  const stats = statsData?.stats || {};

  const userTypeData = [
    { name: '12th Students', value: stats.student_12th_count || 25, color: '#3b82f6' },
    { name: 'Graduates', value: stats.graduate_count || 45, color: '#06b6d4' },
    { name: 'Mentors', value: stats.mentor_count || 12, color: '#10b981' },
    { name: 'Admins', value: stats.admin_count || 3, color: '#f59e0b' }
  ];

  const activityData = [
    { day: 'Mon', quizzes: 12, evaluations: 8, uploads: 5 },
    { day: 'Tue', quizzes: 19, evaluations: 12, uploads: 8 },
    { day: 'Wed', quizzes: 15, evaluations: 10, uploads: 6 },
    { day: 'Thu', quizzes: 22, evaluations: 15, uploads: 10 },
    { day: 'Fri', quizzes: 28, evaluations: 18, uploads: 12 },
    { day: 'Sat', quizzes: 18, evaluations: 11, uploads: 7 },
    { day: 'Sun', quizzes: 14, evaluations: 9, uploads: 5 }
  ];

  const performanceData = [
    { subject: 'Physics', avgScore: 78 },
    { subject: 'Chemistry', avgScore: 82 },
    { subject: 'Maths', avgScore: 85 },
    { subject: 'Biology', avgScore: 76 },
    { subject: 'CS', avgScore: 88 },
    { subject: 'Aptitude', avgScore: 79 }
  ];

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-inter">Please Sign In</h2>
          <p className="text-gray-600 mb-6 font-inter">You need to be signed in to access the admin dashboard.</p>
          <a
            href="/account/signin"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors font-inter"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-inter font-bold text-2xl text-gray-900">
                Admin Dashboard
              </h1>
              <p className="font-inter text-gray-600 mt-1">
                Platform overview and analytics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-inter"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <a
                href="/account/logout"
                className="text-gray-600 hover:text-gray-800 font-medium font-inter"
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Total Users</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.total_users || 85}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Activity size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Active Today</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.active_today || 42}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Quizzes Taken</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.total_quizzes || 128}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Avg Performance</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.avg_performance || 81}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-inter font-bold text-xl text-gray-900 mb-6">
              User Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-inter font-bold text-xl text-gray-900 mb-6">
              Weekly Activity
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="quizzes" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="evaluations" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="uploads" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="font-inter font-bold text-xl text-gray-900 mb-6">
            Subject Performance Analysis
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-blue-100 text-sm">Students</p>
                <p className="text-2xl font-bold">25</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm">
              12th standard students actively taking quizzes
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                <Target size={24} />
              </div>
              <div>
                <p className="text-cyan-100 text-sm">Graduates</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
            <p className="text-cyan-100 text-sm">
              Graduates receiving job recommendations
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <p className="text-green-100 text-sm">Mentors</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            <p className="text-green-100 text-sm">
              Industry mentors evaluating projects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
