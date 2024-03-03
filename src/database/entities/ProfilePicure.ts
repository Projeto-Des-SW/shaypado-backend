import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';
import { TrainerProfile } from "./TrainerProfile";


@Entity('profile_picture')
export class ProfilePicture {
    
        @PrimaryGeneratedColumn('uuid')
        id: string;
    
        @Column()
        name: string;

        @Column()
        path: string;
    
        @ManyToOne(() => TrainerProfile, trainerProfile => trainerProfile.id)
        trainer: TrainerProfile | null;
    
        constructor() {
            this.id = uuid();
            this.name = '';
            this.path = '';
            this.trainer = null;
        }
}