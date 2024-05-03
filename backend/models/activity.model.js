import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        point: {
            type: mongoose.Schema.Types.Number,
            require: true,
            min: 0,
            max: 6,
        },
        activityCode: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const activityModel = mongoose.model("activity", activitySchema);

export default activityModel;
