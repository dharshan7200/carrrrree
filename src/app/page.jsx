import { useState } from "react";
import { GraduationCap, Users, Award, TrendingUp, Brain, Database, Target } from "lucide-react";

export default function LandingPage() {
  const [hoveredRole, setHoveredRole] = useState(null);
  const [pressedButton, setPressedButton] = useState(null);

  const userRoles = [
    {
      id: "student",
      title: "Student",
      subtitle: "Take quizzes & discover your ideal career path",
      icon: GraduationCap,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      href: "/student/dashboard"
    },
    {
      id: "graduate",
      title: "Graduate",
      subtitle: "Upload resume & get AI-powered job recommendations",
      icon: Target,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      href: "/graduate/dashboard"
    },
    {
      id: "mentor",
      title: "Mentor",
      subtitle: "Guide students & evaluate their progress",
      icon: Users,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      href: "/mentor/dashboard"
    },
    {
      id: "admin",
      title: "Admin",
      subtitle: "Manage platform & view analytics",
      icon: Award,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      href: "/admin/dashboard"
    }
  ];

  const stats = [
    { value: "33K+", label: "Certificates", icon: Award },
    { value: "200+", label: "IT Jobs", icon: TrendingUp },
    { value: "3K+", label: "Skills", icon: Brain },
    { value: "AI-Powered", label: "Recommendations", icon: Database }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center mb-16">
            {/* Main Heading */}
            <h1 className="font-inter font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900 mb-6">
              Smart Education for{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Future-Ready Careers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-inter text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              AI-powered career guidance platform that connects students, graduates, mentors, and administrators 
              through intelligent skill mapping and personalized recommendations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="/account/signup">
                <button
                  onMouseDown={() => setPressedButton("get-started")}
                  onMouseUp={() => setPressedButton(null)}
                  onMouseLeave={() => setPressedButton(null)}
                  className="h-[48px] px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold font-inter transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  style={{
                    transform: pressedButton === "get-started" ? "scale(0.95)" : "scale(1)",
                  }}
                >
                  Get Started Free
                </button>
              </a>
              <a href="/about">
                <button
                  onMouseDown={() => setPressedButton("learn-more")}
                  onMouseUp={() => setPressedButton(null)}
                  onMouseLeave={() => setPressedButton(null)}
                  className="h-[48px] px-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold font-inter transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  style={{
                    transform: pressedButton === "learn-more" ? "scale(0.95)" : "scale(1)",
                  }}
                >
                  Learn More
                </button>
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <IconComponent size={20} className="text-indigo-600" />
                    </div>
                    <div className="font-bold text-2xl text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Choose Your Path
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Select your role to access personalized features and start your career guidance journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userRoles.map((role) => {
              const IconComponent = role.icon;
              const isHovered = hoveredRole === role.id;

              return (
                <a key={role.id} href={role.href}>
                  <div
                    onMouseEnter={() => setHoveredRole(role.id)}
                    onMouseLeave={() => setHoveredRole(null)}
                    className="group cursor-pointer transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-xl"
                    style={{
                      transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
                    }}
                  >
                    <div
                      className="relative p-8 rounded-xl border border-gray-200 bg-white hover:border-transparent transition-all duration-300"
                      style={{
                        background: isHovered ? role.gradient : "white",
                        boxShadow: isHovered 
                          ? "0 10px 40px rgba(0, 0, 0, 0.1)" 
                          : "0 2px 10px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-all duration-300 ${
                          isHovered ? "bg-white bg-opacity-20" : "bg-gray-100"
                        }`}
                      >
                        <IconComponent 
                          size={24} 
                          className={`transition-colors duration-300 ${
                            isHovered ? "text-white" : "text-gray-600"
                          }`} 
                        />
                      </div>

                      {/* Title */}
                      <h3 
                        className={`font-inter font-semibold text-xl mb-2 transition-colors duration-300 ${
                          isHovered ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {role.title}
                      </h3>

                      {/* Subtitle */}
                      <p 
                        className={`font-inter text-sm leading-relaxed transition-colors duration-300 ${
                          isHovered ? "text-white text-opacity-90" : "text-gray-600"
                        }`}
                      >
                        {role.subtitle}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Powered by AI Intelligence
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
              Our advanced skill taxonomy and job ontology mapping system provides accurate, 
              data-driven career recommendations tailored to your unique profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                <Brain size={28} className="text-indigo-600" />
              </div>
              <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3">
                AI Skill Extraction
              </h3>
              <p className="font-inter text-gray-600">
                Automatically extract and categorize skills from resumes, certifications, and project descriptions.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Target size={28} className="text-purple-600" />
              </div>
              <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3">
                Job Ontology Mapping
              </h3>
              <p className="font-inter text-gray-600">
                Match your skills to relevant job roles using our comprehensive database of 200+ IT positions.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp size={28} className="text-blue-600" />
              </div>
              <h3 className="font-inter font-semibold text-xl text-gray-900 mb-3">
                Personalized Recommendations
              </h3>
              <p className="font-inter text-gray-600">
                Get tailored suggestions for certifications, skills to develop, and internship opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-inter font-bold text-xl mb-4">AI-Enhanced Career Guidance</h3>
            <p className="font-inter text-gray-400 mb-6">
              Empowering careers through intelligent guidance and data-driven insights
            </p>
            <div className="flex justify-center space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}