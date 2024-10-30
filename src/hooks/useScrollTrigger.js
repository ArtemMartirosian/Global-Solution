import { useState, useEffect } from 'react';

const useScrollTrigger = (ref, threshold = 100) => {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const bounding = ref.current.getBoundingClientRect();
        setTrigger(bounding.top <= threshold && bounding.bottom >= threshold);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, threshold]);

  return trigger;
}

export default useScrollTrigger;
