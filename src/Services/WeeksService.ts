import Shift from "../Models/Shift";
import Week from "../Models/Week";
import { appStore } from "../Redux/AppState";
import { weekActions } from "../Redux/Slices/WeekSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class WeeksService {
  public async getAll(): Promise<Week[]> {
    let weeks = appStore.getState().weeks;

    if (weeks.length === 0) {
      const response = await server().get<Week[]>(AppConfig.weekUrl);
      weeks = response.data;
      appStore.dispatch(weekActions.setAll(weeks));
    }

    return weeks;
  }

  public async calculate(weekToCalculate: Week): Promise<Week> {
    const response = await server().post<Week>(
      AppConfig.weekUrl + AppConfig.calculateUrl,
      weekToCalculate
    );
    const week = response.data;
    appStore.dispatch(weekActions.update(week));
    return week;
  }

  public async addShiftToWeek(shift: Shift): Promise<void> {
    appStore.dispatch(weekActions.addShiftToWeek(shift));
  }

  public async removeShiftFromWeek(shift: Shift): Promise<void> {
    appStore.dispatch(weekActions.removeShiftFromWeek(shift));
  }

  public async create(weekToCreate: Week): Promise<Week> {
    const response = await server().post<Week>(
      AppConfig.weekUrl + AppConfig.createUrl,
      weekToCreate
    );
    const week = response.data;

    appStore.dispatch(weekActions.update(week));

    return week;
  }

  public async update(weekToUpdate: Week): Promise<Week> {
    const response = await server().post<Week>(
      AppConfig.weekUrl + AppConfig.updateUrl,
      weekToUpdate
    );
    const week = response.data;

    appStore.dispatch(weekActions.update(week));

    return week;
  }

  public async delete(
    weekIdToDelete: string
  ): Promise<void> {
    const response = await server().delete<string>(AppConfig.weekTypeUrl, {
      params: weekIdToDelete,
    });
    const week = response.data;

    appStore.dispatch(weekActions.remove(weekIdToDelete));
  }
}

const weeksService = new WeeksService();

export default weeksService;
