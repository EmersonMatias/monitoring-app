type TFormSignin = {
    token: string | undefined,
    accountType: string | undefined
}

type TSigninResponse = {
    name: string,
    userId: string,
    entryTime: string,
    token: string,
    accountType: "admin" | "user",
    agency: string
}

type TCheckpoints = {
    id: number
    arrived: boolean,
    arrivalTime: string,
    day: number,
    month: number,
    year: number,
    userId: number,
    user?: {
        name: string,
        agency: TAgency
        entryTime: string
    }
}

type TUserCheckpoints = {
    id: number,
    day: number,
    month: number,
    year: number,
    arrived: boolean,
    arrivalTime: string,
    userId: number
}

type TUpdateUser = TCreateUser

type TUpdateUser = {
    name: string;
    dateofbirth: string;
    rg: string;
    cpf: string;
    agencyId: number;
    entryTime: string;
    departureTime: string;
    login: string;
    frequency: number;
    saturday: string,
    sunday: string
}

type TGetUserForUpdate = {
    name: string;
    dateofbirth: string;
    rg: string;
    cpf: string;
    agency: string;
    entryTime: string;
    departureTime: string;
    login: string;
    saturday: string;
    sunday: string;
    status: {
        frequency: number;
    }[]
}

type TMessage = {
    id: number,
    day: number,
    month: number,
    year: number,
    hour: string,
    message: string,
    response: string,
    viewed: boolean,
    userId?: number,
    user?: {
        name: string,
        agency: TAgency
    }
}

type TUpdateMessage = {
    response: string,
    messageId: number
}

type TUserStatus = {
    name: string,
    entryTime: string,
    departureTime: string,
    agency: TAgency
}

type TStatusWithUser = {
    id: number,
    hour: number,
    minute: number
    status: string,
    userId: number,
    user: TUserStatus
}

type Status = {
    id: number,
    hour: number,
    minute: number,
    status: string,
    frequency: number,
    userId: number
}

type TAlerts = {
    id: number,
    viewed: boolean,
    day: number,
    month: number,
    year: number,
    name: string
}

type FormMessageProps = {
    comment: string
}

type FormEmergencyMessageProps = {
    message: string
}

type TCreateMessageData = {
    userId: number | undefined;
    message: string;
}

type TUpdateStatus = {
    newStatus: string,
    statusID: number | undefined
}

// ! CHECKPOINT TYPES

type TCreateCheckpointForm = {
    date: string
}

type TCreateCheckpointData = {
    day: number,
    month: number,
    year: number,
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

interface Status {
    id: number
    timestamp: Date
    situation: "OK" | "PANIC"
    frequency: number
    userId: number
}

interface Contingency {
    id: number
    active: boolean
    timestamp: Date
    frequency: number
    situation: "OK" | "PANIC"
    userId: number
}

// ? Vigilant Types
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

interface Vigilants extends VigilantBase{
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

// ? Agency Types
interface Agency{
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


