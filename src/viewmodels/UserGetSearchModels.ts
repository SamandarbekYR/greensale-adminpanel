interface Users{
    id: number ;
    firstName: string ;
    lastName: string ;
    phoneNumber: string 
    phoneNuberConfirme: boolean ;
    region: string ;
    district: string ;
    address: string ;
    createdAt: Date ;
    updatedAt: Date ;
}
interface UserGetSearchViewModels
{
    iteamCount:number ;
    item2: Users[];
}

export type {UserGetSearchViewModels}