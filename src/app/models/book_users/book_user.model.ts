export class BookUserModel{
    id: string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt: Date = new Date;
    isModified?: boolean | null =  null;
    lastModifiedAt?: Date | null = null;
    isDeleted?: boolean | null = null;
    deletedAt: Date | null = null;
    userId: string = '00000000-0000-0000-0000-000000000000';
    bookId: string = '00000000-0000-0000-0000-000000000000';
}