export interface WorkoutDTO {
    id: string;
    name: string;
    start_hour: string;
    end_hour: string;
    day: string;
    workoutType: string;
    user: string;
    exercises: string[];
}

export interface WorkoutTypeDTO {
    type: string;
}

