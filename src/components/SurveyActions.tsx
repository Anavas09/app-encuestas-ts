import { Button, Box } from '@mui/material';

interface SurveyActionsProps {
  onSubmit: () => void;
}

export default function SurveyActions({ onSubmit }: SurveyActionsProps) {
  return (
    <Box mt={2}>
      <Button variant="contained" color="primary" onClick={onSubmit} fullWidth>
        Enviar respuestas
      </Button>
    </Box>
  );
}
