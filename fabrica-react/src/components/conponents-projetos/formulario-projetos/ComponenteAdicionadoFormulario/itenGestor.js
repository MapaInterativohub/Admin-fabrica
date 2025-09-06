import React from "react";

function ItenGestor({ name, codigoGestor, onRemoveA}) {
    return (
        < div className="itensAdicionado" id={codigoGestor}>
            <h2>{name}</h2>
            <h2>{codigoGestor}</h2>
            <button type="button" onClick={onRemoveA}><i class="fa-solid fa-xmark"></i></button>
        </div >
    )
}

export default ItenGestor;