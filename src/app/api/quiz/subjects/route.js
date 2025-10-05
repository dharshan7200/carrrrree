import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const subjects = await sql`
      SELECT id, subject_name, description, created_at
      FROM quiz_subjects
      ORDER BY subject_name
    `;

    return Response.json({ subjects });
  } catch (error) {
    console.error("Error fetching quiz subjects:", error);
    return Response.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}