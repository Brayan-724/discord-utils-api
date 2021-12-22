import Express from "express";

export default async function (app: Express.Express) {
  const ResDef = await (await import("../helpers/response.js")).default;
  const { fetchUser } = await import("../helpers/user.js");

  app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const user = await fetchUser(id);

    if (user === null) {
      return ResDef(res, {
        status: 400,
        error: {
          name: "Invalid ID",
          message: "Invalid ID",
        },
      });
    }

    res.status(200).send({
        status: 200,
        done: true,
        data: user,
    });
  });
}
