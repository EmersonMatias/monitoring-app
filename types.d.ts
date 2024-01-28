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

type TVigilant = {
    id: number,
    name: string,
    entryTime: string,
    departureTime: string,
    agency: TAgency
    saturday: boolean
    sunday: boolean
    contigency: {
        id: number,
        contigency: boolean,
        frequency: number,
        hour: number | null,
        minute: number | null,
        status: string,
        userId: number,
    }
}

type TVigilant2 = {
    name: string,
    dateofbirth: string,
    login: string,
    rg: string,
    cpf: string,
    entryTime: string,
    departureTime: string,
    saturday: boolean,
    sunday: boolean,
    agency: {
      id: number,
      name: string
    },
    status: [
      {
        frequency: number
      }
    ]
  }

type TCheckpoints = {
    id: number
    arrived: boolean,
    arrivalTime: string,
    day: number,
    month: number,
    year: number,
    user: {
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

type TCreateUser = {
    name: string;
    dateofbirth: string;
    rg: string;
    cpf: string;
    agencyId: string;
    entryTime: string;
    departureTime: string;
    login: string;
    password: string;
    frequency: number,
    saturday: string,
    sunday: string
}


type TAgency = {
    id: number,
    name: string
}

type TCreateAgency = {
    name: string
}


type TUpdateUser = {
    name: string;
    dateofbirth: string ;
    rg: string ;
    cpf: string ;
    agencyId: number ;
    entryTime: string ;
    departureTime: string;
    login: string;
    frequency: number ;
    saturday: string,
    sunday: string
}

type TGetUserForUpdate = {
    name: string;
    dateofbirth: string ;
    rg: string;
    cpf: string;
    agency: string;
    entryTime: string;
    departureTime: string ;
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
    user: {
        name: string,
        agency: TAgency
    }
}

type TMessageViewed = {
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
    user: {
        name: string
    }
}


