import WeekType from "../Models/WeekType";
import { appStore } from "../Redux/AppState";
import { weekTypeActions } from "../Redux/Slices/WeekTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class WeekTypesService {
  public async getAll(): Promise<WeekType[]> {
    let weekTypes = appStore.getState().weekTypes;

    if (weekTypes.length === 0) {
      const response = await server().get<WeekType[]>(
        AppConfig.weekTypeUrl
      );
      weekTypes = response.data;
      appStore.dispatch(weekTypeActions.setAll(weekTypes));
    }

    return weekTypes;
  }

  public async create(
    weekTypeToCreate: WeekType
  ): Promise<WeekType> {
    const response = await server().post<WeekType>(
      AppConfig.weekTypeUrl + AppConfig.createUrl,
      weekTypeToCreate
    );
    const weekType = response.data;

    appStore.dispatch(weekTypeActions.update(weekType));

    return weekType;
  }

  public async update(
    weekTypeToUpdate: WeekType
  ): Promise<WeekType> {
    const response = await server().post<WeekType>(
      AppConfig.weekTypeUrl + AppConfig.updateUrl,
      weekTypeToUpdate
    );
    const weekType = response.data;

    appStore.dispatch(weekTypeActions.update(weekType));

    return weekType;
  }

  public async delete(
    weekTypeIdToDelete: string
  ): Promise<void> {
    // const response = 
    await server().delete<string>(AppConfig.weekTypeUrl, {
      params: weekTypeIdToDelete,
    });
    // const weekType = response.data;

    appStore.dispatch(weekTypeActions.remove(weekTypeIdToDelete));
  }
}

const weekTypesService = new WeekTypesService();

export default weekTypesService;
