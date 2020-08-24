
export class Response {

  constructor(public RequestId: number,
    public State: number,
    public Observations: string,
    public RequestTypeId: number) { }
}
