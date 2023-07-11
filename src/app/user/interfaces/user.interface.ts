
export interface User {
    APELLIDO?: string ,
    CARGO?: string,
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