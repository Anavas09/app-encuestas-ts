import { Typography } from "./ui/typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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
    <div className="mb-6">
      <Typography variant="h6" className="mb-2">{question.question}</Typography>
      {question.type === 'single' && (
        <RadioGroup
          value={typeof value === 'string' ? value : ''}
          onValueChange={(val) => onSingleChange(question.id, val)}
        >
          {question.options.map((opt) => (
            <div key={opt} className="flex items-center space-x-2 mb-1">
              <RadioGroupItem value={opt} id={`${question.id}-${opt}`} />
              <label htmlFor={`${question.id}-${opt}`} className="text-sm font-medium">
                {opt}
              </label>
            </div>
          ))}
        </RadioGroup>
      )}
      {question.type === 'multiple' && (
        <div className="flex flex-col gap-2">
          {question.options.map((opt) => (
            <div key={opt} className="flex items-center space-x-2">
              <Checkbox
                id={`${question.id}-multi-${opt}`}
                checked={Array.isArray(value) && (value as string[]).includes(opt)}
                onCheckedChange={() => onMultipleChange(question.id, opt)}
              />
              <label htmlFor={`${question.id}-multi-${opt}`} className="text-sm font-medium">
                {opt}
              </label>
            </div>
          ))}
        </div>
      )}
      {question.type === 'rating' && (
        <div className="flex items-center space-x-1 mt-2">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              type="button"
              className={cn(
                "text-3xl transition-colors",
                Number(value) >= star ? "text-yellow-400" : "text-gray-300"
              )}
              onClick={() => onRatingChange(question.id, star)}
              aria-label={`Calificar ${star}`}
            >
              ★
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
