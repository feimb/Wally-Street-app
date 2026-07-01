import React from "react";
export const InputText = ({
    type = "text",
    name,
    placeholder,
    setValue,
    isReq = false,
}) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    };
    const basicStylesInput =
        "h-8 w-full px-2 rounded-lg bg-inherit placeholder-transparent  ring-3 ring-neutral-500 focus:outline-none focus:ring-primary-600  focus:border-secondary-600";
    const basicStylesLabel =
        "mx-2 px-1 text-sm left-0 -top-3 absolute text-neutral-50 bg-neutral cursor-text";
    return (
        <div className="relative w-full bg-neutral text-neutral-50 ">
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                name={name}
                className={`peer ${basicStylesInput}`}
                required={isReq}
            />
            <label
                htmlFor={name}
                className={`${basicStylesLabel} font-jetbrains peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm transition-all peer-focus:text-neutral-50`}
            >
                {placeholder}
            </label>
        </div>
    );
};
