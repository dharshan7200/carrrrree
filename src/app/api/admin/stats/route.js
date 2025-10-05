const mockStats = {
  stats: {
    total_users: 85,
    student_12th_count: 25,
    graduate_count: 45,
    mentor_count: 12,
    admin_count: 3,
    active_today: 42,
    total_quizzes: 128,
    avg_performance: 81,
    total_recommendations: 156,
    total_evaluations: 89
  }
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';

    return Response.json(mockStats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
