import { Incidence } from "src/incidences/entities/incidence.entity";
import { Score } from "src/scores/entities/score.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Period {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    start_date: Date;

    @Column({nullable: true})
    end_date: Date;

    @Column({default:true})
    is_open: boolean;

    @OneToMany(() => Score, (score) => score.period)
    user_score: Score[];

    @OneToMany(() => Incidence, (incidence) => incidence.period)
    Incidence: Score[];

}
