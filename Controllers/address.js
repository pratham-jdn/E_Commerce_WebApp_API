import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;
  let userId = req.user;
  let userAddress = await Address.create({
    userId,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });
  res.json({ message: "Address added", userAddress,success:true });
};


export const getAddress = async (req,res)=>{
    let address = await Address.find({userId:req.user}).sort({createdAt:-1})
    console.log("user address found ",address)
    res.json({message:'address', userAddress:address[0]})
}