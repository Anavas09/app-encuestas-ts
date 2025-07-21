import { Button } from "@/components/ui/button";

interface SurveyActionsProps {
  onSubmit: () => void;
}

export default function SurveyActions({ onSubmit }: SurveyActionsProps) {
  return (
    <div className="mt-4">
      <Button className="w-full" onClick={onSubmit}>
        Enviar respuestas
      </Button>
    </div>
  );
}
