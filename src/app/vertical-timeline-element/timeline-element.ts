export interface ITimeLineElement {
  id: string;
  content: string;
  class: string;
  icon: string;
  iconStyle: string;
  date: Date;
  position: string;
  state: {
    visible: boolean
  };
  hasFiles?: boolean;
  hasDetails: boolean;
  files?: Array<any>;
}
