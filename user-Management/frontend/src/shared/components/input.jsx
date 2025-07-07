const Input = ({ label, errorMsg, ...props }) => {
  return (
    <>
      <p className="flex flex-col gap-1 my-2 ">
        <label className="text-base font-bold text-cyan-600 ">{label}</label>
        <input
          {...props}
          className="p-1 bg-stone-200 text-stone-600 focus:outline-none"
        />
      </p>
      {errorMsg && <p className="text-sm text-red-500 pb-1">{errorMsg}</p>}
    </>
  );
};
export default Input;
