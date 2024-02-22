import { Request, Response } from 'express';
import { ExerciseService } from '../services/ExerciseService';
import { ExerciseCreateRequestDTO } from '../database/dto/ExerciseDTO';

const exerciseService = new ExerciseService();

export const createExercise = async (req: ExerciseCreateRequestDTO, res: Response) => {
    try {
        const exercise = await exerciseService.createExercise(req);
        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create exercise' });
    }
}

export const getAllExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
}

export const getExerciseById = async (req: Request, res: Response) => {
    const exerciseId = req.params.id;
    try {
        const exercise = await exerciseService.getExerciseById(exerciseId);
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ error: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercise' });
    }
}

export const updateExercise = async (req: Request, res: Response) => {
    const exerciseId = req.params.id;
    try {
        const exercise = await exerciseService.updateExercise(exerciseId, req.body);
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ error: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update exercise' });
    }
}

export const deleteExercise = async (req: Request, res: Response) => {
    const exerciseId = req.params.id;
    try {
        const result = await exerciseService.deleteExercise(exerciseId);
        if (result) {
            res.json({ message: 'Exercise deleted' });
        } else {
            res.status(404).json({ error: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete exercise' });
    }
}

export const getAllExercisesByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const exercises = await exerciseService.getAllExercisesByUser(userId);
        if (exercises.length === 0) {
            res.status(404).json({ error: 'No exercises found for this user' });
        }
        
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
}

