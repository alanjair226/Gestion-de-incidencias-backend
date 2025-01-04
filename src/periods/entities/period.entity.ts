import { Incidence } from "src/incidences/entities/incidence.entity";
import { Score } from "src/scores/entities/score.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Asegúrate de que este decorador está aquí
export class Period {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    is_open: boolean;

    @OneToMany(() => Score, (score) => score.Period)
    user_score: Score[];

    @OneToMany(() => Incidence, (incidence) => incidence.period)
    Incidence: Score[];

}
