import Constraint from "../Models/Constraint";
import { appStore } from "../Redux/AppState";
import { constraintActions } from "../Redux/Slices/ConstraintSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ConstraintService {
  public async create(constraintToCreate: Constraint): Promise<Constraint> {
    const response = await server().post<Constraint>(
      AppConfig.constraintUrl + AppConfig.createUrl,
      constraintToCreate
    );
    const constraint = response.data;

    appStore.dispatch(constraintActions.update(constraint));

    return constraint;
  }

  public async update(constraintToUpdate: Constraint): Promise<Constraint> {
    const response = await server().post<Constraint>(
      AppConfig.constraintUrl + AppConfig.updateUrl,
      constraintToUpdate
    );
    const constraint = response.data;

    appStore.dispatch(constraintActions.update(constraint));

    return constraint;
  }

  public async delete(constraintIdToDelete: string): Promise<void> {
    // const response =
    await server().delete<string>(AppConfig.constraintUrl, {
      params: {
        id: constraintIdToDelete,
      },
    });
    // const constraint = response.data;

    appStore.dispatch(constraintActions.remove(constraintIdToDelete));
  }
}

const constraintsService = new ConstraintService();

export default constraintsService;
