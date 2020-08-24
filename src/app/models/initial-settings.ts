
export class InitialSettings {
  Programs: BasicData[];
  Branches: BasicData[];
  Faculties: BasicData[];
  RequestTypes: RequestType[];
}

export class BasicData {
  Id: number;
  Name: string;
}

export class RequestType extends BasicData {
  Pririty: number;
  HintText: string;
  RequiresDetail: boolean;
  LabelDetail: string;
}
