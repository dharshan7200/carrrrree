const mockProfile = {
  profile: {
    id: 'grad-1',
    resume_url: null,
    extracted_skills: [],
    projects: [],
    internships: [],
    experience_years: 0,
    education_level: 'Bachelor\'s Degree'
  }
};

export async function GET() {
  try {
    return Response.json(mockProfile);
  } catch (error) {
    console.error('Error fetching graduate profile:', error);
    return Response.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
