import Express from "express";

export default async function(app: Express.Express) {
  const { IsSnowflake, ValidateSnowflake } = await import('../helpers/validators.js')
  const ResDef = await (await import("../helpers/response.js")).default
  const { fetchUser } = await import("../helpers/user.js")
  const { fetchImg } = await import("../helpers/image.js")


  app.get("/avatar/:id", async (req: Express.Request, res: Express.Response): Promise<void> => {
    const id: string = req.params.id;
  
    if(!IsSnowflake(id)) {
      return ValidateSnowflake(id, res);
    }
  
    const user = await fetchUser(id);
  
    if(user === null) {
      return ResDef(res, {
        status: 500,
        error: {
          name: "Invalid ID",
          message: "Invalid ID"
        }
      });
    }
  
    res.status(200).send({
      status: 200,
      done: true,
      data: `https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp`
    });
  });
  
  app.get("/avatar/:id/:size", async (req: Express.Request, res: Express.Response): Promise<void> => {
    const id: string = req.params.id;
  
    if(!IsSnowflake(id)) {
      return ValidateSnowflake(id, res);
    }
  
    let size: number = 64;
  
    if(typeof req.params.size?.match?.(/^[0-9]+$/) === "object") {
      const n: number = parseInt(req.params.size);
      
      if(n % 2 === 0 && n !== 0) {
        size = n;
      }
    }
  
    const user = await fetchUser(id);
  
    if(user === null) {
      return ResDef(res, {
        status: 500,
        error: {
          name: "Invalid ID",
          message: "Invalid ID"
        }
      });
    }

    const img = await fetchImg(id, size);
  
    res
      .status(200)
      .type(".webp")
      .send(img)
  });
}