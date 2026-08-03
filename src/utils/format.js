export const inr = (n) =>
  typeof n === "string" ? n : "₹" + Number(n).toLocaleString("en-IN");