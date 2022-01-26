export class LanguageModel{
    id:	string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt = new Date();
    isModified?: boolean = false;
    lastModifiedAt? = null;
    isDeleted?: boolean = false;
    deletedAt? = null;
    language: string = ''
    addedBy: string = '00000000-0000-0000-0000-000000000000';
}