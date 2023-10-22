import Shift from "../Models/Shift";
import ShiftType from "../Models/ShiftType";
import { appStore } from "../Redux/AppState";
import { shiftActions } from "../Redux/Slices/ShiftSlice";
import { shiftTypeActions } from "../Redux/Slices/ShiftTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ShiftService {
  public async getAllShifts(): Promise<Shift[]> {
    let shifts = appStore.getState().shifts;

    if (shifts.length === 0) {
      const response = await server.get<Shift[]>(
        AppConfig.shiftUrl
      );
      shifts = response.data;
      appStore.dispatch(shiftActions.setAll(shifts));
    }

    return shifts;
  }

  public async createShift(shift: Shift): Promise<Shift[]> {
    let shifts = appStore.getState().shifts;

    if (shifts.length === 0) {
      const response = await server.get<Shift[]>(
        AppConfig.shiftUrl
      );
      shifts = response.data;
      appStore.dispatch(shiftActions.setAll(shifts));
    }

    return shifts;
  }
}

const shiftsService = new ShiftService();

export default shiftsService;
