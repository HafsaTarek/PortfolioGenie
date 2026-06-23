import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       default: "",
//     },

//     jobTitle: {
//       type: String,
//       default: "",
//     },

//     bio: {
//       type: String,
//       default: "",
//     },

//     website: {
//       type: String,
//       default: "",
//     },

//     location: {
//       type: String,
//       default: "",
//     },

//     profileImage: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("User", userSchema);

const userSchema = new mongoose.Schema(
  {
    // ===== Auth Fields =====
    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
    },

    phone: {
      type: String,
      default: "",
    },

    jobTitle: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // ===== GitHub Fields =====

    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    githubUsername: {
      type: String,
      default: "",
    },

    avatarUrl: {
      type: String,
      default: "",
    },

    followers: {
      type: Number,
      default: 0,
    },

    publicReposCount: {
      type: Number,
      default: 0,
    },

    topLanguages: [
      {
        type: String,
      },
    ],

    accessToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
