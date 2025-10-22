import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function AlwaysScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}

export function scrollToTop() {
    window.scrollTo(0, 0);
}
