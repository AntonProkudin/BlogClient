export interface IPublicComment {
    id:number|null
    forRecordId: number|null
    fromUserId: number|null
    text: string
    createdTime: string
    authorComment: string
    setIsClick:(value:string)=> void
}