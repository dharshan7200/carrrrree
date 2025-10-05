import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// Simple degree recommendation logic based on subject performance
const getDegreeRecommendation = (subjectId, scorePercentage) => {
  const recommendations = {
    1: { // Biology
      high: "Biomedical Engineering",
      medium: "Life Sciences",
      low: "General Biology"
    },
    2: { // Chemistry
      high: "Chemical Engineering", 
      medium: "Chemistry",
      low: "Applied Chemistry"
    },
    3: { // Physics
      high: "Aerospace Engineering",
      medium: "Physics",
      low: "Applied Physics"
    },
    4: { // Mathematics
      high: "Data Science & Analytics",
      medium: "Mathematics",
      low: "Applied Mathematics"
    },
    5: { // Computer Science
      high: "Artificial Intelligence & Data Science",
      medium: "Computer Science Engineering",
      low: "Information Technology"
    }
  };

  const subjectRecs = recommendations[subjectId];
  if (!subjectRecs) return null;

  if (scorePercentage >= 80) return subjectRecs.high;
  if (scorePercentage >= 60) return subjectRecs.medium;
  return subjectRecs.low;
};

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { subjectId, answers, timeTaken } = body;

    if (!subjectId || !answers || !Array.isArray(answers)) {
      return Response.json({ error: "Invalid quiz data" }, { status: 400 });
    }

    // Get correct answers for the questions
    const questionIds = answers.map(a => a.questionId);
    const questions = await sql`
      SELECT id, correct_option
      FROM quiz_questions
      WHERE id = ANY(${questionIds})
    `;

    // Calculate score
    let correctCount = 0;
    const questionMap = {};
    questions.forEach(q => {
      questionMap[q.id] = q.correct_option;
    });

    answers.forEach(answer => {
      if (questionMap[answer.questionId] === answer.selectedOption) {
        correctCount++;
      }
    });

    const totalQuestions = answers.length;
    const scorePercentage = (correctCount / totalQuestions) * 100;

    // Save quiz attempt
    const quizAttempt = await sql`
      INSERT INTO quiz_attempts (user_id, subject_id, total_questions, correct_answers, score_percentage, time_taken_minutes)
      VALUES (${session.user.id}, ${subjectId}, ${totalQuestions}, ${correctCount}, ${scorePercentage}, ${timeTaken})
      RETURNING *
    `;

    // Generate degree recommendation if score is good
    let recommendedDegree = null;
    if (scorePercentage >= 60) {
      recommendedDegree = getDegreeRecommendation(parseInt(subjectId), scorePercentage);
      
      if (recommendedDegree) {
        // Save degree recommendation
        await sql`
          INSERT INTO degree_recommendations (user_id, recommended_degree, confidence_score, reasoning, based_on_subjects)
          VALUES (${session.user.id}, ${recommendedDegree}, ${scorePercentage}, 
                  'Based on quiz performance', ARRAY[(SELECT subject_name FROM quiz_subjects WHERE id = ${subjectId})])
        `;
      }
    }

    return Response.json({
      quizAttemptId: quizAttempt[0].id,
      scorePercentage,
      correctCount,
      totalQuestions,
      recommendedDegree,
      timeTaken
    });

  } catch (error) {
    console.error("Error submitting quiz:", error);
    return Response.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}