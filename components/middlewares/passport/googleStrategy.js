import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../users/User";
import { UserModel } from "../../users/userModel";
import { googleConfig } from "../../lib/config";
import dotenv from "dotenv";
dotenv.config();

const googleStrategy = new GoogleStrategy(
  googleConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await UserModel.findOne({
        email: profile._json.email,
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new UserModel({
        email: profile._json.email,
        name: profile._json.name,
      });
      const savedUser = await newUser.save();
      await DailyMetrics.createUserMetrics(savedUser);

      done(null, savedUser);
    } catch (err) {
      done(err);
    }
  }
);

export default googleStrategy;

// export default () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_ID,
//         clientSecret: process.env.GOOGLE_SECRET,
//         callbackURL: "/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         console.log("google profile: ", profile);
//         try {
//           const exUser = await User.findOne({
//             where: { snsId: profile.id, provider: "google" },
//           });
//           if (exUser) {
//             done(null, exUser);
//           } else {
//             const newUser = await User.create({
//               email: profile?.email[0].value,
//               nick: profile.displayName,
//               snsId: profile.id,
//               provider: "google",
//             });
//             done(null, newUser);
//           }
//         } catch (error) {
//           console.error(error);
//           done(error);
//         }
//       }
//     )
//   );
// };
