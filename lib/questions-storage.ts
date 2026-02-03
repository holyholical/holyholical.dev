import fs from 'fs';
import path from 'path';

export interface Question {
  id: string;
  question: string;
  answer?: string;
  authorName?: string;
  authorEmail?: string;
  submittedAt: string;
  answeredAt?: string;
  status: 'pending' | 'answered';
}

const DATA_FILE = path.join(process.cwd(), 'data', 'questions.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read questions from JSON file
export function readQuestions(): Question[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading questions:', error);
    return [];
  }
}

// Write questions to JSON file
export function writeQuestions(questions: Question[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(questions, null, 2));
  } catch (error) {
    console.error('Error writing questions:', error);
    throw error;
  }
}

// Add a new question
export function addQuestion(question: Omit<Question, 'id' | 'submittedAt' | 'status'>): Question {
  const questions = readQuestions();
  const newQuestion: Question = {
    ...question,
    id: generateId(),
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };
  
  questions.push(newQuestion);
  writeQuestions(questions);
  return newQuestion;
}

// Answer a question
export function answerQuestion(id: string, answer: string): Question | null {
  const questions = readQuestions();
  const questionIndex = questions.findIndex(q => q.id === id);
  
  if (questionIndex === -1) {
    return null;
  }
  
  questions[questionIndex].answer = answer;
  questions[questionIndex].answeredAt = new Date().toISOString();
  questions[questionIndex].status = 'answered';
  
  writeQuestions(questions);
  return questions[questionIndex];
}

// Get question by ID
export function getQuestion(id: string): Question | null {
  const questions = readQuestions();
  return questions.find(q => q.id === id) || null;
}

// Get pending questions
export function getPendingQuestions(): Question[] {
  const questions = readQuestions();
  return questions.filter(q => q.status === 'pending');
}

// Get answered questions
export function getAnsweredQuestions(): Question[] {
  const questions = readQuestions();
  return questions.filter(q => q.status === 'answered');
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
