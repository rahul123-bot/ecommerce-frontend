import API from "../../api/axios";
 export const getCartApi =
 ()=>API.get("/cart");
 
 export const addToCartApi =
 (productId)=>
    API.post("/cart/add",
        {productId}
    );
 export const removeFromCartApi=
 (productId)=>
    API.delete(`/cart/${productId}`);
