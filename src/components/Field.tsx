"use client";
export default function Field(props: { formCallback: any, questionCount: number, name: string, type: string, description: string, className: string, index: number }) {
    const scrollEvent = (e: any) => {
        if (e.deltaY) {
            const next = document.getElementById(`section-${props.index + (e.deltaY / Math.abs(e.deltaY))}`)
            if (next) {
                const input = next.querySelectorAll("input, textarea")[0] as HTMLInputElement | HTMLTextAreaElement;
                input?.focus();
                next.scrollIntoView({ behavior: "smooth" });
            }
        }
    }

    return (
        <div className={props.className} id={`section-${props.index}`} onWheel={scrollEvent}>
            <div className="flex flex-col">
                <label htmlFor={props.name} className="text-4xl mb-4 font-semibold text-white ">{props.name.charAt(0).toUpperCase() + props.name.slice(1, props.name.length)}</label>
                {props.type == "input" ? <input id={props.name} type={props.type} className="rounded-md border bg-violet-950 p-2 w-80 text-lg" placeholder={props.description} /> : ""}
                {props.type == "textarea" ? <textarea id={props.name} className="rounded-md border bg-violet-950 p-2 w-80 h-52 text-lg" placeholder={props.description} /> : ""}

            </div>
            {(props.questionCount - 1 == props.index)
                ?
                <button className="btn btn-secondary font-bold text-2xl mt-32 p-10 rounded-full" onClick={props.formCallback}>Send</button>
                :
                <div className="flex flex-row justify-between items-center mt-10">
                    {/* <a href={`#section-${props.index - 1}`} className="btn btn-outline-secondary">Back</a>
                    <a href={`#section-${props.index + 1}`} className="btn btn-secondary font-bold ml-5">Next</a> */}
                    <button onClick={() => scrollEvent({deltaY: -1})} className="btn btn-outline-secondary">Back</button>
                    <button onClick={() => scrollEvent({deltaY: 1})} className="btn btn-secondary font-bold ml-5">Next</button>
                </div>}
        </div>
    );
}