import { RequestHandler } from 'express';
import Joi from 'joi';
import { RegisterRequestDTO, acessTokenDTO } from '../database/dto/AuthenticationDTO';
import * as jwt from "jsonwebtoken";

export class AuthenticationValidation {

    private registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        userType: Joi.string().valid('student', 'teacher').required(),
        weigth: Joi.string().optional(),
        height: Joi.string().optional(),
        workoutDays: Joi.string().optional(),
        any_disease: Joi.string().optional()
    });

    private loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    public validateRegister: RequestHandler = async (req, res, next) => {
        
        let registerRequest = <RegisterRequestDTO>req.body;

        this.registerSchema.validateAsync(registerRequest).then(() => {
            req.body = registerRequest;
            next();
        }).catch((err) => {
            res.status(400).send({ message: err.details });
        });
    };

    public validateLogin: RequestHandler = async (req, res, next) => {
        
        let loginRequest = req.body;

        this.loginSchema.validateAsync(loginRequest).then(() => {
            req.body = loginRequest;
            next();
        }).catch((err) => {
            res.status(400).send({ message: err.details });
        });
    };

    public validateToken: RequestHandler = async (req, res, next) => {
        const authHeader = <string>req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Token not found' });
        }
        try {
            if (process.env.JWT_SECRET) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.headers.userId = (<acessTokenDTO>decoded).id;
                req.headers.userType = (<acessTokenDTO>decoded).userType;
                req.headers.email = (<acessTokenDTO>decoded).email;
                next();
            } else {
                return res.status(500).send({ message: 'Access token secret not found' });
            }
        } catch (err) {
            return res.status(401).send({ message: 'Invalid token' });
        }
    };
};

