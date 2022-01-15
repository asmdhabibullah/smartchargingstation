import {
    model, Schema, Model, Document, Date
} from "mongoose";

// Station attributes
interface StationAttrs {
    chargingStationName?: string,
    chargingStationLocation?: string,
    chargingStationPorts?: [
        {
            checkIn?: string;
            checkOut?: string;
            charging?: boolean;
            portNumber?: string;
            portQRCode?: string;
            portAddress?: string;
            devices?: [string];
            totalChargingTime?: string;
        }
    ];
};

// Interface that has founder properties in the Documents object.
interface StationDoc extends Document {
    chargingStationName?: string;
    chargingStationLocation?: string;
    chargingStationPorts?: [
        {
            checkIn?: string;
            checkOut?: string;
            charging?: boolean;
            portNumber?: string;
            portQRCode?: string;
            portAddress?: string;
            devices?: [string];
            totalChargingTime?: string;
        }
    ];
};

// Station model properties that has in Model
interface StationModel extends Model<StationDoc> {
    build(attrs: StationAttrs): StationDoc;
};

// Station app MongoDB schema for database fields
const StationSchema = new Schema(
    {
        chargingStationName: {
            type: String,
            trim: true,
            default: null
        },
        chargingStationLocation: {
            type: String,
            trim: true,
            default: null
        },
        chargingStationPorts: [
            {
                checkIn: {
                    type: Date
                },
                checkOut: {
                    type: Date
                },
                portNumber: {
                    type: String,
                    trim: true,
                    default: null
                },
                portQRCode: {
                    type: String,
                    trim: true,
                    default: null
                },
                charging: {
                    type: Boolean,
                    default: false
                },
                portAddress: {
                    type: String,
                    trim: true,
                    default: null
                },
                devices: [
                    {
                        type: Schema.Types.ObjectId,
                        trim: "Device"
                    }
                ],
                totalChargingTime: {
                    type: String,
                    trim: true
                },
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
// const buildUser = (attrs: StationSchema) => {
//     return new Station(attrs);
// }

// Better way to approch
StationSchema.statics.build = (attrs: StationAttrs) => {
    return new Station(attrs);
}

const Station = model<StationDoc, StationModel>("Station", StationSchema);


export { Station }

