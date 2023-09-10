import { appStore } from "../Redux/Slices/AppState";
import shiftDemoTypes from "../demo/types.json";
import ShiftTypeModel from "../Models/ShiftTypeModel";
import { shiftTypeActions } from "../Redux/Slices/ShiftTypeSlice";

class ShiftTypesService {
  public async getAllShiftTypes(): Promise<ShiftTypeModel[]> {
    let shiftTypes = appStore.getState().shiftTypes;

    if (shiftTypes.length === 0) {
      shiftTypes = [...shiftDemoTypes] as ShiftTypeModel[];
      appStore.dispatch(shiftTypeActions.setAll(shiftTypes));
    }

    return shiftTypes;
  }
}

const shiftTypesService = new ShiftTypesService();

export default shiftTypesService;
