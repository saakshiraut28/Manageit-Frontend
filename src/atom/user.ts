// Will have atom related to user

import { atom } from "recoil";
import { UserData } from "../types/types"

export const userAtom = atom({
    key: 'userAtom',
    default: { 
        exist: false,
        name: '',
        role: 'user',
        email: '',
        passwd: '',
        projects: [],
        orgId: '',
        chatTo: [], 
    } as UserData
});