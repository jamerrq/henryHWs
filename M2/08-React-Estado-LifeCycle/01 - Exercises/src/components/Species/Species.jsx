import React from "react";
import styledSpecies from "./Species.module.css";

export default function Species({ species, handleSpecies, handleAllSpecies }) {
    return (
        <div className={styledSpecies.divContent}>
            <h2>Species</h2>
            <div className={styledSpecies.divButtons}>
                {species.map((s, i) => {
                    return (
                        <button
                            key={i}
                            onClick={handleSpecies}
                            value={s}
                        >
                            {s}
                        </button>
                    )
                })}
                <button
                    onClick={handleAllSpecies}
                >
                    All Animals
                </button>
            </div>
        </div>
    )
}
