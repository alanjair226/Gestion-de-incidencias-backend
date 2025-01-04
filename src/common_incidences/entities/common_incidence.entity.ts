import { Severity } from '../../severities/entities/severity.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class CommonIncidence {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 1000
    })
    incidence: string;

    @ManyToOne(() => Severity, (severity) => severity.incidence)
    severity: Severity;
}

