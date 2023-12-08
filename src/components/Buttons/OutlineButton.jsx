const OutlineButton = ({ children, ...props }) => (
    <button className="flex items-center btn btn-outline-primary text-white font-saunde border border-white px-8 py-2 rounded-full" {...props}>
        {children}
    </button>
)

export default OutlineButton