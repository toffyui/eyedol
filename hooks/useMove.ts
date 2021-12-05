import smoothscroll from "smoothscroll-polyfill";

const useMove = (id: string) => {
  const move = () => {
    const elm = document.getElementById(id);
    const content_position = elm.getBoundingClientRect();
    const elemtop = content_position.top + window.pageYOffset;
    smoothscroll.polyfill();
    window.scroll({ top: elemtop, behavior: "smooth" });
  };
  return { move };
};

export default useMove;
