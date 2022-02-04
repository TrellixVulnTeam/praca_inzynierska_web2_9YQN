export class PublisherModel{
    id:	string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt = new Date();
    isModified?: boolean;
    lastModifiedAt?: Date;
    isDeleted?:	boolean;
    deletedAt?: Date;
    publisherName: string = '';
    city: string = '';
    postCode?: string;
    street?: string;
    building?: string;
    premises?: string;
    addedBy: string = '00000000-0000-0000-0000-000000000000';
}