import React from "react";
import { ErrorMessage, useField } from "formik";

function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <h4 className="textNameSubTopic" htmlFor={field.name}>
        {label}
      </h4>
      <input
className="inputData"
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default TextField;
