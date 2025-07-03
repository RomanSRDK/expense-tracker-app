import * as Yup from "yup";

export const validationTransactionSchema = Yup.object({
  type: Yup.string().required("Transaction type is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  category: Yup.string().required("Category is required"),
  sum: Yup.number()
    .typeError("Sum must be a number")
    .min(1, "Too short")
    .max(1000000, "Too long")
    .required("Sum is required"),
  comment: Yup.string()
    .min(3, "Too short")
    .max(48, "Too long")
    .required("Comment is required"),
});
