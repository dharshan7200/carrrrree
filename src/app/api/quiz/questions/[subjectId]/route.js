const generateQuestions = (subjectId) => {
  const questionsBySubject = {
    '1': [
      {
        id: '1-1',
        question_text: 'What is the SI unit of force?',
        option_a: 'Newton',
        option_b: 'Joule',
        option_c: 'Watt',
        option_d: 'Pascal',
        correct_answer: 'A',
        difficulty: 'easy'
      },
      {
        id: '1-2',
        question_text: 'Which law states that for every action, there is an equal and opposite reaction?',
        option_a: 'First Law of Motion',
        option_b: 'Second Law of Motion',
        option_c: 'Third Law of Motion',
        option_d: 'Law of Gravitation',
        correct_answer: 'C',
        difficulty: 'easy'
      },
      {
        id: '1-3',
        question_text: 'What is the speed of light in vacuum?',
        option_a: '3 × 10^8 m/s',
        option_b: '3 × 10^6 m/s',
        option_c: '3 × 10^10 m/s',
        option_d: '3 × 10^5 m/s',
        correct_answer: 'A',
        difficulty: 'medium'
      },
      {
        id: '1-4',
        question_text: 'What phenomenon explains the bending of light as it passes from one medium to another?',
        option_a: 'Reflection',
        option_b: 'Refraction',
        option_c: 'Diffraction',
        option_d: 'Interference',
        correct_answer: 'B',
        difficulty: 'medium'
      },
      {
        id: '1-5',
        question_text: 'The first law of thermodynamics is based on the conservation of?',
        option_a: 'Energy',
        option_b: 'Momentum',
        option_c: 'Mass',
        option_d: 'Charge',
        correct_answer: 'A',
        difficulty: 'medium'
      },
      {
        id: '1-6',
        question_text: 'What is the formula for kinetic energy?',
        option_a: 'mgh',
        option_b: '1/2 mv²',
        option_c: 'Fd',
        option_d: 'Pt',
        correct_answer: 'B',
        difficulty: 'easy'
      },
      {
        id: '1-7',
        question_text: 'Which particle has no electric charge?',
        option_a: 'Proton',
        option_b: 'Electron',
        option_c: 'Neutron',
        option_d: 'Positron',
        correct_answer: 'C',
        difficulty: 'easy'
      },
      {
        id: '1-8',
        question_text: 'What is the frequency of a wave if its wavelength is 2m and speed is 10 m/s?',
        option_a: '5 Hz',
        option_b: '10 Hz',
        option_c: '20 Hz',
        option_d: '2 Hz',
        correct_answer: 'A',
        difficulty: 'hard'
      },
      {
        id: '1-9',
        question_text: 'What type of energy is stored in a compressed spring?',
        option_a: 'Kinetic Energy',
        option_b: 'Potential Energy',
        option_c: 'Thermal Energy',
        option_d: 'Chemical Energy',
        correct_answer: 'B',
        difficulty: 'medium'
      },
      {
        id: '1-10',
        question_text: 'Which law explains why a balloon inflates when air is blown into it?',
        option_a: 'Boyle\'s Law',
        option_b: 'Charles\'s Law',
        option_c: 'Pascal\'s Law',
        option_d: 'Archimedes\' Principle',
        correct_answer: 'C',
        difficulty: 'hard'
      }
    ],
    '2': [
      {
        id: '2-1',
        question_text: 'What is the chemical symbol for Gold?',
        option_a: 'Go',
        option_b: 'Gd',
        option_c: 'Au',
        option_d: 'Ag',
        correct_answer: 'C',
        difficulty: 'easy'
      },
      {
        id: '2-2',
        question_text: 'What is the pH value of pure water?',
        option_a: '5',
        option_b: '7',
        option_c: '9',
        option_d: '14',
        correct_answer: 'B',
        difficulty: 'easy'
      },
      {
        id: '2-3',
        question_text: 'Which gas is most abundant in Earth\'s atmosphere?',
        option_a: 'Oxygen',
        option_b: 'Carbon Dioxide',
        option_c: 'Nitrogen',
        option_d: 'Argon',
        correct_answer: 'C',
        difficulty: 'medium'
      },
      {
        id: '2-4',
        question_text: 'What is the molecular formula for water?',
        option_a: 'H2O',
        option_b: 'HO2',
        option_c: 'H3O',
        option_d: 'H2O2',
        correct_answer: 'A',
        difficulty: 'easy'
      },
      {
        id: '2-5',
        question_text: 'Which element has the atomic number 6?',
        option_a: 'Oxygen',
        option_b: 'Carbon',
        option_c: 'Nitrogen',
        option_d: 'Helium',
        correct_answer: 'B',
        difficulty: 'medium'
      },
      {
        id: '2-6',
        question_text: 'What type of bond involves the sharing of electrons?',
        option_a: 'Ionic Bond',
        option_b: 'Covalent Bond',
        option_c: 'Metallic Bond',
        option_d: 'Hydrogen Bond',
        correct_answer: 'B',
        difficulty: 'medium'
      },
      {
        id: '2-7',
        question_text: 'What is the process of converting solid directly to gas called?',
        option_a: 'Evaporation',
        option_b: 'Condensation',
        option_c: 'Sublimation',
        option_d: 'Deposition',
        correct_answer: 'C',
        difficulty: 'hard'
      },
      {
        id: '2-8',
        question_text: 'Which acid is found in vinegar?',
        option_a: 'Hydrochloric Acid',
        option_b: 'Sulfuric Acid',
        option_c: 'Acetic Acid',
        option_d: 'Citric Acid',
        correct_answer: 'C',
        difficulty: 'medium'
      },
      {
        id: '2-9',
        question_text: 'What is Avogadro\'s number approximately?',
        option_a: '6.02 × 10^23',
        option_b: '3.14 × 10^8',
        option_c: '9.81 × 10^2',
        option_d: '1.6 × 10^-19',
        correct_answer: 'A',
        difficulty: 'hard'
      },
      {
        id: '2-10',
        question_text: 'Which metal is liquid at room temperature?',
        option_a: 'Iron',
        option_b: 'Mercury',
        option_c: 'Sodium',
        option_d: 'Copper',
        correct_answer: 'B',
        difficulty: 'easy'
      }
    ]
  };

  const defaultQuestions = [
    {
      id: `${subjectId}-1`,
      question_text: 'Sample Question 1',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'A',
      difficulty: 'easy'
    },
    {
      id: `${subjectId}-2`,
      question_text: 'Sample Question 2',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'B',
      difficulty: 'medium'
    },
    {
      id: `${subjectId}-3`,
      question_text: 'Sample Question 3',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'C',
      difficulty: 'medium'
    },
    {
      id: `${subjectId}-4`,
      question_text: 'Sample Question 4',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'A',
      difficulty: 'hard'
    },
    {
      id: `${subjectId}-5`,
      question_text: 'Sample Question 5',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'D',
      difficulty: 'medium'
    },
    {
      id: `${subjectId}-6`,
      question_text: 'Sample Question 6',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'B',
      difficulty: 'easy'
    },
    {
      id: `${subjectId}-7`,
      question_text: 'Sample Question 7',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'C',
      difficulty: 'medium'
    },
    {
      id: `${subjectId}-8`,
      question_text: 'Sample Question 8',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'A',
      difficulty: 'hard'
    },
    {
      id: `${subjectId}-9`,
      question_text: 'Sample Question 9',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'D',
      difficulty: 'medium'
    },
    {
      id: `${subjectId}-10`,
      question_text: 'Sample Question 10',
      option_a: 'Option A',
      option_b: 'Option B',
      option_c: 'Option C',
      option_d: 'Option D',
      correct_answer: 'B',
      difficulty: 'easy'
    }
  ];

  return questionsBySubject[subjectId] || defaultQuestions;
};

export async function GET(request, { params }) {
  try {
    const { subjectId } = await params;

    if (!subjectId) {
      return Response.json({ error: "Subject ID is required" }, { status: 400 });
    }

    const questions = generateQuestions(subjectId);

    return Response.json({ questions });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return Response.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
