import { sendSuccess } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { listApprovedShops } from "./shops.service.js";

export const approvedShopsHandler = asyncHandler(async (req, res) => {
  const shops = await listApprovedShops();
  return sendSuccess(res, { message: "Approved shops fetched", data: { shops } });
});
