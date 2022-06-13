export interface AlertModel {
  type: string;
  message: string;
}

export const defaultAlert: AlertModel = {
  type: "",
  message: "",
};
