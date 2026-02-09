import React from "react";
export default function Form({ props }: {
    props: any;
}): import("react/jsx-runtime").JSX.Element;
export declare const useForm: typeof import("antd/es/form/Form").useForm, useFormInstance: typeof import("antd/es/form/hooks/useFormInstance").default, useWatch: typeof import("@rc-component/form/es/hooks/useWatch").default, Item: (<Values = any>(props: import("antd").FormItemProps<Values>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & {
    useStatus: () => {
        status?: "" | "error" | "success" | "warning" | "validating";
        errors: React.ReactNode[];
        warnings: React.ReactNode[];
    };
}, List: React.FC<import("antd/es/form").FormListProps>, ErrorList: React.FC<import("antd/es/form").ErrorListProps>, Provider: React.FC<import("antd/es/form/context").FormProviderProps>;
