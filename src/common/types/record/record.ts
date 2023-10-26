export interface IPublicRecord {
    id:number|null
    authorId: number|null
    recordName: string
    recordText: string
    timeCreated: string
    recordAuthor: string
    setIsClick:(value:string)=> void
}
export interface IPublicRecordCreate {
    authorId: number|null
    recordName: string
    recordText: string
}