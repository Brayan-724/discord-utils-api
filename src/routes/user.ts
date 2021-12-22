import type Express from "express";

export default async function (app: Express.Express) {
  const ResDef = await (await import("../helpers/response.js")).default;
  const { fetchUser } = await import("../helpers/user.js");

  app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const user = await fetchUser(id);

    if (user === null) {
      return ResDef(res, {
        status: 404,
        error: {
          name: "UserNotFound",
          message: "User not found",
        },
      });
    }

    // TODO: Return user with public flags resolved

    return ResDef(res, {
      status: 200,
      data: user,
    });
  });

  app.get("/user/:id/raw", async (req, res) => {
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

    res.status(200).send(user);
  });
}
