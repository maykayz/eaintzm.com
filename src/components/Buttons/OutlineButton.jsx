import StarBorder from "../StarBorder";

const OutlineButton = ({ children, className = "", ...props }) => (
    <StarBorder
        as="button"
        color="#C98A93"
        speed="4s"
        thickness={1}
        backgroundColor="var(--color-primary)"
        textColor="var(--color-secondary)"
        borderColor="var(--color-maroon)"
        className={`font-saunde text-sm ${className}`}
        {...props}
    >
        {children}
    </StarBorder>
)

export default OutlineButton
