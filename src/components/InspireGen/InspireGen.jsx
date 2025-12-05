import About from "../About/About";
import AiGeneratorInput from "../AI-GENERATOR-INPUT";
import HeroSectionVideoContent from "../hero-sec-video-content";
import HeroSectionVideoContentBlogt from "../HeroSection-Video-Content-Blog/HeroSectionVideoContentBlog";
import HeroSectionVideoContentPoster from "../HeroSection-Video-Content-Poster/HeroSectionVideoContentPoster";
import HeroSectionVideoContentPresentation from "../HeroSection-Video-Content-Presentation/HeroSectionVideoContentPresentation";
import Navbar from "../navbar";
import Note from "../Note/Note";
import SamplePrompts from "../Sample-Prompts/SamplePrompts";

export default function InspireGen({onGenerate}){
    return (
        <>
         <Navbar/>
         <AiGeneratorInput onGenerate={onGenerate}/>
         <HeroSectionVideoContent/>
         <HeroSectionVideoContentBlogt/>
         <HeroSectionVideoContentPoster/>
         <HeroSectionVideoContentPresentation/>
         <SamplePrompts/>
         <Note/>
         <About/>
        </>
    );
}