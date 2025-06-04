import { getModelForClass, prop, pre } from '@typegoose/typegoose';
import { Types } from 'mongoose';

enum Role {
    Distributor = 'Distributor',
    Producer = 'Producer',
    Consumer = 'Consumer'
}

@pre<Akun>('save', function() {
    if (!this._id) {
        this._id = new Types.ObjectId().toString();
    }
})
export class Akun {
  @prop()
  public _id?: string;

  @prop({ required: true, unique: true })
  public publicKey!: string;

  @prop({ required: true, enum: Role })
  public role!: Role;

  @prop({ default: Date.now })
  public createdAt?: Date;
}

export const AkunModel = getModelForClass(Akun);
export { Role };