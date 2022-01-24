export class CommentModel{
    id: string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt: Date = new Date();
    isModified?: boolean;
    lastModifiedAt?: Date;
    isDeleted?: boolean;
    deleteAt?: Date;
    comment: string = '';
    addedBy: string = '00000000-0000-0000-0000-000000000000';
    bookId: string = '00000000-0000-0000-0000-000000000000';

}