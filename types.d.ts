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
    agency: string
}

type TCheckpoints = {
    arrived: boolean,
    arrivalTime: string,
    date: string,
    user: {
        name: string,
        agency: string
        entryTime: string
    }
}

type TCreateUser = {
    name: string;
    dateofbirth: string;
    rg: string;
    cpf: string;
    agency: string;
    entryTime: string;
    departureTime: string;
    login: string;
    password: string;
}

type TMessage = {
    id: number,
    date: Date,
    hour: string,
    message: string,
    response: string,
    viewed: boolean,
    user: {
        name: string,
        agency: string
    }
}

type TMessageViewed = {
    response: string,
    messageId: number
}