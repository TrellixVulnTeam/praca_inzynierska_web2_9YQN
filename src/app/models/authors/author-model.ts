export class AuthorModel{
    id: string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt: Date = new Date();
    isModified?: boolean;
    lastModifiedAt?: Date;
    isDeleted?: boolean;
    deleteAt?: Date;
    surname: string = '';
    birthDate: Date = new Date();
    isApprove: boolean = false;
    name?: string;
    secondName?: string;
    deathDate?: string;
    biography: string = '';
    addedBy: string = '00000000-0000-0000-0000-000000000000';
}