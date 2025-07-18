// import { useEffect } from 'react';
import { Container, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup, Rating, Paper } from '@mui/material';
import { create } from 'zustand';
import questionsData from './questions.json';

type Question = {
  id: number;
  type: 'single' | 'multiple' | 'rating';
  question: string;
  options: string[];
};

type Answer = {
  [key: number]: string | string[] | number;
};

interface SurveyState {
  answers: Answer;
  setAnswer: (id: number, value: string | string[] | number) => void;
  reset: () => void;
}

const useSurveyStore = create<SurveyState>((set) => ({
  answers: {},
  setAnswer: (id, value) => set((state) => ({ answers: { ...state.answers, [id]: value } })),
  reset: () => set({ answers: {} }),
}));

const questions: Question[] = questionsData;

function App() {
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Encuesta de ejemplo</Typography>
        {questions.map((q) => (
          <Box key={q.id} sx={{ mb: 3 }}>
            <Typography variant="h6">{q.question}</Typography>
            {q.type === 'single' && (
              <RadioGroup
                value={answers[q.id] || ''}
                onChange={(e) => handleSingleChange(q.id, e.target.value)}
              >
                {q.options.map((opt) => (
                  <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            )}
            {q.type === 'multiple' && (
              <FormGroup>
                {q.options.map((opt) => (
                  <FormControlLabel
                    key={opt}
                    control={
                      <Checkbox
                        checked={Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt)}
                        onChange={() => handleMultipleChange(q.id, opt)}
                      />
                    }
                    label={opt}
                  />
                ))}
              </FormGroup>
            )}
            {q.type === 'rating' && (
              <Rating
                name={`rating-${q.id}`}
                value={Number(answers[q.id]) || 0}
                onChange={(_, value) => handleRatingChange(q.id, value)}
                max={5}
                icon={<span style={{ color: '#FFD700', fontSize: 32 }}>★</span>}
                emptyIcon={<span style={{ color: '#ccc', fontSize: 32 }}>☆</span>}
              />
            )}
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Enviar respuestas
        </Button>
      </Paper>
    </Container>
  );
}

export default App;
