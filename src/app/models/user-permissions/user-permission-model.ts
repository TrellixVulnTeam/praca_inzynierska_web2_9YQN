export class UserPermissionModel{
    id: string = '00000000-0000-0000-0000-000000000000';
    isBuildIn: boolean = false;
    createdAt: Date = new Date();
    isModified?: boolean;
    lastModifiedAt?: Date;
    isDeleted?: boolean;
    deleteAt?: Date;
    permissionName: string ='';
    userId: string = '00000000-0000-0000-0000-000000000000';
}