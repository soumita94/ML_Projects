
export type AttendanceStatus = 'Present' | 'Late' | 'Absent';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface PredictRequest {
  Attendance_Status: AttendanceStatus;
  Stress_Level: number;
  Anxiety_Level: number;
  Mood_Score: number;
}

export interface PredictResponse {
  predicted_category: RiskLevel;
}

export interface PredictionState {
  data: PredictResponse | null;
  loading: boolean;
  error: string | null;
}
