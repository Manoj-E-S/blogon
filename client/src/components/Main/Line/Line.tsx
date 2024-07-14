import './Line.css'

type LineProps = {
    className: string
}

export default function Line({ className }: LineProps) {
    return (
        <div className={`line ${className}`}></div>
    )
}