import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Incidence {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    assigned_to: string;

    @Column()
    created_by: string;

    @Column()
    severity_id: string;

    @Column()
    value: string;

    @Column()
    trimester_id: string;
    
    @Column()
    status: string;

    @Column()
    admin_id: string;
}
