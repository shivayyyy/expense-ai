import type { Request, Response, NextFunction } from "express";
export default function auth(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.d.ts.map