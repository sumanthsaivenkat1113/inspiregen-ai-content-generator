// Movie templates
import MoviePosterTemplateOne from "../Movie-Posters/Movie-Poster-Template-one/MoviePosterTemplateOne";
import MoviePosterTemplateTwo from "../Movie-Posters/Movie-Poster-Template-Two/MoviePosterTemplateTwo";
import MoviePosterTemplateThree from "../Movie-Posters/Movie-Poster-Template-Three/MoviePosterTemplateThree";
// Event templates (you already have these)
import EventPosterTemplateOne from "../Event-Posters/Event-Poster-Template-One/EventPosterTemplateOne";
import EventPosterTemplateTwo from "../Event-Posters/Event-Poster-Template-Two/EventPosterTemplateTwo";
import EventPosterTemplateThree from "../Event-Posters/Event-Poster-Template-Three/EventPosterTemplateThree";
// Information templates
import InformationPosterTemplateOne from "../Information-Posters/Information-Poster-Template-One/InformationPosterTemplateOne";
import InformationPosterTemplateTwo from "../Information-Posters/Information-Poster-Template-Two/InformationPosterTemplateTwo";
import InformationPosterTemplateThree from "../Information-Posters/Information-Poster-Template-Three/InformationPosterTemplateThree";
// Advertisement templates
import AdvertisementPosterTemplateOne from "../Advertisement-Posters/Advertisement-Poster-Template-One/AdvertisementPosterTemplateOne";
import AdvertisementPosterTemplateTwo from "../Advertisement-Posters/Advertisement-Poster-Template-Two/AdvertisementPosterTemplateTwo";
import AdvertisementPosterTemplateThree from "../Advertisement-Posters/Advertisement-Poster-Template-Three/AdvertisementPosterTemplateThree";

export default function PosterCanvas({ selectedTemplate, data, setActiveElement, posterCategory, isPreview = false }) {
  const CATEGORY_TEMPLATES = {
    movie: {
      template1: MoviePosterTemplateOne,
      template2: MoviePosterTemplateTwo,
      template3: MoviePosterTemplateThree,
    },
    event: {
      template1: EventPosterTemplateOne,
      template2: EventPosterTemplateTwo,
      template3: EventPosterTemplateThree,
    },
    information: {
      template1: InformationPosterTemplateOne,
      template2: InformationPosterTemplateTwo,
      template3: InformationPosterTemplateThree,
    },
    advertisement: {
      template1: AdvertisementPosterTemplateOne,
      template2: AdvertisementPosterTemplateTwo,
      template3: AdvertisementPosterTemplateThree,
    }
  };

  const Template = CATEGORY_TEMPLATES[posterCategory]?.[selectedTemplate];

  if (!Template) {
    return <div style={{ padding: 20 }}>⚠ No template found for category "{posterCategory}".</div>;
  }

  return (
    <div className="preview-area" id="poster-canvas-wrapper">
      <Template
        {...data}
        onSelect={setActiveElement}
        styles={data.styles}
      />
    </div>
  );
}



















