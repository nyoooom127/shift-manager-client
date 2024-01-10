import Shift from "../Models/Shift";
import { appStore } from "../Redux/AppState";
import { shiftActions } from "../Redux/Slices/ShiftSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ShiftService {
  // public async getAll(): Promise<Shift[]> {
  //   let shifts = appStore.getState().shifts;

  //   if (shifts.length === 0) {
  //     const response = await server().get<Shift[]>(
  //       AppConfig.shiftUrl
  //     );
  //     shifts = response.data;
  //     appStore.dispatch(shiftActions.setAll(shifts));
  //   }

  //   return shifts;
  // }

  // public async create(shiftToCreate: Shift): Promise<Shift> {
  //   const response = await server().post<Shift>(
  //     AppConfig.shiftUrl + AppConfig.createUrl,
  //     shiftToCreate
  //   );
  //   const shift = response.data;

  //   appStore.dispatch(shiftActions.update(shift));

  //   return shift;
  // }

  // public async update(shiftToUpdate: Shift): Promise<Shift> {
  //   const response = await server().post<Shift>(
  //     AppConfig.shiftUrl + AppConfig.updateUrl,
  //     shiftToUpdate
  //   );
  //   const shift = response.data;

  //   appStore.dispatch(shiftActions.update(shift));

  //   return shift;
  // }

  // public async delete(
  //   shiftIdToDelete: string
  // ): Promise<void> {
  //   // const response = 
  //   await server().delete<string>(AppConfig.shiftTypeUrl, {
  //     params: shiftIdToDelete,
  //   });
  //   // const shift = response.data;

  //   appStore.dispatch(shiftActions.remove(shiftIdToDelete));
  // }
}

const shiftsService = new ShiftService();

export default shiftsService;
