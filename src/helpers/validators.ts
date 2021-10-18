import ResDef from "./response.js"
import Express from "express";


export function IsSnowflake(id: any): boolean {
  if(typeof id !== "string") 
    return false;

  if(id.match(/^[0-9]{16,18}$/) === null) {
    return false
  }

  return true;
}

export function ValidateSnowflake(id: any, res: Express.Response): void {
  if(typeof id !== "string") 
    return ResDef(res, {
      status: 400,
      error: {
        name: "No ID",
        message: `There's not ID in \"${id}\"`
      }
    });

  if(id.match(/^[0-9]{16,18}$/) === null) {
    return ResDef(res, {
      status: 400,
      error: {
        name: "Invalid ID",
        message: "Invalid ID format."
      }
    });
  }

  return;
}