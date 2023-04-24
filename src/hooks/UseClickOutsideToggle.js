import { useState, useEffect, } from 'react';

const useClickOutsideToggle = (ref) => {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (
          event.target.tagName.toLowerCase() === "a" ||
          event.target.closest("a") !== null
        ) {
          setExpanded(false);
        } else if (
          event.target.classList.contains("navbar-toggler") ||
          event.target.closest(".navbar-toggler") !== null
        ) {
          setExpanded((prevState) => !prevState);
        } else {
          setExpanded(false);
        }
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded };
};

export default useClickOutsideToggle;