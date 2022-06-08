import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItemGroup } from "./ItemGroup";

interface Specification {
  [key: string]: number | string
}

@Entity()
export class Item {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  price: number

  @ManyToOne(() => ItemGroup)
  itemGroup: ItemGroup;

  @Column({
    type: 'json',
    transformer: {
      from: val => {
        console.log(val)
        console.log(typeof val)
        return JSON.parse(val)
      },
      to: val => JSON.stringify(val)
    }
  })
  specification: Specification;
}