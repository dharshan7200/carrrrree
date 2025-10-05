import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Star,
  FileText,
  Target,
  TrendingUp,
  Edit,
  Search
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function MentorDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [scoringMode, setScoringMode] = useState(false);
  const [projectScore, setProjectScore] = useState(0);
  const [internshipScore, setInternshipScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const { data: menteesData, isLoading: menteesLoading } = useQuery({
    queryKey: ['mentor-mentees'],
    queryFn: async () => {
      const response = await fetch('/api/mentor/mentees');
      if (!response.ok) throw new Error('Failed to fetch mentees');
      return response.json();
    },
    enabled: !!user
  });

  const submitScoreMutation = useMutation({
    mutationFn: async (scoreData) => {
      const response = await fetch('/api/mentor/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreData)
      });
      if (!response.ok) throw new Error('Failed to submit score');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-mentees'] });
      setScoringMode(false);
      setSelectedMentee(null);
      setProjectScore(0);
      setInternshipScore(0);
      setFeedback("");
    }
  });

  const handleSubmitScore = () => {
    if (!selectedMentee) return;

    submitScoreMutation.mutate({
      menteeId: selectedMentee.id,
      projectScore,
      internshipScore,
      feedback
    });
  };

  const mentees = menteesData?.mentees || [];
  const filteredMentees = mentees.filter(mentee =>
    mentee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentee.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <p className="text-gray-600 mb-6 font-inter">You need to be signed in to access the mentor dashboard.</p>
          <a
            href="/account/signin"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors font-inter"
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
                Mentor Dashboard
              </h1>
              <p className="font-inter text-gray-600 mt-1">
                Guide and evaluate your mentees
              </p>
            </div>
            <div className="flex items-center gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Users size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Total Mentees</p>
                <p className="text-xl font-bold text-gray-900">{mentees.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Evaluated</p>
                <p className="text-xl font-bold text-gray-900">
                  {mentees.filter(m => m.evaluated).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Pending</p>
                <p className="text-xl font-bold text-gray-900">
                  {mentees.filter(m => !m.evaluated).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Star size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Avg Score</p>
                <p className="text-xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-inter font-bold text-2xl text-gray-900">
              My Mentees
            </h2>
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentees..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors font-inter"
              />
            </div>
          </div>

          {menteesLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-inter">Loading mentees...</p>
            </div>
          ) : filteredMentees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentees.map((mentee) => (
                <div
                  key={mentee.id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600 font-inter">
                        {mentee.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-inter font-semibold text-lg text-gray-900">
                        {mentee.name || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-gray-600 font-inter truncate">
                        {mentee.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-inter">Projects</span>
                      <span className="text-sm font-medium text-gray-900 font-inter">
                        {mentee.project_count || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-inter">Internships</span>
                      <span className="text-sm font-medium text-gray-900 font-inter">
                        {mentee.internship_count || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-inter">Status</span>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        mentee.evaluated
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {mentee.evaluated ? 'Evaluated' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMentee(mentee);
                      setScoringMode(true);
                      setProjectScore(mentee.project_score || 0);
                      setInternshipScore(mentee.internship_score || 0);
                      setFeedback(mentee.feedback || "");
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-inter"
                  >
                    <Edit size={16} />
                    {mentee.evaluated ? 'Update Evaluation' : 'Evaluate'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-inter font-bold text-xl text-gray-900 mb-2">
                No Mentees Found
              </h3>
              <p className="font-inter text-gray-600">
                {searchQuery ? 'Try a different search term' : 'You haven\'t been assigned any mentees yet'}
              </p>
            </div>
          )}
        </div>

        {scoringMode && selectedMentee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="font-inter font-bold text-2xl text-gray-900 mb-6">
                Evaluate {selectedMentee.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-inter mb-2">
                    Project Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={projectScore}
                    onChange={(e) => setProjectScore(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors font-inter"
                  />
                  <div className="mt-2 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${projectScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-inter mb-2">
                    Internship Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={internshipScore}
                    onChange={(e) => setInternshipScore(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors font-inter"
                  />
                  <div className="mt-2 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${internshipScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-inter mb-2">
                    Feedback & Comments
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    placeholder="Provide detailed feedback on their performance..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors font-inter resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setScoringMode(false);
                      setSelectedMentee(null);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors font-inter"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitScore}
                    disabled={submitScoreMutation.isPending}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors font-inter"
                  >
                    {submitScoreMutation.isPending ? 'Submitting...' : 'Submit Evaluation'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
