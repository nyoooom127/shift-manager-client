import WeekType from "../Models/WeekType";
import { appStore } from "../Redux/AppState";
import { weekTypeActions } from "../Redux/Slices/WeekTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class WeekTypesService {
  public async getAllWeekTypes(): Promise<WeekType[]> {
    let weekTypes = appStore.getState().weekTypes;

    if (weekTypes.length === 0) {
      const response = await server.get<WeekType[]>(
        AppConfig.weekTypeUrl
      );
      weekTypes = response.data;
      appStore.dispatch(weekTypeActions.setAll(weekTypes));
    }

    return weekTypes;
  }
}

const weekTypesService = new WeekTypesService();

export default weekTypesService;
