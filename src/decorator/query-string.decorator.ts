import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QueryString = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const where = query.where ? JSON.parse(query.where) : <any>{};
    const limit = query.limit ? parseInt(query.limit) : 20;
    const order = query.order ? JSON.parse(query.order) : <any>{};
    const select = query.select || [];
    const search = query.search;
    const page = query.page ? parseInt(query.page) : 1;
    const skip = (page - 1) * limit;
    const res = { where, limit, order, skip, select, page, search };
    return data ? res[data] : res;
  },
);
