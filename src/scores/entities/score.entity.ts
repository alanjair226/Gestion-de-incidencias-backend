import { Period } from "src/periods/entities/period.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Score {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id, {
        eager: true,
    })
    user: User;

    @ManyToOne(() => Period, (period) => period.id, {
        eager: true,
    })
    Period: Period;

    @Column()
    score: number;
}
