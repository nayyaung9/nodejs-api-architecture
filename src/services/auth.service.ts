import { IUser, IUserInputDTO } from "@/interfaces/IUser";
import { Service, Inject } from "typedi";
import config from "@/config";
import jwt from "jsonwebtoken";

@Service()
export default class AuthService {
  constructor(@Inject("userModel") private userModel: Models.UserModel) {}

  public async Authenticate(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const { email } = userInputDTO;

      if (email) {
        const findUser = await this.userModel.findOne({ email });

        console.log("findUser", findUser);
        if (findUser) {
          const token = this.generateToken(findUser);

          return { user: findUser, token };
        } else {
          const newUser = await this.userModel.create({
            email,
          });

          const token = this.generateToken(newUser);

          return { user: newUser, token };
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        _id: user._id,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
