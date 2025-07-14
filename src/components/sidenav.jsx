const SideNav = () => (
  <div className="fixed bottom-[50px] right-[50px] z-20">
    <ul className="flex flex-col gap-5">
      <li>
        <a href="https://www.linkedin.com/in/eaintthazinmyint" target="_blank" rel="noopener noreferrer" className="text-white font-saunde text-center cursor-pointer">
          LinkedIn
        </a>
      </li>
      <li>
        <a href="https://github.com/maykayz" target="_blank" rel="noopener noreferrer" className="text-white font-saunde text-center cursor-pointer">
          GitHub
        </a>
      </li>
      <li>
        <a href="mailto:ms.eaintthazinmyint@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white font-saunde text-center cursor-pointer">
          Email
        </a>
      </li>
    </ul>
  </div>
);

export default SideNav;
