import { Period } from "src/periods/entities/period.entity";
import { Severity } from "src/severities/entities/severity.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Incidence {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 1000
    })
    description: string;

    @ManyToOne(() => User, (user) => user.id, {
        eager: true,
    })
    assigned_to: User;

    @ManyToOne(() => User, (user) => user.id, {
        eager: true,
    })
    created_by: User;
    
    @Column({type: "float"})
    value: number ;
    
    @Column({type: "boolean", default: false})
    status: boolean;

    @Column({type: "boolean", default: true})
    valid: boolean;

    @ManyToOne(() => Severity, (severity) => severity.id, {
        eager: true,
    })
    severity: Severity;
    
    @ManyToOne(() => Period, (period) => period.id, {
        eager: true,
    })
    period: Period;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at: Date;

    @Column({
        type: "varchar",
        length: 1000,
        default: null
    })
    comment: string; 
}
