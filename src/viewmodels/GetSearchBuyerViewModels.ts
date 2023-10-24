interface BuyerImage {
    buyerpostId: number;
    imagePath: string;
    createdAt: Date;
    updatedAt: Date ;
    id: number;
  }
  
 interface PostBuyerViewModel {
    id: number ;
    fullName: string;
    userId: number;
    userPhoneNumber: string;
    postPhoneNumber: string;
    //userRegion: string;
    categoryId: number;
    title: string;
    description: string;
    price: number;
    capacity: number;
    capacityMeasure: string;
    type: string;
    region: string;
    district: string;
    address : string;
    status: number;
    averageStars : number;
    userStars:number;
    updatedAt: Date ;
    createdAt: Date ;
    buyerPostsImages: BuyerImage[];
    mainImage: string;
  }
  
 interface GetSearchBuyerViewModels
{
    iteamCount:number;
    item2: PostBuyerViewModel[] ;
}

export type {GetSearchBuyerViewModels}