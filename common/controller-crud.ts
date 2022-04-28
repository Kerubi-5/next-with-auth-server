import { Request, Response } from "express";

export type ApiFN = (req: Request, res: Response) => Promise<any>;

export type ControllerCRUD = {
  index: ApiFN;
  store: ApiFN;
  show: ApiFN;
  update: ApiFN;
  destroy: ApiFN;
};

export type ControllerUSER = {
  index: ApiFN;
  register: ApiFN;
  login: ApiFN;
  show: ApiFN;
  update: ApiFN;
  destroy: ApiFN;
};
