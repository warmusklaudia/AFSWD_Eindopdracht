import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ description: 'reservation' })
export class Reservation {
  @Field(() => ID, { description: 'id of the reservation' })
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Field(() => User)
  user: User;

  @Field({ defaultValue: 0 })
  @Column()
  rooms: number;

  @Field()
  @Column()
  amountAdults: number;

  @Field()
  @Column()
  amountChildren: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  reservationStartDate: Date;

  @Field()
  @Column()
  reservationEndDate: Date;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
