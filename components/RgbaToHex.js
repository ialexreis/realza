import * as React from 'react';

export const rgbaToHex = (rgba) => {
    let a, isPercent,
        rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        hex = rgb ?
            (rgb[1] | 1 << 8).toString(16).slice(1) +
            (rgb[2] | 1 << 8).toString(16).slice(1) +
            (rgb[3] | 1 << 8).toString(16).slice(1) : rgba;

    return hex;
}

export const hexToName = (hex) => {
    return fetch(`http://thecolorapi.com/id?hex=${hex}`)
        .then( (response) => response.json() )
        .then( (json) => { return json.name })
        .catch( (error) => console.log(error));
}

