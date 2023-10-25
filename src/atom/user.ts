// Will have atom related to user

import { atom } from "recoil";
import { IUser } from "../types/types"
import { Types } from "mongoose";

export const userAtom = atom({
    key: 'userAtom',
    default: {
        name: '',
        role: '',
        email: '',
        passwd: '',
        projects: [],
        orgId: new Types.ObjectId,
        chatTo: [],
    } as IUser
});