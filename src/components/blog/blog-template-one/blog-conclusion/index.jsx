import '../../../../style/BlogOneTemplate.css'
export default function BlogConclusion({conclusionHeading,conclusion}){
    return (
        <div className='wrapper'>
            <div>
                <div className="conclution-heading">{conclusionHeading}</div>
                <div className="conclution-text">{conclusion}</div>
            </div>
        </div>
    );
}