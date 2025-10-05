export async function POST(request) {
  try {
    const body = await request.json();
    const { menteeId, projectScore, internshipScore, feedback } = body;

    if (!menteeId) {
      return Response.json({ error: 'Mentee ID is required' }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Evaluation submitted successfully',
      data: {
        menteeId,
        projectScore,
        internshipScore,
        feedback,
        evaluatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error submitting score:', error);
    return Response.json({ error: 'Failed to submit score' }, { status: 500 });
  }
}
