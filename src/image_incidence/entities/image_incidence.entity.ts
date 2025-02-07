import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Incidence } from "src/incidences/entities/incidence.entity";

@Entity()
export class ImageIncidence {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => Incidence, incidence => incidence.images)
    incidence: Incidence;
}

