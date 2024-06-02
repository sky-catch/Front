const Loading = () => {
  return (
    <div className=" w-dvw h-dvh flex items-center justify-center bg-white z-[999] absolute">
      <div className=" bg-loadingIcon size-[130px] animate-spin bg-center bg-cover"></div>
    </div>
  );
};

export default Loading;
