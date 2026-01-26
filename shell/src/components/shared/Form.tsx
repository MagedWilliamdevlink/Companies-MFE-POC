import React from "react";
import { Form as AntForm } from "antd";

export default function Form({ props }) {
  return <AntForm {...props} />;
}

export const {
  useForm,
  useFormInstance,
  useWatch,
  Item,
  List,
  ErrorList,
  Provider,
} = AntForm;
