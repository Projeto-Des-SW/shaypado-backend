import { Router } from 'express';
import { ExerciseMiddlewares } from '../middlewares/ExerciseMiddlewares';
import { createExercise, getAllExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/ExerciseController';
import { AuthenticationValidation } from '../middlewares/AuthenticationMiddleware';

const router = Router();
const exerciseMiddlewares = new ExerciseMiddlewares();
const authValidator = new AuthenticationValidation();

router.post(
    '/',
    authValidator.validateToken,
    exerciseMiddlewares.validateCreateExercise,
    async (req, res, next) => {
        try {
            await createExercise(req.body, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get( '/user/list-all-exercises', 
            authValidator.validateToken, 
            exerciseMiddlewares.validateGetAllExercisesByUser, 
            async (req, res, next) => {
                try {
                    await getAllExercises(req, res);
                } catch (error) {
                    next(error);
                }
            }
);

router.get( '/:id', 
            authValidator.validateToken, 
            async (req, res, next) => {
                try {
                    await getExerciseById(req, res);
                } catch (error) {
                    next(error);
                }
            }  
);

router.put( '/:id', 
            authValidator.validateToken, 
            async (req, res, next) => {
                try {
                    await updateExercise(req, res);
                } catch (error) {
                    next(error);
                }
            }
);
router.delete( '/:id', 
                authValidator.validateToken, 
                async (req, res, next) => {
                     try {
                          await deleteExercise(req, res);
                     } catch (error) {
                          next(error);
                     }
                }
);

export default router;



