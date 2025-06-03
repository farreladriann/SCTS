import { getModelForClass, prop } from '@typegoose/typegoose';

export class Akun {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public publicKey!: string;
}

export const AkunModel = getModelForClass(Akun);