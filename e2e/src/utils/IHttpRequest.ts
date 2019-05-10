export interface IHttpRequest {
  method?: string;
  path: string;
  body?: {
    type: string,
    string?: string,
    json: any
  };
  queryStringParameters?: any;
}
