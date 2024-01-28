import { UUID } from "crypto";
import Constraint from "../Models/Constraint";
import { appStore } from "../Redux/AppState";
import { userActions } from "../Redux/Slices/UserSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class ConstraintService {
  public async create(constraintToCreate: Constraint): Promise<Constraint> {
    const response = await server().post<Constraint>(
      AppConfig.constraintUrl + AppConfig.createUrl,
      constraintToCreate
    );
    const constraint = response.data;

    const users = appStore.getState().users;
    let user = users.find((u) => u.id === constraint.user);

    if (!user) {
      return;
    }

    const newConstraints = user.constraints ? user.constraints : [];

    newConstraints.push(constraint);

    user.constraints = [...newConstraints];

    appStore.dispatch(userActions.update(user));

    return constraint;
  }

  public async update(constraintToUpdate: Constraint): Promise<Constraint> {
    const response = await server().post<Constraint>(
      AppConfig.constraintUrl + AppConfig.updateUrl,
      constraintToUpdate
    );
    const constraint = response.data;

    const users = appStore.getState().users;
    let user = users.find((u) => u.id === constraint.user);

    if (!user) {
      return;
    }

    const newConstraints = user.constraints ? user.constraints : [];

    const constraintIndex = newConstraints.findIndex(
      (c) => c.id === constraint.id
    );

    if (constraintIndex !== -1) {
      newConstraints[constraintIndex] = constraint;
    } else {
      newConstraints.push(constraint);
    }

    user.constraints = [...newConstraints];

    appStore.dispatch(userActions.update(user));

    return constraint;
  }

  public async delete(
    constraintIdToDelete: string,
    userID: UUID
  ): Promise<void> {
    // const response =
    await server().delete<string>(AppConfig.constraintUrl, {
      params: {
        id: constraintIdToDelete,
      },
    });
    // const constraint = response.data;

    const users = appStore.getState().users;
    let user = users.find((u) => u.id === userID);

    if (!user) {
      return;
    }

    const newConstraints = user.constraints ? user.constraints : [];

    const constraintIndex = newConstraints.findIndex(
      (c) => c.id === constraintIdToDelete
    );

    if (constraintIndex !== -1) {
      newConstraints.splice(constraintIndex, 1);
    }

    user.constraints = [...newConstraints];

    appStore.dispatch(userActions.update(user));
  }
}

const constraintsService = new ConstraintService();

export default constraintsService;
