import { Trimester } from "../../trimesters/entities/trimester.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class UserTrimesterScore {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.scores)
    user: User;


    @Column()
    score: number;
}
