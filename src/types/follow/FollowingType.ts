import { UserType } from '../UserType';

export interface FollowingType {
  userId: number;
  users: UserType[];
}
