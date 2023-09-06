import { type } from "os";

export enum userPermissionsEnum {
  USER,
  ADMIN,
}

export enum shiftOptionEnum {
  OJT,
  LEV,
  PRIMARY,
  SECONDARY,
  INTEGRATION,
}

export interface authorizationData {
  userName: string;
  password: string;
}

export interface constraint {
  uuidString: string;
  dateInMillis: number;
}

export interface user {
  id: string;
  fullName: string;
  ojtScore: number | null;
  levScore: number | null;
  integrationScore: number | null;
  galaxyScore: number | null;
  constraints: constraint[];
  shiftOptions: shiftOptionEnum[];
  userPermissions?: userPermissionsEnum[];
  authorizationData: authorizationData | null;
}

export interface shift {
  type: string;
  dateInMillis: number;
  user: user | null;
  comment: string | null;
  needed: boolean;
  id: string;
}

export interface shiftType {
  id: number;
  title: string;
  name: string;
  numDays: number;
  color: string;
}

export interface day {
  ojtShift: shift;
  primaryShift: shift;
  secondaryShift: shift;
  levShift: shift;
  integrationShift: shift;
  dateInMillis: number;
  comment: string | null;
}

export interface week {
  UUIDString?: string;
  shifts: shift[];
  isClosed?: boolean;
  isActive?: boolean;
  comment: string | null;
}
