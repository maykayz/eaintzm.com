import {OutlineButton} from "./Buttons";
import CVPDF from '../assets/files/EaintThazinMyint.pdf';

const Header = () => {

  const handlePDFDownload = () => {
    const link = document.createElement('a');
    link.href = CVPDF; // Path to your PDF file
    link.target = '_blank'; // Open in a new tab
    link.rel = 'noopener noreferrer'; // Security best practice
    link.download = CVPDF;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <header className="absolute top-0 right-0 left-0 py-7 bg-primary z-10">
      <div className="flex flex-row justify-between items-baseline container mx-auto">
        <h1 className="text-secondary font-saunde text-[22px] w-28">MayK</h1>
        <div className="flex flex-row">
          {/* <ul className="flex flex-row gap-8">
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
          </ul> */}
        </div>
        <div className="w-auto">
          <OutlineButton
            onClick={handlePDFDownload}
          >Download CV</OutlineButton>
        </div>
      </div>
    </header>
  );
};
export default Header;
