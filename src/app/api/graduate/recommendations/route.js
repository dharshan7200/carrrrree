const mockRecommendations = {
  recommendations: [
    {
      job_title: 'Full Stack Developer',
      description: 'Build and maintain web applications using modern frameworks and technologies.',
      match_percentage: 92,
      experience_level: 'Mid-level',
      required_skills: ['React', 'Node.js', 'MongoDB', 'REST APIs']
    },
    {
      job_title: 'Frontend Engineer',
      description: 'Create responsive and intuitive user interfaces for web applications.',
      match_percentage: 88,
      experience_level: 'Junior',
      required_skills: ['React', 'TypeScript', 'CSS', 'Redux']
    },
    {
      job_title: 'Backend Developer',
      description: 'Design and implement scalable server-side applications and APIs.',
      match_percentage: 85,
      experience_level: 'Mid-level',
      required_skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker']
    },
    {
      job_title: 'Data Analyst',
      description: 'Analyze data to provide insights and support business decisions.',
      match_percentage: 78,
      experience_level: 'Entry-level',
      required_skills: ['Python', 'SQL', 'Excel', 'Tableau']
    },
    {
      job_title: 'DevOps Engineer',
      description: 'Automate deployment processes and manage cloud infrastructure.',
      match_percentage: 75,
      experience_level: 'Mid-level',
      required_skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
    },
    {
      job_title: 'ML Engineer',
      description: 'Develop machine learning models and deploy them to production.',
      match_percentage: 72,
      experience_level: 'Mid-level',
      required_skills: ['Python', 'TensorFlow', 'PyTorch', 'ML Algorithms']
    }
  ]
};

export async function GET() {
  try {
    return Response.json(mockRecommendations);
  } catch (error) {
    console.error('Error fetching job recommendations:', error);
    return Response.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
