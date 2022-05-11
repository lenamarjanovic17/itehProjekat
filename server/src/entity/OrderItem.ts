import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { Order } from "./Order";


@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  itemName: string;

  @Column()
  count: number;

  @Column()
  itemPrice: number;

  @ManyToOne(() => Item, { onDelete: 'SET NULL' })
  item: Item;

  @ManyToOne(() => Order, o => o.orderItems, { onDelete: 'CASCADE' })
  order: Order;
}