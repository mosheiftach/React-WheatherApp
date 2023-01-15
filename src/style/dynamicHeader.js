import "./DynamicHeader.css";



export const DynamicHeader =(props)=> {
    return (<main className="dynamic-header-wrapper">
            <span className="dynamic-header-span"><p className="dynamic-header-p">{props.text}</p></span>
        </main>
    );
}