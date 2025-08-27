import { env } from "@/env";
import { jwt } from "@elysiajs/jwt";

import cookie from "@elysiajs/cookie";
import Elysia, { Static, t } from "elysia";
import { NotAManagerError } from "./routes/errors/not-a-manager-error";
import { UnauthorizedError } from "./routes/errors/unauthorized-error";

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
});

export const authentication = new Elysia()
  .use(cookie({}))
  .use(
    jwt({
      name: "jwt",
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayloadSchema,
    })
  )
  .derive({ as: "global" }, ({ jwt, cookie: { auth } }) => {
    return {
      getCurrentUser: async () => {
        const payload = await jwt.verify(auth.value);

        if (!payload) {
          throw new UnauthorizedError();
        }

        return payload;
      },

      signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
        auth.set({
          value: await jwt.sign(payload),
          httpOnly: true,
          maxAge: 7 * 86400,
          path: "/",
        });
      },
      signOut: () => {
        auth.remove();
      },
    };
  })
  .derive({ as: "global" }, ({ getCurrentUser }) => {
    return {
      getManagedRestaurantId: async () => {
        const { restaurantId } = await getCurrentUser();

        if (!restaurantId) {
          throw new NotAManagerError();
        }

        return restaurantId;
      },
    };
  })
  .error({
    UNAUTHORIZED: UnauthorizedError,
    NOT_A_MANAGER: NotAManagerError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UNAUTHORIZED":
        set.status = 401;
        return { code, message: error.message };
      case "NOT_A_MANAGER":
        set.status = 401;
        return { code, message: error.message };
    }
  });
