const ScrollUseEffect = (ScrollRef, handleScrollInfinite) => {
  if (ScrollRef.current) {
    ScrollRef.current.addEventListener("scroll", handleScrollInfinite);
  }
  return () => {
    if (ScrollRef.current) {
      ScrollRef.current.removeEventListener("scroll", handleScrollInfinite);
    }
  };
};

export default ScrollUseEffect;
