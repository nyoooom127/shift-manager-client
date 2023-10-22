import ConstraintType from "../Models/ConstraintType";
import { appStore } from "../Redux/AppState";
import { constraintTypeActions } from "../Redux/Slices/ConstraintTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ConstraintTypesService {
  public async getAllConstraintTypes(): Promise<ConstraintType[]> {
    let constraintTypes = appStore.getState().constraintTypes;

    if (constraintTypes.length === 0) {
      const response = await server.get<ConstraintType[]>(
        AppConfig.constraintTypeUrl
      );
      constraintTypes = response.data;
      appStore.dispatch(constraintTypeActions.setAll(constraintTypes));
    }

    return constraintTypes;
  }
}

const constraintTypesService = new ConstraintTypesService();

export default constraintTypesService;
