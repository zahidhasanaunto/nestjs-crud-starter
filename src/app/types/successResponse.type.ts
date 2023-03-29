export class SuccessResponse {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public data: any;
  public meta: {
    total?: number;
    limit?: number;
    page?: number;
    skip?: number;
  };

  constructor(
    message: string,
    data?: any,
    meta?: {
      total?: number;
      limit?: number;
      page?: number;
      skip?: number;
    }
  ) {
    this.success = true;
    this.statusCode = 200;
    this.message = message || 'Success';
    if (meta) {
      this.meta = meta;
    }
    this.data = data || null;
  }
}
