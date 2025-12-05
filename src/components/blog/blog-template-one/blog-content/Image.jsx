export default function Image({imageUrl}){
    return (
        <div className="image">
            <img src={imageUrl} alt="" />
        </div>
    );
}