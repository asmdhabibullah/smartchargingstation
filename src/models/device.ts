import {
    model, Schema, Model, Document, Date
} from "mongoose";


// Type of device
enum Role {
    CAR = "CAR",
    BIKE = "BIKE"
}

// Device attributes
interface DeviceAttrs {
    deviceName?: string;
    deviceType?: Role,
    deviceUser?: string;
};

// Interface that has founder properties in the Documents object.
interface DeviceDoc extends Document {
    deviceName?: string;
    deviceType?: Role;
    deviceUser?: string;
};

// Device model properties that has in Model
interface DeviceModel extends Model<DeviceDoc> {
    build(attrs: DeviceAttrs): DeviceDoc;
};

// Device app MongoDB schema for database fields
const DeviceSchema = new Schema(
    {
        deviceName: {
            type: String,
            trim: true,
            default: null
        },
        deviceType: {
            type: String,
            trim: true,
            required: true,
            enum: Role,
            default: Role.BIKE
        },
        deviceUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        chargingStations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Station"
            }
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);


// Use this schema's interface here
// const buildUser = (attrs: DeviceSchema) => {
//     return new Device(attrs);
// }

// Better way to approch
DeviceSchema.statics.build = (attrs: DeviceAttrs) => {
    return new Device(attrs);
}

const Device = model<DeviceDoc, DeviceModel>("Device", DeviceSchema);


export { Device }