export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `items-center rounded-full border text-center border-transparent bg-chaeyoung/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-chaeyoung focus:outline-none focus:ring-2 focus:ring-chaeyoung focus:ring-offset-2 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
