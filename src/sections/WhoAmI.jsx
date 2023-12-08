const WhoAmI = () => {
  return (
    <section className="hero h-screen container mx-auto">
      <div className="grid grid-cols-4">
        <div className="col-span-1 col-start-2">
          <div className="flex flex-col items-start gap-2">
            <h5 className="text-white font-saunde text-xl">Since</h5>
            <h5 className="text-white font-saunde text-5xl">20<span className="text-secondary">17</span></h5>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1620122303020-87ec826cf70d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="flower" className="rounded-[20px]" />
          </div>
        </div>
        <div className="col-span-1 col-start-3">
          <h6>Bio</h6>
          <h6>WHO AM I</h6>
          <h6>asdfasd asdfas asdf</h6>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
