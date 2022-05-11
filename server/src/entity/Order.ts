import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./OrderItem";
import { TargetLocation } from "./TargetLocation";
import { User } from "./User";


@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'json',
    transformer: {
      from: val => JSON.parse(val),
      to: val => JSON.stringify(val)
    }
  })
  targetLocation: TargetLocation;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED']
  })
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DELIVERED';

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  acceptedAt: Date;

  @Column()
  rejectedAt: Date;

  @Column()
  delivereddAt: Date;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => OrderItem, i => i.order)
  orderItems: OrderItem[];
}