import {
    model, Schema, Model, Document, Date
} from "mongoose";

// Payment attributes
interface PaymentAttrs {
    user?: string;
    device?: string;
    totalAmount?: string;
};

// Interface that has founder properties in the Documents object.
interface PaymentDoc extends Document {
    user?: string;
    device?: string;
    totalAmount?: string;
};

// Payment model properties that has in Model
interface PaymentModel extends Model<PaymentDoc> {
    build(attrs: PaymentAttrs): PaymentDoc;
};

// Payment app MongoDB schema for database fields
const PaymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        device: {
            type: Schema.Types.ObjectId,
            ref: "Station"
        },
        totalAmount: {
            type: Schema.Types.ObjectId,
            ref: "Device"
        }
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
// const buildUser = (attrs: PaymentSchema) => {
//     return new Payment(attrs);
// }

// Better way to approch
PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs);
}

const Payment = model<PaymentDoc, PaymentModel>("Payment", PaymentSchema);


export { Payment }