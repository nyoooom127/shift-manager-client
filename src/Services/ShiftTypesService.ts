import ShiftType from "../Models/ShiftType";
import { appStore } from "../Redux/AppState";
import { shiftTypeActions } from "../Redux/Slices/ShiftTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ShiftTypesService {
  public async getAllShiftTypes(): Promise<ShiftType[]> {
    let shiftTypes = appStore.getState().shiftTypes;

    if (shiftTypes.length === 0) {
      const response = await server.get<ShiftType[]>(
        AppConfig.shiftTypeUrl
      );
      shiftTypes = response.data;
      appStore.dispatch(shiftTypeActions.setAll(shiftTypes));
    }

    return shiftTypes;
  }
}

const shiftTypesService = new ShiftTypesService();

export default shiftTypesService;
