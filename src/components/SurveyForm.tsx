import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "./ui/typography";
import SurveyActions from './SurveyActions';
import { useSurveyStore } from '../store';
import questionsData from '../questions.json';
import type { Question } from '../store';

import QuestionItem from './QuestionItem';

const questions: Question[] = questionsData.map(q => ({
  ...q,
  type: q.type as 'single' | 'multiple' | 'rating'
}));

export default function SurveyForm() {
  const { answers, setAnswer, reset } = useSurveyStore();

  const handleSingleChange = (id: number, value: string) => {
    setAnswer(id, value);
  };

  const handleMultipleChange = (id: number, value: string) => {
    const prev = (answers[id] as string[]) || [];
    if (prev.includes(value)) {
      setAnswer(id, prev.filter((v) => v !== value));
    } else {
      setAnswer(id, [...prev, value]);
    }
  };

  const handleRatingChange = (id: number, value: number | null) => {
    setAnswer(id, value || 0);
  };

  const handleSubmit = () => {
    alert('Respuestas enviadas: ' + JSON.stringify(answers, null, 2));
    reset();
  };

  return (
    <div className="flex justify-center mt-8">
      <Card className="w-full max-w-xl">
        <CardContent className="p-6">
          <Typography variant="h4" className="mb-4">Encuesta de ejemplo</Typography>
          {questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
              value={answers[q.id]}
              onSingleChange={handleSingleChange}
              onMultipleChange={handleMultipleChange}
              onRatingChange={handleRatingChange}
            />
          ))}
          <SurveyActions onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
