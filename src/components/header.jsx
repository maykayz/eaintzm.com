import {OutlineButton} from "./Buttons";

const Header = () => {
  return (
    <header className="absolute top-0 right-0 left-0 py-7 bg-primary z-10">
      <div className="flex flex-row justify-between items-baseline container mx-auto">
        <h1 className="text-secondary font-saunde text-[22px] w-28">Eaint</h1>
        <div className="flex flex-row">
          <ul className="flex flex-row gap-8">
            <li>
              <a href="/" className="text-white font-saunde text-center">
                About
              </a>
            </li>
            <li>
              <a href="/" className="text-white font-saunde text-center">
                Project
              </a>
            </li>
          </ul>
        </div>
        <div className="w-28">
          <OutlineButton>Freelance</OutlineButton>
        </div>
      </div>
    </header>
  );
};
export default Header;
