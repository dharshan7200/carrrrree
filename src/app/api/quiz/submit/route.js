const getDegreeRecommendation = (subjectName, scorePercentage) => {
  const recommendations = {
    'Physics': {
      high: 'Aerospace Engineering',
      medium: 'Mechanical Engineering',
      low: 'Applied Physics'
    },
    'Chemistry': {
      high: 'Chemical Engineering',
      medium: 'Chemistry',
      low: 'Applied Chemistry'
    },
    'Mathematics': {
      high: 'Data Science & Analytics',
      medium: 'Mathematics & Computing',
      low: 'Applied Mathematics'
    },
    'Biology': {
      high: 'Biomedical Engineering',
      medium: 'Biotechnology',
      low: 'Life Sciences'
    },
    'Computer Science': {
      high: 'Artificial Intelligence & Data Science',
      medium: 'Computer Science Engineering',
      low: 'Information Technology'
    },
    'Aptitude': {
      high: 'Multi-disciplinary Engineering',
      medium: 'General Engineering',
      low: 'Foundation Engineering'
    }
  };

  const subjectRecs = recommendations[subjectName];
  if (!subjectRecs) return null;

  if (scorePercentage >= 80) return subjectRecs.high;
  if (scorePercentage >= 60) return subjectRecs.medium;
  return subjectRecs.low;
};

const questionDatabase = {
  '1-1': 'A', '1-2': 'C', '1-3': 'A', '1-4': 'B', '1-5': 'A',
  '1-6': 'B', '1-7': 'C', '1-8': 'A', '1-9': 'B', '1-10': 'C',
  '2-1': 'C', '2-2': 'B', '2-3': 'C', '2-4': 'A', '2-5': 'B',
  '2-6': 'B', '2-7': 'C', '2-8': 'C', '2-9': 'A', '2-10': 'B'
};

const subjectNames = {
  '1': 'Physics',
  '2': 'Chemistry',
  '3': 'Mathematics',
  '4': 'Biology',
  '5': 'Computer Science',
  '6': 'Aptitude'
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { subjectId, answers, timeTaken } = body;

    if (!subjectId || !answers || !Array.isArray(answers)) {
      return Response.json({ error: 'Invalid quiz data' }, { status: 400 });
    }

    let correctCount = 0;
    answers.forEach(answer => {
      const correctAnswer = questionDatabase[answer.questionId];
      if (correctAnswer && correctAnswer === answer.selectedOption) {
        correctCount++;
      }
    });

    const totalQuestions = answers.length;
    const scorePercentage = (correctCount / totalQuestions) * 100;

    const subjectName = subjectNames[subjectId] || 'General';
    let recommendedDegree = null;
    if (scorePercentage >= 60) {
      recommendedDegree = getDegreeRecommendation(subjectName, scorePercentage);
    }

    return Response.json({
      quizAttemptId: `attempt-${Date.now()}`,
      scorePercentage,
      correctCount,
      totalQuestions,
      recommendedDegree,
      timeTaken,
      subjectName
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    return Response.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}
