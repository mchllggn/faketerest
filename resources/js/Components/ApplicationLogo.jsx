export default function ApplicationLogo({ props, className = "" }) {
    return (
        <img
            src="/logo/logo.png"
            alt="Faketerest Logo"
            {...props}
            className={`h-12 ${className}`}
        />
    );
}
