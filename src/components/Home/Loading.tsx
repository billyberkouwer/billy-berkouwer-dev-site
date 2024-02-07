import './home-page.scss';

export default function LoadingIcon({isSceneVisible}: {isSceneVisible: boolean}) {
    return (
        <div className={`container__loading ${!isSceneVisible ? "visible" : "hidden"}`}>
            <div className="loading-element" />
            <div className="loading-element" />
            <div className="loading-element" />
            <div className="loading-element" />
            <div className="loading-element" />
        </div>
    )
}