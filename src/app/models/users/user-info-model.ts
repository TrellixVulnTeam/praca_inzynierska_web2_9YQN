export class UserInfoModel{
    id: string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt: Date = new Date();
    isModified?: boolean;
    lastModifiedAt?: Date;
    isDeleted?: boolean;
    deleteAt?: Date;
    userName: string = '';
    email: string = '';
    likes: number = 0;
    numberOfBooks: number = -1;
    name: string = '';
    surname: string = '';
    sex: string = '';
    suspended?: Date;
    banned?: boolean;
    level: string ='';
  }