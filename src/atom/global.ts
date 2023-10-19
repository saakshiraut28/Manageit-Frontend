// Will have all the atoms related to global use
import { atom } from "recoil"

// Types and interfaces
import { AlertTextdef } from "../types/types"
// --------------------


export const alertAtom = atom({
    key: 'alertText',
    default: {open: false, text: '', eventType: 'success'} as AlertTextdef
});

export const loadingAtom = atom({
    key: 'loadingAtom',
    default: {open: false, text: ''} as {open: boolean, text?: string}
});

