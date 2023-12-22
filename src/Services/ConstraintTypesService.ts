import ConstraintType from "../Models/ConstraintType";
import { appStore } from "../Redux/AppState";
import { constraintTypeActions } from "../Redux/Slices/ConstraintTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ConstraintTypesService {
  public async getAll(): Promise<ConstraintType[]> {
    let constraintTypes = appStore.getState().constraintTypes;

    if (constraintTypes.length === 0) {
      const response = await server().get<ConstraintType[]>(
        AppConfig.constraintTypeUrl
      );
      constraintTypes = response.data;
      appStore.dispatch(constraintTypeActions.setAll(constraintTypes));
    }

    return constraintTypes;
  }

  public async create(
    constraintTypeToCreate: ConstraintType
  ): Promise<ConstraintType> {
    const response = await server().post<ConstraintType>(
      AppConfig.constraintTypeUrl + AppConfig.createUrl,
      constraintTypeToCreate
    );
    const constraintType = response.data;

    appStore.dispatch(constraintTypeActions.update(constraintType));

    return constraintType;
  }

  public async update(
    constraintTypeToUpdate: ConstraintType
  ): Promise<ConstraintType> {
    const response = await server().post<ConstraintType>(
      AppConfig.constraintTypeUrl + AppConfig.updateUrl,
      constraintTypeToUpdate
    );
    const constraintType = response.data;

    appStore.dispatch(constraintTypeActions.update(constraintType));

    return constraintType;
  }

  public async delete(
    constraintTypeIdToDelete: string
  ): Promise<void> {
    const response = await server().delete<string>(AppConfig.constraintTypeUrl, {
      params: constraintTypeIdToDelete,
    });
    const constraintType = response.data;

    appStore.dispatch(constraintTypeActions.remove(constraintTypeIdToDelete));
  }
}

const constraintTypesService = new ConstraintTypesService();

export default constraintTypesService;
