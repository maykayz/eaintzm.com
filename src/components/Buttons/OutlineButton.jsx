const OutlineButton = ({ children, ...props }) => (
    <button className="flex items-center btn btn-outline-primary text-secondary font-saunde border border-secondary px-8 py-2 rounded-full
        hover:bg-maroon hover:text-secondary hover:border-maroon transition-colors duration-300
    " {...props}>
        {children}
    </button>
)

export default OutlineButton