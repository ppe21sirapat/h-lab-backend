export interface IQueryString<TWhere> {
  where?: TWhere;
  order?: any;
  skip?: number;
  limit?: number;
  select?: string[];
  page?: number;
  search?: string;
}
