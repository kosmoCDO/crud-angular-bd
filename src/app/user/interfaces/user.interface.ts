export interface Cargo {
    ID_CARGO: string,
    CARGO: string,
}

export interface User {
    APELLIDO?: string ,
    ID_CARGO?: string,
    CARGO?: Cargo,
    EMAIL: string,
    FECHA_NACIMIENTO?: string,
    NOMBRE?: string,
    PASSWORD: string,
}


export interface Data {
    user: User | null,
    event: string,
}

export interface DataApi {
    data: User[],
    message?: string,
}