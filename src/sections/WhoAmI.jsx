import ProfileLine from "../assets/images/ProfileLine.svg"

const WhoAmI = () => {
  return (
    <section className="hero h-screen container mx-auto">
      <div className="grid md:grid-cols-4 grid-cols-1">
        <div className="col-span-1 col-start-2 relative">
          <div className="absolute flex flex-col items-start gap-2 left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
            <h5 className="text-white font-saunde text-xl">Since</h5>
            <h5 className="text-white font-saunde text-5xl">20<span className="text-secondary">17</span></h5>
          </div>
          <div className="absolute left-0 bottom-0 -translate-x-1/2 -translate-y-[50px]">
            <img src={ProfileLine} alt="Profile Line"/>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1620122303020-87ec826cf70d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="flower" className="rounded-[20px]" />
          </div>
        </div>
        <div className="col-span-2 col-start-3 flex flex-col justify-center items-start ml-16 w-2/3 gap-10">
          <h6 className="text-white font-saunde text-xl">Bio</h6>
          <h6 className="text-secondary font-saunde text-5xl">WHO I AM</h6>
          <h6 className="text-justify text-white font-raleway">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</h6>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
