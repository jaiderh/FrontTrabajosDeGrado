import { Council } from './council';
import { IRequest } from './request';

export class CouncilDetail extends Council {

  DueDate: Date;
  City: string;
  Location: string;
  AttendeesAndGuests: string;
  Signers: string;
  MeetingTopics: string;
  Various: string;
  Year: number;
  Number: number;
  Requests: IRequest[] = [];
  StateId: number;

  constructor() {
    super();
  }

}
