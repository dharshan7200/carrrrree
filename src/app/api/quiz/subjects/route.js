const mockSubjects = [
  {
    id: '1',
    subject_name: 'Physics',
    description: 'Test your understanding of fundamental physics concepts including mechanics, thermodynamics, and electromagnetism.',
    total_questions: 10,
    duration_minutes: 15
  },
  {
    id: '2',
    subject_name: 'Chemistry',
    description: 'Assess your knowledge of chemical reactions, organic chemistry, and periodic table concepts.',
    total_questions: 10,
    duration_minutes: 15
  },
  {
    id: '3',
    subject_name: 'Mathematics',
    description: 'Evaluate your problem-solving skills in algebra, calculus, trigonometry, and geometry.',
    total_questions: 10,
    duration_minutes: 15
  },
  {
    id: '4',
    subject_name: 'Biology',
    description: 'Test your understanding of life sciences including genetics, ecology, and human anatomy.',
    total_questions: 10,
    duration_minutes: 15
  },
  {
    id: '5',
    subject_name: 'Computer Science',
    description: 'Assess your programming knowledge, data structures, algorithms, and computer fundamentals.',
    total_questions: 10,
    duration_minutes: 15
  },
  {
    id: '6',
    subject_name: 'Aptitude',
    description: 'Evaluate your logical reasoning, numerical ability, and verbal comprehension skills.',
    total_questions: 10,
    duration_minutes: 15
  }
];

export async function GET() {
  try {
    return Response.json({ subjects: mockSubjects });
  } catch (error) {
    console.error("Error fetching quiz subjects:", error);
    return Response.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}
