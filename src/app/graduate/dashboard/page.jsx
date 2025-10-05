import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Upload, 
  FileText, 
  Target, 
  Award, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Briefcase,
  TrendingUp,
  Star,
  ExternalLink,
  User,
  MapPin
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useUser from "@/utils/useUser";

export default function GraduateDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const queryClient = useQueryClient();

  // Fetch graduate profile
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['graduate-profile'],
    queryFn: async () => {
      const response = await fetch('/api/graduate/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
    enabled: !!user
  });

  // Fetch job recommendations
  const { data: recommendationsData, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['job-recommendations'],
    queryFn: async () => {
      const response = await fetch('/api/graduate/recommendations');
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      return response.json();
    },
    enabled: !!user && !!profileData?.profile
  });

  // Upload resume mutation
  const uploadResumeMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('/api/graduate/upload-resume', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to upload resume');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['graduate-profile'] });
      queryClient.invalidateQueries({ queryKey: ['job-recommendations'] });
      setSelectedFile(null);
      setUploadProgress(0);
      setShowRecommendations(true);
    }
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('resume', selectedFile);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await uploadResumeMutation.mutateAsync(formData);
      setUploadProgress(100);
      setTimeout(() => clearInterval(progressInterval), 500);
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      console.error('Upload failed:', error);
    }
  };

  const profile = profileData?.profile;
  const recommendations = recommendationsData?.recommendations || [];
  const skills = profile?.extracted_skills || [];
  const projects = profile?.projects || [];
  const internships = profile?.internships || [];

  // Sample data for charts
  const skillsData = skills.slice(0, 6).map(skill => ({
    name: skill.name || `Skill ${skill}`,
    proficiency: Math.floor(Math.random() * 40) + 60
  }));

  const matchData = recommendations.slice(0, 5).map(rec => ({
    job: rec.job_title?.substring(0, 15) + '...' || 'Job Role',
    match: rec.match_percentage || Math.floor(Math.random() * 30) + 70
  }));

  const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#EF4444', '#F59E0B', '#10B981'];

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-inter">Please Sign In</h2>
          <p className="text-gray-600 mb-6 font-inter">You need to be signed in to access the graduate dashboard.</p>
          <a
            href="/account/signin"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors font-inter"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-inter font-bold text-2xl text-gray-900">
                Welcome back, {user.name || 'Graduate'}!
              </h1>
              <p className="font-inter text-gray-600 mt-1">
                Ready to find your perfect job match?
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Resume Status</p>
                <p className="text-xl font-bold text-gray-900">
                  {profile?.resume_url ? 'Uploaded' : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Brain size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Skills Extracted</p>
                <p className="text-xl font-bold text-gray-900">{skills.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Target size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Job Matches</p>
                <p className="text-xl font-bold text-gray-900">{recommendations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Avg Match</p>
                <p className="text-xl font-bold text-gray-900">
                  {recommendations.length > 0 
                    ? Math.round(recommendations.reduce((acc, rec) => acc + (rec.match_percentage || 75), 0) / recommendations.length) + '%'
                    : '-'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Upload Section */}
        {!profile?.resume_url && (
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                <Upload size={32} className="text-indigo-600" />
              </div>
              <h2 className="font-inter font-bold text-2xl text-gray-900 mb-4">
                Upload Your Resume
              </h2>
              <p className="font-inter text-gray-600 max-w-2xl mx-auto">
                Upload your resume to get AI-powered skill extraction and personalized job recommendations 
                based on your experience and qualifications.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer block"
                >
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="font-inter text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="font-inter text-sm text-gray-500">
                    PDF files only (max 10MB)
                  </p>
                </label>
              </div>

              {selectedFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-sm text-gray-700">
                      {selectedFile.name}
                    </span>
                    <span className="font-inter text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  
                  {uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}

                  <button
                    onClick={handleUpload}
                    disabled={uploadResumeMutation.isPending}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors font-inter"
                  >
                    {uploadResumeMutation.isPending ? 'Processing...' : 'Upload Resume'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Summary */}
        {profile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Skills Overview */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-inter font-bold text-xl text-gray-900 mb-6">
                Extracted Skills
              </h3>
              {skillsData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="proficiency" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-inter">No skills extracted yet</p>
                </div>
              )}
            </div>

            {/* Job Match Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-inter font-bold text-xl text-gray-900 mb-6">
                Job Match Distribution
              </h3>
              {matchData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={matchData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="match"
                        label={({ name, value }) => `${value}%`}
                      >
                        {matchData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-inter">No job matches yet</p>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-inter font-bold text-xl text-gray-900 mb-6">
                Profile Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-inter">Experience</p>
                    <p className="font-medium text-gray-900 font-inter">
                      {profile?.experience_years || 0} years
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-inter">Education</p>
                    <p className="font-medium text-gray-900 font-inter">
                      {profile?.education_level || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-inter">Projects</p>
                    <p className="font-medium text-gray-900 font-inter">
                      {projects.length} completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-inter">Internships</p>
                    <p className="font-medium text-gray-900 font-inter">
                      {internships.length} completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-inter font-bold text-2xl text-gray-900">
                Recommended Jobs
              </h2>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full font-inter">
                {recommendations.length} matches
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 6).map((job, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                      <Briefcase size={24} className="text-indigo-600" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 font-inter">
                        {job.match_percentage || Math.floor(Math.random() * 30) + 70}%
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">
                    {job.job_title || `Software Engineer ${index + 1}`}
                  </h3>
                  
                  <p className="font-inter text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.description || 'Exciting opportunity to work with cutting-edge technologies and contribute to innovative projects in a dynamic team environment.'}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 font-inter">
                      {job.experience_level || 'Mid-level'}
                    </div>
                    <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm font-inter group-hover:translate-x-1 transition-transform">
                      View Details
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {recommendations.length > 6 && (
              <div className="text-center mt-8">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors font-inter">
                  View All Recommendations
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!profile?.resume_url && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload size={48} className="text-gray-400" />
            </div>
            <h3 className="font-inter font-bold text-xl text-gray-900 mb-2">
              Get Started with Your Career Journey
            </h3>
            <p className="font-inter text-gray-600 max-w-md mx-auto">
              Upload your resume to unlock AI-powered job recommendations and skill analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}