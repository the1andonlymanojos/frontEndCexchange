"use client";
import {useRef, useState} from "react";

interface InputProps {
    label: string;
    className?: string;
    placeholder?: string;
    value?: string;
    type?: "text" | "email" | "password" | "number";
    onChange?: (value: string) => void;
    sendOp?: (value: string) => void;
    submit?: (value: string) => void;
}

const InputFLoatingLabel = ({
                   label,
                   placeholder,
                   value,
                   className,
                    sendOp,
    submit,
                   type = "text",
                   onChange,
               }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const [placeHolderShown, setPlaceHolderShown] = useState(true);
    const inputRef = useRef(null)



    return (
        <div className={"relative"+" "+className}>
            <input
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                value={value}
                type={type}
                onChange={(e) => {
                    if (e.target.value){
                        setPlaceHolderShown(false);
                        if (e.target.value.trim()==="") e.target.value="";
                    }
                    else setPlaceHolderShown(true);

                    if (sendOp) {
                        sendOp(e.target.value);
                    }
                }}
                className={`peer w-full px-3 py-2 text-black border border-gray-300 rounded-md outline-none transition-all duration-300 ${
                    isFocused ? "pt-2" : "pt-2"
                }`+" "+className}
            />
            <label
                htmlFor="input1"
                className={`absolute left-3 transition-all duration-300 ${
                    isFocused || !placeHolderShown
                        ? "-top-2 bg-white rounded-md px-1 text-xs text-gray-600"
                        : "top-2 text-gray-400"
                }`}
            >
                {label}
            </label>
        </div>
    );
};
export default InputFLoatingLabel;