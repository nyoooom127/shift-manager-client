import UserModel from "./UserModel";

class ShiftModel {
    public type: string;
    public dateInMillis: number;
    public user: UserModel | null;
    public comment: string | null;
    public needed: boolean;
    public id: string;
}

export default ShiftModel;
