interface ISignupPayload {
    email: string
    username: string
    password: string
}
interface ISigninPayload {
    email: string,
    password: string
}
interface ISigninResponse {
    id: string
    email: string
    username: string
}

