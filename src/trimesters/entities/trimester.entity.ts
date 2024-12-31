import { Incidence } from "../../incidences/entities/incidence.entity";
import { UserTrimesterScore } from "../../user_trimester_scores/entities/user_trimester_score.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Asegúrate de que este decorador está aquí
export class Trimester {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    is_open: boolean;

    @OneToMany(() => Incidence, (incidence) => incidence.trimester)
    incidences: Incidence[];

}
