import mongoose from "mongoose";
import Stripe from "../config/Stripe.js";
import CartProductModel from "../models/cartproduct.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";

// Cash on delevery controller
export const cashOnDeliveryOrderController = async (request, response) => {
  const userId = request.userId;

  try {
    const { list_items, addressId, subTotalAmt, totalAmt } = request.body;

    const payload = list_items.map((el) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: el.productId._id,
        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },
        paymentId: "",
        payment_status: "Cash on Delivery",
        delivery_address: addressId,
        subTotalAmt,
        totalAmt,
      };
    });

    const genarateOrder = await OrderModel.insertMany(payload);

    //remove item from cart
    const removeItemFromCart = await CartProductModel.deleteMany({
      userId: userId,
    });

    //    remove shapping address from user
    const updateInUser = await UserModel.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );

    //send response
    response.status(200).json({
      success: true,
      message: "Order placed successfully",
      error: false,
      data: genarateOrder,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }

 
};

//discount function
export const PriceWithDiscount = (price, discount = 1) => {
  const discountPrice = Math.ceil((Number(price) * Number(discount)) / 100);
  const actualPrice = Number(price) - Number(discountPrice);
  return actualPrice;
};

//Online payment Controller
export const OnlinePaymentController = async (request, response) => {
  try {
    
    const userId = request.userId;
    const { list_items, addressId ,subTotalAmt,totalAmt} = request.body;
    const line_items = list_items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productId.name,
          images: Array.isArray(item.productId.image)
  ? item.productId.image
  : Object.values(item.productId.image),

          metadata: {
            productId: item.productId._id,
          },
        },
        unit_amount:
          PriceWithDiscount(
            item.productId.price,
            item.productId.discount
          ) * 100,
      },
      adjustable_quantity : {
        enabled : true,
        minimum : 1
   },
      quantity: item.quantity,
      
    }));

    const user = await UserModel.findById(userId);

    const session = await Stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId,
        addressId,
      },
      line_items,
      success_url: `${process.env.FORNTEND_URL}/success`,
      cancel_url: `${process.env.FORNTEND_URL}/cancel`,
    });

    //remove item from cart
    // const removeItemFromCart = await CartProductModel.deleteMany({
    //   userId: userId,
    // });

    //    remove shapping address from user
    // const updateInUser = await UserModel.updateOne(
    //   { _id: userId },
    //   { shopping_cart: [] }
    // );

    return response.status(200).json({
      success: true,
      message: "Order Place Successfully.",
      sessionId: session.id,
      url: session.url, // 🔥 IMPORTANT
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

// //getOrderProductItems
// const getOrderProductItems = async({
//   lineItems,
//   userId,
//   addressId,
//   paymentId,
//   payment_status,
// })=>{
//   const productList = []

//   if(lineItems?.data?.length){
//       for(const item of lineItems.data){
//           const product = await Stripe.products.retrieve(item.price.product)

//           const paylod = {
//               userId : userId,
//               orderId : `ORD-${new mongoose.Types.ObjectId()}`,
//               productId : product.metadata.productId, 
//               product_details : {
//                   name : product.name,
//                   image : product.images
//               } ,
//               paymentId : paymentId,
//               payment_status : payment_status,
//               delivery_address : addressId,
//               subTotalAmt  : Number(item.amount_total / 100),
//               totalAmt  :  Number(item.amount_total / 100),
//           }

//           productList.push(paylod)
//       }
//   }

//   console.log("finnal product",productList)
// }

// // webhook function 
// // http://localhost:8080/api/order/webhook

// 8080/api/order/webhook
export const StripeWebHook =  async (request,response)=>{
  const event = request.body;
    const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

    console.log("event",event)

    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
      console.log("lineItems",lineItems)
      // const userId = session.metadata.userId
      // const orderProduct = await getOrderProductItems(
      //   {
      //       lineItems : lineItems,
      //       userId : userId,
      //       addressId : session.metadata.addressId,
      //       paymentId  : session.payment_intent,
      //       payment_status : session.payment_status,
      //   })
    
      // const order = await OrderModel.insertMany(orderProduct)

      //   console.log(order)
      //   if(Boolean(order[0])){
      //       const removeCartItems = await  UserModel.findByIdAndUpdate(userId,{
      //           shopping_cart : []
      //       })
      //       const removeCartProductDB = await CartProductModel.deleteMany({ userId : userId})
      //   }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

   // Return a response to acknowledge receipt of the event
  response.json({received: true});
}
//GET 
// export async function getOrderDetailsController(request,response){
//   try {
//       const userId = request.userId // order id

//       const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

//       return response.json({
//           message : "order list",
//           data : orderlist,
//           error : false,
//           success : true
//       })
//   } catch (error) {
//       return response.status(500).json({
//           message : error.message || error,
//           error : true,
//           success : false
//       })
//   }
// }
