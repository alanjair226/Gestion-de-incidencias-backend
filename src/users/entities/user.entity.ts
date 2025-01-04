import { Score } from "../../scores/entities/score.entity";
import { Role } from "../../common/enum/rol.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incidence } from "../../incidences/entities/incidence.entity";
import { Usercomment } from "src/usercomments/entities/usercomment.entity";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column( { nullable:false, select: false} )
    password: string;

    @Column({ unique: true, nullable:false })
    email: string;

    @Column( { type:'enum', default: Role.USER, enum: Role } )
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Score, (score) => score.user)
    scores: Score[];

    @OneToMany(() => Incidence, (incidence) => incidence.assigned_to)
    assigned_to: Incidence[];

    @OneToMany(() => Incidence, (incidence) => incidence.created_by)
    created_by: Incidence[];

    @OneToMany(() => Usercomment, (comment) => comment.user)
    comments: Comment[];
}
