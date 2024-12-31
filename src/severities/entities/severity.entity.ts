import { CommonIncidence } from "../../common_incidences/entities/common_incidence.entity";
import { Incidence } from "../../incidences/entities/incidence.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Severity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @OneToMany(() => Incidence, (incidence) => incidence.severity)
    incidences: Incidence[];

    @OneToMany(() => CommonIncidence, (commonIncidence) => commonIncidence.severity)
    commonIncidences: CommonIncidence[];
}
