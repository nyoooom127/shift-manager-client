import WeekModel from "../Models/WeekModel";
import { appStore } from "../Redux/Slices/AppState";
import weekDemoData from "../demo/week.json";
import { weekActions } from "../Redux/Slices/WeekSlice";

class WeeksService {
  public async getAllWeeks(): Promise<WeekModel[]> {
    let weeks = appStore.getState().weeks;

    if (weeks.length === 0) {
      weeks = [...weekDemoData] as WeekModel[];
      appStore.dispatch(weekActions.setAll(weeks));
    }

    return weeks;
  }
}

const weeksService = new WeeksService();

export default weeksService;
