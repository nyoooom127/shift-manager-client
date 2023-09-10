import ShiftModel from "./ShiftModel";

class WeekModel {
  public UUIDString?: string;
  public shifts: ShiftModel[];
  public isClosed?: boolean;
  public isActive?: boolean;
  public comment: string | null;
}

export default WeekModel;
