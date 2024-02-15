
type TSigninResponse = {
    name: string,
    userId: string,
    entryTime: string,
    token: string,
    accountType: "admin" | "user",
    agency: string
}

type TAlerts = {
    id: number,
    viewed: boolean,
    day: number,
    month: number,
    year: number,
    name: string
}

// ! STATUS TYPE
type Status = {
    id: number
    timestamp: Date
    situation: "OK" | "PANIC"
    frequency: number
    userId: number
}

// ! CHECKPOINT TYPES

type CreateCheckpointForm = {
    date: string
}

type CreateCheckpoint = {
    date: Date
    userId: number
}

// ! CONTINGENCY TYPES
type TActivateContingencyData = {
    userId: number,
    frequency: number,
}

type TDeactivateContingencyData = {
    userId: number
}

type TCheckpointContingencyData = {
    userId: number,
    status: string
}

type TContigency = {
    id: number,
    contigency: boolean,
    frequency: number,
    hour: number | null,
    minute: number | null,
    status: string,
    userId: number,
    user?: {
        name: string
    }
}

// ! NOVOS TIPOS

interface Contingency {
    id: number
    active: boolean
    timestamp: Date
    frequency: number
    situation: "OK" | "PANIC"
    userId: number
}

// ! Message Types
interface Message {
    id: number,
    dateTime: Date,
    message: string,
    viewed: boolean,
    response: string,
    agency: Agency
    user: {
        id: number,
        name: string
    }
}

type UpdateMessage = {
    response: string
}

type CreateMessage = {
    userId: number,
    agencyId: number
    message: string
    dateTime: Date
}

type FormCommentMessage = {
    comment: string
}

type FormNewMessage = {
    message: string
}

// ! Vigilant Types
interface VigilantBase {
    name: string
    dateOfBirth: Date
    rg: string
    cpf: string
    entryTime: Date
    departureTime: Date
    workOnSaturday: boolean
    workOnSunday: boolean
    agencyId: number
    login: string
    password: string
    accountType: "user" | "admin"
}

interface VigilantBody extends VigilantBase {
    frequency: number
}

interface Vigilant extends VigilantBase {
    id: number,
    status: Omit<Status, 'userId'>
}

interface Vigilants extends VigilantBase {
    id: number,
    status: Omit<Status, 'userId'>
    contigency: Omit<Contingency, 'userId'>
    agency: Agency
}

type CreateVigilantForm = Omit<VigilantBody, 'dateOfBirth' | 'entryTime' | 'departureTime' | 'agencyId' | 'workOnSaturday' | 'workOnSunday' | 'accountType' | 'frequency'> & {
    dateOfBirth: string,
    entryTime: string,
    departureTime: string,
    agencyId: string,
    workOnSaturday: string,
    workOnSunday: string,
    frequency: string
}

type UpdateVigilantForm = Omit<CreateVigilantForm, 'password'>

type UpdateVigilantBody = Omit<VigilantBody, 'password' | 'accountType'>

// ! Agency Types
interface Agency {
    id: number,
    name: string
}

type CreateAgencyForm = Omit<Agency, 'id'>

type Checkpoints = {
    id: number,
    date: Date,
    arrived: boolean,
    arrivalTime: Date,
    agency: Agency
    user: {
        id: number,
        name: string,
        entryTime: Date,
        departureTime: Date,
        workOnSaturday: boolean,
        workOnSunday: boolean
    }
}

interface CustomError extends Error {
    response: {
        data: {
            message: string
        }
    }
}


