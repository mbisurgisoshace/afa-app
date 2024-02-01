type JotformSubmissionStatus = "ACTIVE" | "DELETED";

export type JotformResponseContent = {
  id: string;
  form_id: string;
  created_at: string;
  answers: Record<string, any>;
  status: JotformSubmissionStatus;
};
