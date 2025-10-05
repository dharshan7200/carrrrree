import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  BookOpen, 
  Target, 
  Award, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Brain,
  GraduationCap,
  TrendingUp
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useUser from "@/utils/useUser";

export default function StudentDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const queryClient = useQueryClient();

  // Fetch quiz subjects
  const { data: subjectsData } = useQuery({
    queryKey: ['quiz-subjects'],
    queryFn: async () => {
      const response = await fetch('/api/quiz/subjects');
      if (!response.ok) throw new Error('Failed to fetch subjects');
      return response.json();
    }
  });

  // Fetch quiz questions for selected subject
  const { data: questionsData, isLoading: questionsLoading } = useQuery({
    queryKey: ['quiz-questions', selectedSubject?.id],
    queryFn: async () => {
      const response = await fetch(`/api/quiz/questions/${selectedSubject.id}`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
    enabled: !!selectedSubject
  });

  // Submit quiz mutation
  const submitQuizMutation = useMutation({
    mutationFn: async (quizData) => {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
      });
      if (!response.ok) throw new Error('Failed to submit quiz');
      return response.json();
    },
    onSuccess: (data) => {
      setQuizResults(data);
      setShowResults(true);
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    }
  });

  const subjects = subjectsData?.subjects || [];

  const startQuiz = (subject) => {
    setSelectedSubject(subject);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizStartTime(Date.now());
    setShowResults(false);
    setQuizResults(null);
  };

  const handleAnswerSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: currentQuiz[currentQuestionIndex].id,
      selectedOption: option
    };
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    const timeTaken = Math.round((Date.now() - quizStartTime) / 60000); // in minutes
    submitQuizMutation.mutate({
      subjectId: selectedSubject.id,
      answers,
      timeTaken
    });
  };

  const resetQuiz = () => {
    setSelectedSubject(null);
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizStartTime(null);
    setShowResults(false);
    setQuizResults(null);
  };

  // Set current quiz when questions are loaded
  useEffect(() => {
    if (questionsData?.questions) {
      setCurrentQuiz(questionsData.questions);
    }
  }, [questionsData]);

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
          <p className="text-gray-600 mb-6 font-inter">You need to be signed in to access the student dashboard.</p>
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

  // Quiz Results Screen
  if (showResults && quizResults) {
    const performanceData = [
      { subject: selectedSubject.subject_name, score: quizResults.scorePercentage }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h1 className="font-inter font-bold text-3xl text-gray-900 mb-2">
              Quiz Completed!
            </h1>
            <p className="font-inter text-gray-600">
              Here are your results for {selectedSubject.subject_name}
            </p>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-green-100 flex items-center justify-center">
                <Target size={24} className="text-green-600" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">Score</h3>
              <p className="text-2xl font-bold text-green-600">{quizResults.scorePercentage.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">{quizResults.correctCount}/{quizResults.totalQuestions} correct</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock size={24} className="text-blue-600" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">Time</h3>
              <p className="text-2xl font-bold text-blue-600">{quizResults.timeTaken || 0} min</p>
              <p className="text-sm text-gray-600">Total time taken</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 size={24} className="text-purple-600" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">Performance</h3>
              <p className="text-2xl font-bold text-purple-600">
                {quizResults.scorePercentage >= 80 ? 'Excellent' : 
                 quizResults.scorePercentage >= 60 ? 'Good' : 'Needs Work'}
              </p>
              <p className="text-sm text-gray-600">Overall rating</p>
            </div>
          </div>

          {/* Degree Recommendation */}
          {quizResults.recommendedDegree && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-inter font-bold text-xl">Recommended Degree</h3>
                  <p className="text-indigo-100">Based on your excellent performance</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-inter font-semibold text-lg mb-2">{quizResults.recommendedDegree}</h4>
                <p className="text-indigo-100">
                  Your strong performance in {selectedSubject.subject_name} suggests you would excel in this field.
                </p>
              </div>
            </div>
          )}

          {/* Performance Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h3 className="font-inter font-bold text-xl text-gray-900 mb-6">Performance Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors font-inter"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => window.location.href = '/student/recommendations'}
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg transition-colors font-inter"
            >
              View Recommendations
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Interface - with proper safety checks
  if (currentQuiz && selectedSubject && currentQuiz.length > 0) {
    const currentQuestion = currentQuiz[currentQuestionIndex];
    
    // Safety check for currentQuestion
    if (!currentQuestion) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-inter">Loading questions...</p>
          </div>
        </div>
      );
    }
    
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-inter font-bold text-xl text-gray-900">
                {selectedSubject.subject_name} Quiz
              </h2>
              <span className="text-sm text-gray-600 font-inter">
                Question {currentQuestionIndex + 1} of {currentQuiz.length}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <h3 className="font-inter font-semibold text-lg text-gray-900 mb-6">
              {currentQuestion.question_text}
            </h3>

            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map((option) => {
                const optionText = currentQuestion[`option_${option.toLowerCase()}`];
                const isSelected = answers[currentQuestionIndex]?.selectedOption === option;
                
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 font-inter ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {option}
                      </span>
                      {optionText}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={resetQuiz}
              className="text-gray-600 hover:text-gray-800 font-medium font-inter"
            >
              ← Exit Quiz
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQuestionIndex]}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 font-inter"
            >
              {currentQuestionIndex === currentQuiz.length - 1 ? 'Submit Quiz' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state for questions
  if (selectedSubject && questionsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-inter font-bold text-2xl text-gray-900">
                Welcome back, {user.name || 'Student'}!
              </h1>
              <p className="font-inter text-gray-600 mt-1">
                Ready to discover your ideal career path?
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
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Available Subjects</p>
                <p className="text-xl font-bold text-gray-900">{subjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Target size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Quizzes Completed</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Award size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Average Score</p>
                <p className="text-xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-inter">Recommendations</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="font-inter font-bold text-2xl text-gray-900 mb-4">
              Choose a Subject to Begin
            </h2>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto">
              Select a subject below to take a quiz and discover your strengths. 
              Based on your performance, we'll recommend the perfect degree program for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => startQuiz(subject)}
              >
                <div className="w-12 h-12 mb-4 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <Brain size={24} className="text-indigo-600" />
                </div>
                
                <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">
                  {subject.subject_name}
                </h3>
                
                <p className="font-inter text-gray-600 text-sm mb-4">
                  {subject.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-inter">10 Questions</span>
                  <ArrowRight size={16} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}