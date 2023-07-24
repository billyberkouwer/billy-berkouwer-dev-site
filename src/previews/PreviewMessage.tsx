import "./preview.scss";

export default function PreviewMessage() {
    return (
        <div className="preview__container">
            <h5>You are viewing this page in Draft Mode</h5>
            <button><a href="/api/disablePreview">Disable Draft Mode</a></button>
        </div>
    )
}