import ShiftType from "../Models/ShiftType";
import { appStore } from "../Redux/AppState";
import { shiftTypeActions } from "../Redux/Slices/ShiftTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ShiftTypesService {
  public async getAll(): Promise<ShiftType[]> {
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

  public async create(
    shiftTypeToCreate: ShiftType
  ): Promise<ShiftType> {
    const response = await server.post<ShiftType>(
      AppConfig.shiftTypeUrl + AppConfig.createUrl,
      shiftTypeToCreate
    );
    const shiftType = response.data;

    appStore.dispatch(shiftTypeActions.update(shiftType));

    return shiftType;
  }

  public async update(
    shiftTypeToUpdate: ShiftType
  ): Promise<ShiftType> {
    const response = await server.post<ShiftType>(
      AppConfig.shiftTypeUrl + AppConfig.updateUrl,
      shiftTypeToUpdate
    );
    const shiftType = response.data;

    appStore.dispatch(shiftTypeActions.update(shiftType));

    return shiftType;
  }

  public async delete(
    shiftTypeIdToDelete: string
  ): Promise<void> {
    const response = await server.delete<string>(AppConfig.shiftTypeUrl, {
      params: shiftTypeIdToDelete,
    });
    const shiftType = response.data;

    appStore.dispatch(shiftTypeActions.remove(shiftTypeIdToDelete));
  }
}

const shiftTypesService = new ShiftTypesService();

export default shiftTypesService;
