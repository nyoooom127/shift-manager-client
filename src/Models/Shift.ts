import { UUID } from 'crypto';
import { MomentInput } from 'moment';
import { RegisterOptions } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { calcIsFromHome } from '../Utils/ShiftUtils';
import ShiftType from './ShiftType';

class Shift {
  id: UUID;
  startDate: MomentInput;
  type: ShiftType;
  user: string;
  week: string;
  isFromHome: boolean;

  constructor(
    startDate: MomentInput,
    type: ShiftType,
    user: string,
    week: string
  ) {
    this.id = uuidv4() as UUID;
    this.startDate = startDate;
    this.type = type;
    this.user = user;
    this.week = week;
    this.isFromHome = calcIsFromHome(startDate, type);
  }

  public static startDateValidation: RegisterOptions<Shift, 'startDate'> = {
    required: { value: true, message: 'שדה חובה' },
    valueAsDate: true,
  };

  public static typeValidation: RegisterOptions<Shift, 'type'> = {
    required: { value: true, message: 'שדה חובה' },
  };

  public static userValidation: RegisterOptions<Shift, 'user'> = {
    required: { value: true, message: 'שדה חובה' },
  };
}

export default Shift;
