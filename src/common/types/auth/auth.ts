export interface IPropsLogin{
    setPassword:(value:string)=> void
    setEmail:(value:string)=>void
    navigate:(to:string)=>void
}
export interface IPropsRegister{
    setPassword:(value:string)=> void
    setEmail:(value:string)=>void
    setLastName:(value:string)=> void
    setRepeatPassword:(value:string)=>void
    setFirstName:(value:string)=> void
    navigate:(to:string)=> void
}
export interface IAuthState{
    user: IPublicUser,
    isLogged: boolean,
}
export interface IPublicUser {
    email: string
    password: string
    userMessage: string
    userToken: string|null
    id:number|null
    firstName: string
    lastName: string
    role: string
}
export interface ILoginData{
    password:string
    email:string
}
export interface IRegisterData{
    password:string
    email:string
    firstName: string
    lastName: string
}
