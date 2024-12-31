import { Comment } from "../../comments/entities/comment.entity";
import { Severity } from "../../severities/entities/severity.entity";
import { Trimester } from "../../trimesters/entities/trimester.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Incidence {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.assignedIncidences, {
        eager: true,
    })
    assigned_to: User;

    @ManyToOne(() => User, (user) => user.createdIncidences, {
        eager: true,
    })
    created_by: User;
    
    @Column()
    value: string;
    
    @Column()
    status: string;

    @ManyToOne(() => Severity, (severity) => severity.incidences)
    severity: Severity;
    
    @ManyToOne(() => Trimester, (trimester) => trimester.incidences)
    trimester: Trimester;

    @Column()
    created_at: Date;

    @OneToOne(() => Comment, (comment) => comment.comment)
    @JoinColumn()
    comment: Comment;
}
