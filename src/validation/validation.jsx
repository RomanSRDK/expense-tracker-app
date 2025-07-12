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
    .max(48, "Max 48")
    .required("Comment is required"),
});

export const validationCategorySchema = Yup.object({
  text: Yup.string()
    .required("Category is required")
    .min(2, "Too short")
    .max(16, "Max 16"),
  category: Yup.string().required("Type is required"),
});
