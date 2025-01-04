import { Severity } from '../../severities/entities/severity.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CommonIncidence {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Severity, (severity) => severity.incidence)
    severity: Severity;
}

