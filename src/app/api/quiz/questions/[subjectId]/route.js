import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { subjectId } = params;

    if (!subjectId) {
      return Response.json({ error: "Subject ID is required" }, { status: 400 });
    }

    const questions = await sql`
      SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty_level
      FROM quiz_questions
      WHERE subject_id = ${subjectId}
      ORDER BY RANDOM()
      LIMIT 10
    `;

    return Response.json({ questions });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return Response.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}