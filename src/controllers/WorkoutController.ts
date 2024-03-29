import { Request, Response } from 'express';
import { WorkoutService } from '../services/WorkoutService';
import { Workout } from '../database/entities/Workout';
import { WorkoutDTO } from '../database/dto/WorkoutDTO';
import { User } from '../database/entities/User';
import { get } from 'http';

const workoutService = new WorkoutService();

export const createWorkout = async (req: WorkoutDTO, res: Response) => {
    try {
        const workout = await workoutService.createWorkout(req);
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
}

export const getAllWorkouts = async (req: Request, res: Response) => {
    try {
        const workouts = await workoutService.getAllWorkouts();
        res.json(workouts);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
}

export const getWorkoutById = async (req: Request, res: Response) => {
    const workoutId = req.params.id;
    try {
        const workout = await workoutService.getWorkoutById(workoutId);
        if (workout) {
            res.json(workout);
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
}

export const updateWorkout = async (req: Request, res: Response) => {
    const workoutId = req.params.id;
    try {
        const workout = await workoutService.updateWorkout(workoutId, req.body);
        if (workout) {
            res.json(workout);
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update workout' });
    }
}

export const deleteWorkout = async (req: Request, res: Response) => {
    const workoutId = req.params.id;
    try {
        const result = await workoutService.deleteWorkout(workoutId);
        if (result) {
            res.json({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
}

export const createMultiplesWorkouts = async (req: Request, res: Response) => {
    try {
        const workouts = await workoutService.createMultiplesWorkouts(req.body);
        res.status(201).json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create workouts' });
    }
};

export const listAllWorkoutTypes = async (req: Request, res: Response) => {
    try {
        const workoutTypes = await workoutService.listAllWorkoutTypes();
        res.json(workoutTypes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout types' });
    }
};

export const getTrainingPrePreparede = async (req: Request, res: Response) => {
    console.log('entrou');
    try {
        const workouts = await workoutService.getTrainingPrePreparede();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
}

