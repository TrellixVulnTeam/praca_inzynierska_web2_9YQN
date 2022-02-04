export class BookModel{
    id: string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt: Date = new Date;
    isModified?: boolean;
    lastModifiedAt?: Date;
    isDeleted?: boolean;
    deletedAt?: Date;
    title: string = '';
    isbn: string = '';
    publishedYear: number = 0;
    description: string = '';
    likes: number = 0;
    dislikes: number = 0;
    likesPercentage: number = 0;
    approved: boolean = false;
    subtitle?: string;
    series?: string;
    pages?: number;
    createdBy: string = '00000000-0000-0000-0000-000000000000';
    categoryId:	string = '00000000-0000-0000-0000-000000000000';
    languageId:	string = '00000000-0000-0000-0000-000000000000';
    publisherId: string = '00000000-0000-0000-0000-000000000000';
    imageCoverId: string = '00000000-0000-0000-0000-000000000000';
}