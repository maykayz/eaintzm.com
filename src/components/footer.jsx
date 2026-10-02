const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="w-full py-10 border-t border-stone-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-12">
                <h1 className="text-secondary font-saunde text-lg">Eaint</h1>
                <div className="flex flex-row gap-6 font-raleway text-sm">
                    <a href="https://www.linkedin.com/in/eaintthazinmyint" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-maroon transition-colors duration-300">
                        LinkedIn
                    </a>
                    <a href="https://github.com/maykayz" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-maroon transition-colors duration-300">
                        GitHub
                    </a>
                    <a href="mailto:eaintzm@gmail.com" className="text-muted hover:text-maroon transition-colors duration-300">
                        Email
                    </a>
                </div>
                <p className="font-raleway text-xs text-muted">&copy; {year} Eaint</p>
            </div>
        </footer>
    )
}

export default Footer;
