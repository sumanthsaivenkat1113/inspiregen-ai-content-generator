export const slideActions = (data, setData) => ({
  addSlide(at) {
    const newSlide = {
      heading: "New Slide",
      bullets: [],
      image: "",
      highlight: "",
      layout: "default"
    };

    setData(prev => {
      const slides = [...prev.slides];
      slides.splice(at + 1, 0, newSlide);
      return { ...prev, slides };
    });
  },

  removeSlide(index) {
    setData(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index)
    }));
  },

  moveSlide(index, dir) {
    setData(prev => {
      const slides = [...prev.slides];
      const to = index + dir;
      if (to < 0 || to >= slides.length) return prev;

      [slides[index], slides[to]] = [slides[to], slides[index]];
      return { ...prev, slides };
    });
  }
});
