import { CommonIncidence } from "src/common_incidences/entities/common_incidence.entity";
import { Incidence } from "src/incidences/entities/incidence.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Severity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: number;

    @OneToMany(() => CommonIncidence, (incidence) => incidence.severity)
    commonincidence: CommonIncidence[];

    @OneToMany(() => Incidence, (incidence) => incidence.severity)
    incidence: Incidence[];

}
