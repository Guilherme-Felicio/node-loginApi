import express, { Request, Response, Router } from "express";

interface HttpRequest {
  body: any;
}

interface httpRouter {
  route: any;
}
class expressRouterAdapter {
  static adapt(router: httpRouter) {
    return async (req: Request, res: Response) => {
      const httpRequest = {
        body: req.body,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}

// signUp-Router
class signUpRouter {
  async route(httpRequest: HttpRequest) {
    const { email, password, repeatPassword } = httpRequest.body;
    const user = await new signUpUseCase().signUp(
      email,
      password,
      repeatPassword
    );
    return {
      statusCode: 200,
      body: user,
    };
  }
}

// signUp use-case

class signUpUseCase {
  async signUp(email: string, password: string, repeatPassword: string) {
    if (password === repeatPassword) console.log(email);

    return new addAccountRepository().add(email, password);
  }
}

// account repository
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class addAccountRepository {
  async add(email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  }
}

// Server.ts

const app = express();
const router = Router();
const route = new signUpRouter();

const signUp = router.post(
  "/signUp",
  express.json(),
  expressRouterAdapter.adapt(route)
);

app.use("/", signUp);
app.get("/", (req, res) => {
  res.status(200).json({ message: "oi" });
});

app.listen(3000, () => console.log("listen port 3000"));
