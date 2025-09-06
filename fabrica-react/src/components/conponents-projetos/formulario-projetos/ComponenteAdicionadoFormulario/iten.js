import React from "react";

function Iten({ nome, ra, onRemove}) {
    return (
        < div className="itensAdicionado" id={ra}>
            <h2>{nome}</h2>
            <h2>{ra}</h2>
            <button type="button" onClick={onRemove}><i class="fa-solid fa-xmark"></i></button>
        </div >
    )
}

export default Iten;