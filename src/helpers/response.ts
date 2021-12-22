import Express from "express"

export interface ResErrorObject {
  message: string,
  name: string
}

export interface ResDefOptions {
  status: number,
  data?: any,
  error?: ResErrorObject | null
}

export default ResDef;
export function ResDef(res: Express.Response, options: ResDefOptions): void {
  const done = options.status <= 400;

  res
    .status(options.status)
    .send({
      done: done,
      status: options.status,
      data: done ? (options.data || {}) : null,
      error: done ? null : (options.error || { name: "Unexpected", message: "IDK" })
    })
}