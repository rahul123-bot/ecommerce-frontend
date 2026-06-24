import API from "../../api/axios";

export const createOrderApi =
(amount)=>API.post("/payment/create-order",{ amount });