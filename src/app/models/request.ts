export class IRequest {
  Id: number;
  Priority: number;
  Code: String;
  Date: Date;
  Applicants: any[];
  Faculty: String;
  City: String;
  Program: String;
  RequestType: String;
  State: String;
  Act: String;
}

export class IRequestDetail {
  Id: number;
  Priority: number;
  Code: String;
  Date: Date;
  Applicants: ApplicantDetail[];
  Files: any[];
  Faculty: String;
  FacultyId: number;
  Branch: String;
  BranchId: number;
  Program: String;
  ProgramId: number;
  RequestType: String;
  RequestTypeId: number;
  State: number;
  StateName: string;
  Act: String;
  Observations: string;
  Detail: string;
  RequestTypeDetail: string;
  IsPolicyAcepted: boolean;
  UploadKey: string;

  constructor() {
    this.Id = 0;
    this.Applicants = new Array();
    this.Files = new Array();
    this.Applicants.push( new ApplicantDetail() );
  }
}

export class RelatedRequest {
  Code: String;
  Date: Date;
  RequestType: String;
  StateName: String;
  Observations: String;
}

export class ApplicantDetail {
  Id: number;
  Name: string;
  LastName: string;
  Document: string;
  Code: string;
  ApplicantType: string;
  ApplicantTypeId: number;
  Email: string;
  Phone: string;
  RelatedRequests: number;

  get FullName(): string {
    return `${this.Name} ${this.LastName}`;
  }
}
