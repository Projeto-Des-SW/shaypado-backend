import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';
import { TrainerProfile } from "./TrainerProfile";


@Entity('plans_document')
export class PlansDocument {
    
        @PrimaryGeneratedColumn('uuid')
        id: string;
    
        @Column()
        name: string;

        @Column()
        path: string;
    
        constructor() {
            this.id = uuid();
            this.name = '';
            this.path = '';
        }
}