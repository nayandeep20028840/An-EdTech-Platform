import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) { // Custom hook to handle clicks/touches outside a given element
  useEffect(() => {
    const listener = (event) => { // Event listener that closes the modal when a click/touch event is detected outside the ref element
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => { // Cleanup function that removes the event listeners when the component is unmounted
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Only run this effect when the ref or handler function changes
}
