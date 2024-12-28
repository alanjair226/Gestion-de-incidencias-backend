import { Role } from "../../common/enum/rol.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
