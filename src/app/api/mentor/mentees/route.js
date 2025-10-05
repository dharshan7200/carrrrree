const mockMentees = {
  mentees: [
    {
      id: 'mentee-1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      project_count: 3,
      internship_count: 2,
      evaluated: true,
      project_score: 85,
      internship_score: 78,
      feedback: 'Excellent work on the React project. Keep improving your backend skills.'
    },
    {
      id: 'mentee-2',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      project_count: 2,
      internship_count: 1,
      evaluated: false,
      project_score: 0,
      internship_score: 0,
      feedback: ''
    },
    {
      id: 'mentee-3',
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      project_count: 4,
      internship_count: 3,
      evaluated: true,
      project_score: 92,
      internship_score: 88,
      feedback: 'Outstanding performance across all projects. Strong technical skills.'
    },
    {
      id: 'mentee-4',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      project_count: 1,
      internship_count: 1,
      evaluated: false,
      project_score: 0,
      internship_score: 0,
      feedback: ''
    },
    {
      id: 'mentee-5',
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      project_count: 3,
      internship_count: 2,
      evaluated: true,
      project_score: 76,
      internship_score: 82,
      feedback: 'Good progress. Focus more on code quality and documentation.'
    }
  ]
};

export async function GET() {
  try {
    return Response.json(mockMentees);
  } catch (error) {
    console.error('Error fetching mentees:', error);
    return Response.json({ error: 'Failed to fetch mentees' }, { status: 500 });
  }
}
