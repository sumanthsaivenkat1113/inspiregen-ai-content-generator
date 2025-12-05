import '../../../../style/BlogOneTemplate.css'
export default function BlogIntro({introductionText}){
    return(
        <>
         <div className="wrapper">
            <div className='introduction-text'>{introductionText}</div>
         </div>
        </>
    );
}