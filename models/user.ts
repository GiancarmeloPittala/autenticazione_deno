import { Model, DataTypes } from 'https://deno.land/x/denodb/mod.ts';

class User extends Model {
  static table = 'user';
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type : DataTypes.STRING,
      length: 100,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      length: 100,
      allowNull: false
    },
    pass: {
      type :DataTypes.STRING,
      length: 60,
      allowNull: false
    }
  };

  static defaults = {
    name: null,
  };

}



export { User } 