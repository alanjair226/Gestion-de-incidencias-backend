import { Period } from "src/periods/entities/period.entity";
import { Severity } from "src/severities/entities/severity.entity";
import { Usercomment } from "src/usercomments/entities/usercomment.entity";
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
    
    @Column({type: "boolean"})
    status: boolean;

    @ManyToOne(() => Severity, (severity) => severity.id, {
        eager: true,
    })
    severity: Severity;
    
    @ManyToOne(() => Period, (period) => period.id, {
        eager: true,
    })
    period: Period;

    @Column()
    created_at: Date;

    @OneToOne(() => Usercomment, (comment) => comment.incidence, {
        eager: true,
    })
    @JoinColumn()
    comment: Usercomment; 
}
