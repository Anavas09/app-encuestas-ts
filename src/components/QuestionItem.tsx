import { Box, Typography, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Rating } from '@mui/material';
import type { Question } from '../store';

interface Props {
  question: Question;
  value: string | string[] | number | undefined;
  onSingleChange: (id: number, value: string) => void;
  onMultipleChange: (id: number, value: string) => void;
  onRatingChange: (id: number, value: number | null) => void;
}

export default function QuestionItem({ question, value, onSingleChange, onMultipleChange, onRatingChange }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6">{question.question}</Typography>
      {question.type === 'single' && (
        <RadioGroup
          value={value || ''}
          onChange={(e) => onSingleChange(question.id, e.target.value)}
        >
          {question.options.map((opt) => (
            <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
          ))}
        </RadioGroup>
      )}
      {question.type === 'multiple' && (
        <FormGroup>
          {question.options.map((opt) => (
            <FormControlLabel
              key={opt}
              control={
                <Checkbox
                  checked={Array.isArray(value) && (value as string[]).includes(opt)}
                  onChange={() => onMultipleChange(question.id, opt)}
                />
              }
              label={opt}
            />
          ))}
        </FormGroup>
      )}
      {question.type === 'rating' && (
        <Rating
          name={`rating-${question.id}`}
          value={Number(value) || 0}
          onChange={(_, val) => onRatingChange(question.id, val)}
          max={5}
          icon={<span style={{ color: '#FFD700', fontSize: 32 }}>★</span>}
          emptyIcon={<span style={{ color: '#ccc', fontSize: 32 }}>☆</span>}
        />
      )}
    </Box>
  );
}
