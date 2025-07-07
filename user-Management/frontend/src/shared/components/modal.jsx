import Button from "./button";

const Modal = ({ heading, onCancel, children }) => {
  return (
    <section className="absolute top-0 w-screen h-screen flex items-center justify-center bg-[#000000b5] ">
      <div className="w-96 mx-auto bg-cyan-950 p-4 rounded-xl ">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-cyan-500 mb-2 ">{heading}</h3>
          <Button onClick={onCancel}>x</Button>
        </div>
        {children}
      </div>
    </section>
  );
};
export default Modal;
