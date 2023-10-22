import Constraint from "../Models/Constraint";
import ConstraintType from "../Models/ConstraintType";
import { appStore } from "../Redux/AppState";
import { constraintActions } from "../Redux/Slices/ConstraintSlice";
import { constraintTypeActions } from "../Redux/Slices/ConstraintTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ConstraintService {
  public async getAllConstraints(): Promise<Constraint[]> {
    let constraints = appStore.getState().constraints;

    if (constraints.length === 0) {
      const response = await server.get<Constraint[]>(
        AppConfig.constraintUrl
      );
      constraints = response.data;
      appStore.dispatch(constraintActions.setAll(constraints));
    }

    return constraints;
  }

  public async create(constraint: Constraint): Promise<Constraint[]> {
    let constraints = appStore.getState().constraints;

    if (constraints.length === 0) {
      const response = await server.get<Constraint[]>(
        AppConfig.constraintUrl
      );
      constraints = response.data;
      appStore.dispatch(constraintActions.setAll(constraints));
    }

    return constraints;
  }
}

const constraintsService = new ConstraintService();

export default constraintsService;
