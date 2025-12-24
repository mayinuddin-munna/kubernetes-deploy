import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './user.interface';

const UserSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'seller', 'manufacturer'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userCode: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        'https://as1.ftcdn.net/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this as TUser;

  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  next();
});

UserSchema.methods.comparePassword = function (entirePassword: string) {
  const user = this as TUser;
  return bcrypt.compareSync(entirePassword, user.password);
};

const Users = mongoose.model<TUser>('Users', UserSchema);

export default Users;
