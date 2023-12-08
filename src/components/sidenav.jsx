const SideNav = () => (
  <div className="fixed bottom-[50px] right-[50px]">
    <ul className="flex flex-col gap-5">
      <li>
        <a href="/" className="text-white font-saunde text-center">
          LinkedIn
        </a>
      </li>
      <li>
        <a href="/" className="text-white font-saunde text-center">
          GitHub
        </a>
      </li>
      <li>
        <a href="/" className="text-white font-saunde text-center">
          Email
        </a>
      </li>
    </ul>
  </div>
);

export default SideNav;
