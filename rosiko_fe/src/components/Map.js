import * as React from "react"
import { ArmiesTheme } from "../js/armiesPalette";
import MatchController from "../js/MatchController";

const Map = (props) => {

  const getTerritory = (id) => {
    let territory = null;
    let territories = props.match.map.territories;
    for(let i=0; i<territories.length; i++){          
      if( id === territories[i].id ){ 
        territory = territories[i]; 
        break;
      }
    }    
    return territory;
  }

  const getColor = (id) => {
    let color = null;
    if((props.match.attacker && props.match.attacker.id === id) 
    || (props.match.defender && props.match.defender.id === id)
    || (props.match.territoryFrom && props.match.territoryFrom.id === id)
    || (props.match.territoryTo && props.match.territoryTo.id === id)){
      color = ArmiesTheme[getTerritory(id).color].light;
    }
    else{
      color = ArmiesTheme[getTerritory(id).color].main;
    }     
    return color;
  }

  const getStroke = (id) => {
    let stroke = null;
    if((props.match.attacker && props.match.attacker.id === id) 
    || (props.match.defender && props.match.defender.id === id)
    || (props.match.territoryFrom && props.match.territoryFrom.id === id)
    || (props.match.territoryTo && props.match.territoryTo.id === id)){
      stroke = ArmiesTheme[getTerritory(id).color].dark;
    }  
    return stroke;
  }

  const getStrokeWidth = (id) => {
    let strokeWidth = null;
    if((props.match.attacker && props.match.attacker.id === id) 
    || (props.match.defender && props.match.defender.id === id)
    || (props.match.territoryFrom && props.match.territoryFrom.id === id)
    || (props.match.territoryTo && props.match.territoryTo.id === id)){
      strokeWidth = 4;
    }  
    return strokeWidth;
  }

  const getArmy = (id) => {
    return MatchController.getArmies(props.match, getTerritory(id), props.placedArmies, props.movedArmies);
  }

  return(
    <svg
      id="Map"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x={0}
      y={0}
      viewBox="0 0 749.8 519.1"
      style={{
        enableBackground: "new 0 0 749.8 519.1",
      }}
      xmlSpace="preserve"
      {...props}
    >
    <style>{".st0{fill:none;stroke:#000000;stroke-dasharray:4,4;opacity:0.6}.border{fill:#e0e0e0;stroke:#fff;stroke-miterlimit:4.3217}.st3{fill:#fff}.st4{font-family:'ArialMT'}.st5{font-size:12px } "}</style>
    <g id="Routes">
      <path
        className="st0"
        d="m385.8 271.2 6.7-18.1M400.8 253.2l35.8 12.6M32.1 77.4H.6M749.8 77.4h-37.7M678.1 176l-32.3 6.1M654.2 342.4l-22.8 13.7M655.6 391.5l9.9-32.3M697.4 366.7l3.6 11.7M347.3 172l-15.3 1.6M320 197.2l-.6-14.3M355.3 128.2l-35.6 26.6M380.8 135.5l6.1 9.4M311 125.9l3.6-9.5M353.3 105l-11 .7M304.6 93.7 291 75.4M236.3 67.4l-40.1 2.9M164 110.3l72.3-42.9M219.9 100.9l16.4-33.5M281.9 319.3h25.7M346.6 257.1l-9-11.1M373 262.4l.8-18.2M655.6 155.1l21.6 8M618.8 394.8l10.1 16.3M622.9 333.8l-1.6-15.9M441.5 442l22-1.5M449.5 389.8l29.4 30.6"
      />
    </g>
    <g
      id="Nations"
      transform="translate(-167.997 -118.555)"
      style={{ opacity:0.8 }}
    >
        <g id="eastern_australia">
          <path
            className="territory, border"
            style={{fill: getColor("eastern_australia"), stroke: getStroke("eastern_australia"), strokeWidth: getStrokeWidth("eastern_australia")}}
            d="M832.1 509.7s.2.5.7-1.6.2-3.2.9-4.8c.7-1.6 1.1-1.4 2.5-2.1s1.8-1.1 2.1-1.8c.4-.7 1.4-.9 2.5-.7 1.1.2 1.6.7 2.5-.5s.7-1.6 1.6-1.2c.9.4.4.4 1.6.7 1.2.4 2.5.9 4.9.4s2.7-1.8 2.8-.4.2 1.6 1.1 1.6c.9 0 .9.2.4 1.2-.5 1.1-.2.4-1.6 2.3-1.4 1.9-2.1 2.1-2.3 3.5s.2 2.3.2 2.3-.7 1.9.5 1.9 1.4-.5 3-.7 3-.4 3.2 1.2c.2 1.6 1.2 4.6 2.3 4.8s1.1.5 2.8.2c1.8-.4 2.5.5 2.7-1.1s.2-1.9.2-3.2c0-1.2-1.8.7.5-2.8s2.8-1.2 2.3-5.1-1.6-3.5-.7-6c.9-2.5.5-2.5 1.1-2.3 0 0 1.6-.2 1.8 2.3s.9 4.6.9 5.7.7 4.9.7 4.9 1.2 1.4 1.9.9 1.8-.7 1.8-1.9.4-2.7.7-1.9c.4.7 1.4 1.2 1.4 2.3s-.2 2.1 0 3.2 1.2 2.1 1.2 2.1.4 2.1.4 2.8.4 1.2 0 3-.4 1.9-.2 3.5.4 2.3 1.1 2.5c.7.2.7.2 1.4.2s.9-.7 1.4.2.7 1.4 1.9 1.6 2.3 0 2.3 0 .5.9.5 1.9c0 1.1-.2 1.4.2 2.8s.4 1.6 1.2 1.8c.9.2 1.4.4 1.4.4s.2.9.2 2.3.4 2.3.4 2.3l1.4 1.1s.4.9 1.1 1.8c.7.9 1.4 1.1 1.4 1.1s.5 1.1.7 1.9c.2.9-.4.4.7 1.6s1.2 1.6 1.2 2.7.9 1.8.5 3.2-.2 1.9-.4 3.7.2-.4-.2 2.7c-.4 3-.2 3.9-.4 4.9-.2 1.1-.5.2-.7 2.1-.2 1.9-.4 3.5-.4 3.5s-1.2 1.8-2.1 1.8-2.5-.7-2.5.2-.9 1.6.4 1.9c1.2.4 1.6-.7 1.6.5s-.4 1.6-1.4 2.5c-1.1.9-1.1.7-2.3 1.4s-.5-.4-1.4 1.9c-.9 2.3-.7 2.3-1.4 3.2s-.9.9-1.2 1.9c-.4 1.1-.4 1.4-.4 2.7 0 1.2-.4 1.8-.4 1.8s-1.4 1.4-1.4 2.7.9 1.8.2 2.7 0 .9-1.6 1.1c-1.6.2-2.3.2-2.3.2l-2.5.5s-.4-1.1-1.2-.5c-.9.5-.5.4-1.2 1.2-.7.9-.9.9-1.8 1.4-.9.5 0 .7-.5 1.6-.5.9-.7 1.8-1.8 1.2-1.1-.5-1.4-.4-1.8-1.4-.4-1.1.2-1.2-1.6-1.8-1.8-.5-1.9-.5-1.9-.5s-.5.4-.9 1.2c-.4.9.2 1.2-1.1 1.8-1.2.5-1.2 1.1-2.5.2l.2-.3s0-5.7.2-7.1c.2-1.4-.4-1.2-1.1-2.3-.7-1.1.9-42.2.7-43.1-.2-.9-29.9.4-29.9.4l-.4-38z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiFJREFUeNq0lttLG0EUxmcmu6ZG TbGijRcEHyzxVbEBoQ/FP9wHQWopIr4oCiqiNaZeMEaTNJf1G/gGxmH2Ju3Ajw3s7PnmnDnzTaRI H9J52iNynokB4t4pEIAiCJ35OnAPdEEfDOPE4kQUg46DT6ACyhSUDKYDN0Ed3IMWRYdZRApgFMyA JfAFVMFnZmSGzuAGHIFjcAYaoA0GSSJGYAGsghpYAYvMJLTm9pjJBTgEu2APXLpCgVMiI/AVfAdr YJZl8+3JJJhyyiko9GJKF1gZhSzRKgVqFCxxATJh74pWLL1Xf8EVn1HBKlOZpdkEGyzRGN/JlA4M WYUSy9hgM3SNiMlCp7wOvoFlihZEtiGZScBM/oBr8KRLpjipSJEqMxjnCvMMxe8WGadiulFZmZTZ pmXPJmfNxhtHORNG3ikgkuKoHDaTV+xNHf/HiJJEon8QvMfz0TPxlMdRvSaXQ6BJT2saIWW9fAS/ 2eOddwjp+c/0siO6c1d4TrM+TBO091LKaXez6PIA/gI74NT4V8FTy4CmN8FWVClCQ353zwy2wT64 5ekXtsiAQsIyvBFLyMyzGdDW67R7ncVPcG67sOtN5qNHElFEcLVthye6rQ6+BX6AE37b990npmR3 rK9O/4GOOgc+eErVYbPoy+qAv1t2+8adcGldYNNgHny07nd7UX2u+opd2fb9oZAprhrG/FMRec6X zOhBMoOFxLrFqwADAEI2pp+fibFdAAAAAElFTkSuQmCC"
            transform="translate(859.996 529.655)"
          />
          <path
            className="territory, st3"
            d="M872.5 551.4c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 866 546.023)"
            className="armies, territory, st4, st5"
          >
            {getArmy("eastern_australia")}
          </text>
        </g>
        <g id="indonesia">
          <path
            className="territory, border"
            style={{fill: getColor("indonesia"), stroke: getStroke("indonesia"), strokeWidth: getStrokeWidth("indonesia")}}
            d="M778.1 511.4c.9 1.4.4 1.6 2.4 1.6s3.3-.4 4.4-.1.6.6 1.9.5 2.4-.9 3.4-1 2.3-.3 3 0 1.9 1.1 3.3 1.3 4.5.1 5 .3 2.1 1.4 2.9.5 1-.6 1.3-2 .3-2.1-.6-2.4-.3-.8-2.4-.9-2.8-.4-3.4-.6-1.6-1.3-2.4-1.5-2.9-1.1-4.3-1.1-4.1-.3-5.5-.3-1.6-.6-3.1.5-2.8 1.6-3.6 2.3-.6.1-1 1.4-.9 1.7-1.3 1.5zm23.4-8.1c.5-1.8.1-1.5.3-3s.5-1.1 1.1-2.1.3-2.6 1.4-.8.8 2.6 2.1 3.8 1.6 2.4 2.8 1.3 3.3-2.3 2-3.6-2 0-2.1-3.3-.3-4.4-1.1-4.3-1.6 1.4-1.8-.4-.6-3.9.8-4 2.8.8 3.6-.9 1.9-2.1.3-2.4-2.9-.5-3.8-.4-1.5.1-1.4-.6-.9-1.5.9-1.5 1.4.4 3 .3 3.3-1 3.8-1.5 1.1-2.8 1.9-3.3 1.3-.9 1.1-1.5-.4-1.1-1.1-1.4-2-.5-2.4 0-1.3 1.9-2.1 2.3-5.1.1-6.1.6-1.9 1.1-2.5 1.5-2 1-1.8 2.5.3 2.8.3 3.4-1.3 2.4-1.5 3 .1 2.5-.3 3.4-.6.4-.6 1.6-.3 1.5.1 2.4 1 .9.6 2.1-1 .5-.5 1.9 1.1.9 1.3 2.1-.3 1.8 0 2.8 1.8.1 1.7 0zm-10.5-6.4s-.3-1.3 1.9-3.4 2.8-2.3 2.8-4.4-.1-2-1.1-3-2.4-1.6-1.1-3.1 1.1-1.9 2.8-2.3 3.3-2.8 3.4-3.6.3-1.4-.1-2.5-1.4-3.1-1.5-4.5-.3-2.4-.1-3.4 1-1 2.1-2.4 1.4-.8 1.4-2.8-.1-4.5-.8-5-.9-.3-2.3-.8-2-1.8-3.9-2.9-3.1-1.3-3.5-.6.4-1.5-.4 1.6-.6 3.9-1.5 4.5-2.3 1-2.6 2.3 1 2.1-1 4.3-5.6 6.1-8.3 6.6-4.5 1.1-4.5 2 1.1 2 .9 3-2 2-1.8 2.5.9 0 1.4 1.1.5 4.6.5 4.6l2.4 2.6s-1.8 2.6-.9 3.4 1.3.9 2.3 2 2.3 2.4 3.8 2.5 2.4.9 3.5 1.4 1.5 0 2.9-.1 3.7.5 3.3.4zm-23.6-17 .7-1.8s.2 1.9.4 3-.4 2.5.2 3.2.2 1.1 0 2.1c-.2 1.1.7 2.8.7 2.8l1.3 1.5 1.4.3s.6.9.9 1.5 1.1 1 1.1 1v2.3c0 .9-1 1.4.1 1.6s2.5.3 3.3.3.5.4 1 1.4 1 1.1 1.1 2.5.1 2.4-.4 3-.1 1.1-.8 1.9-1.6.9-2.4 1-1 .1-1.3 1 1.6 1.8-.8 1.6-2.3.5-2.8-.8.9-1.8-.9-2.4-.3 1.9-2.9-1.6-3.5-1.1-3.9-4.3-1.5-3.9-3-6.3-2.1-4-3.4-4.4-1.8 1.1-2.4-.5-.6-.8-.6-2.6-.1-1.8-1-3.5-1-1.6-1.5-3.5-.3-1-2.5-3.9-2.5-3.1-4.5-4.6-2.5-1.8-2.4-3.8-1.3-4 0-4.4 1.5-.8 2.8 0 1.4 1.6 2.4 1.9 1.6.1 2.4.1.5-1 1.8.5 1.5 1.5 2.1 2.9.6 1.9 1.3 2.6 1.1.8 1.8.4 1.3-1.5 1.6-.8.4 1.1.6 1.6 1-1.1 1 1-.8 3.1.4 2.4 2.3-1.5 2.3-1.5-.1-.4.4.9.6 2.4 1.8 2.9 1.5.5 1.5.5l1.1 1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhpJREFUeNq0lklLA0EQhWcmk7hM cAsmghuIiggevQj+dkHEi9vFQ0BF3HfRqFFjzPhKXktTdsaJ0YaPDpmkXm1dPb6XbvlqlxWr/cc/ Jz0PQAg6QJbfieE3UOMeW6QWMcbFaAQGwBDooWAdVMAluAMvRAQbaUSM8TwogDEwBWZACeQYwQXY BScUk/0KPIP3JBER6AJFMAGmwRxFRh2RXNDwAdgAm+BYC4VKMEuBebAAZsE4I4pUTfqZwmc6MUB7 8vzIFgpVFHlGIAKLTFWexgMVecDURZYDgdVxElFVahSqKApM0SwF+kCmSe18q0EiptNj4SWdr+BU 6hdaXkVMzRz3fIKAq1m6wQib4gYccq+ZFITM6SQpWPlPu+ymGQa9xobJYQeLOMM0RVZ+vRaFsurg fhUzy/YscW81isTzF6jC5/5AwBnevy+7r/XAa2fFWsQImDFRaUPI6ayJRA7OOSizv59c0zSlwDdn TSRyQm85VXfANb1pJRpx6pFOlum0OP95ou0feTwjRbZyzjGzmglUOa/WwCrYN7Mro8Jt0Ggnp0DO EtJnwNyE70pgGWxzpNR1JMYjGdH3JKaIr2rUYL6rzL1cWOtgifsZUxW7RGI+vGONHiha4ee65bnc hnvM/xZYoYC5tBpJ169vDbtBDjsz9Cb52aPIr65f17DrJH1WQ3jtvki4LiZ7tpk7qN7uK1GaF7zU L3cfAgwA1IyzvCmBSZMAAAAASUVORK5CYII="
            transform="translate(773.996 473.655)"
          />
          <path
            className="territory, st3"
            d="M786.8 495.7c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 780.296 490.32)"
            className="armies, territory, st4, st5"
          >
            {getArmy("indonesia")}
          </text>
        </g>
        <g id="new_guinea">
          <path
            className="territory, border"
            style={{fill: getColor("new_guinea"), stroke: getStroke("new_guinea"), strokeWidth: getStrokeWidth("new_guinea")}}
            d="M832.8 455.5s.5-2.8 1.5-3.5.3-1 .3-2.3-1-2.5.3-2.8 1.5 0 3.3-.3 3.5-1.3 3.5-1.3l1.5 1.5s.8.8 3 .8 3 1 4 2.8.5 2.5 3.3 4.3 5.5 2.5 7 3 2.8 1.3 2.5 2.8 1.5 2.3-.5 2.8c0 0 5.7 2.5 6.4 4.1s1.9 2.3.5 3.2c-1.4.9-3 .2-2.8 1.2.2 1.1 1.2 1.8 1.6 3 .4 1.2 1.6 1.9 1.6 3.4s-.4 2.3 1.1 3.2c1.4.9 1.6.9 1.6 1.9v2.5s-1.1 1.1-2.8 1.1c-1.8 0-2.7-1.4-3.4-1.4s-2.5-.4-2.5-.4-1.2-4.9-4.8-5.8-3.5-1.4-3.5-.7 1.2 2.3-.2 2.8-2.1.5-3 .5 3 1.6-1.4 1.4-4.8-1.8-6.7-.5c-1.9 1.2-7.8-3.7-7.8-3.7s-2.7.2-2.7-1.2-.7-1.6.2-2.8c.9-1.2.9-1.4.9-2.8s.4-1.8.4-3.2.9-1.9-.4-2.5c-1.2-.5-2.3-.9-2.5-2.1s-.2-1.4-1.1-1.4c-.9 0 0 .2-1.4.2s-2.5 1.1-3.7-.5-1.4-1.6-3.7-1.6-7.2 3.4-3.4 0 4.6-3.5 4.6-3.5-4.1 0-4.2-1.4c-.2-1.4-.5-3.7-1.4-4.1s-1.9-.9-1.6-2.1c.4-1.2 1.1-5.7 4.6-5.5s4.2 1.6 5.3 2.1 3-1.4 3.4.4 0 4.8 0 4.8 1.2.9 1.6 2.7l1.5.9z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkNJREFUeNqklk1P20AQhm0TO0AC jaiaEAHtBapypaKH3qr+7x4qcQJxRC0CIUFaBRCIBgiqCXZnpWeq0RKMYyy9Wjux99n52JkNg/JX aMac+3zSj4v+V8WiRDQlehClontgz4KLQBGTT6OW6I1oVjQUnYv+AHP6y5hNAnKrnmHiJVGbcVX0 CsCh6FR0K7oS/QJ+h8XPghSyLNoQfRS9A9oxFp0BdKCeaBf1xsFqT0BWRJuiL8Da/F43MeriqhTo a+Zziz/xYTUvJmqJg3xlXOb3yCRGDWhOTJokSmSSooflmVqgLkxYpUI+YVmD90IvxVWaNLMAY6y5 HAdy47xoHchn0VsgUcltUsPyaUC/RRe49r873EsLovfAuqwwmmBDq+vbuLuFdWFgJnL+XhR9wJLm hBALS/BEg/vQWhTjug5jXKJqFLlwHsvmNBMj84KWmKoQvRJSfYUxCSq6p9Jl8/7eK5RVr5RsO/Gz TiEDatfgBTD3zYg5XLW45jlXi1zl7Yt+iI6pX1kFUIYFtyjVBUdmFW4nH6CLClZlbNQzys+VnWPK ezEg/7tkTN0rPUWQIYAd0ZZoD9iDD9JOGVMlWqZah08Acw+yLfoGrE9IHlkUQB/xcc6zFs7IgHIT j4EH2TY9KbP9x19hSkM7RzaoI+7vyCgXj59M/h1Lxja+sOCs0CROrvatUQc7uFMz9ZRM3RcdAS7d ygOvzzSI2SI1TJul7pc+GXtT5XDiA7Wjxl6c9PRj41rpXDfu8OjHtNRB8p8AAwDvO7rqQfbpLAAA AABJRU5ErkJggg=="
            transform="translate(835.996 452.655)"
          />
          <path
            className="territory, st3"
            d="M848.9 474.9c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 842.36 469.485)"
            className="armies, territory, st4, st5"
          >
            {getArmy("new_guinea")}
          </text>
        </g>
        <g id="alaska">
          <path
            className="territory, border"
            style={{fill: getColor("alaska"), stroke: getStroke("alaska"), strokeWidth: getStrokeWidth("alaska")}}
            d="M254.5 242.3c-.6-1.3-.5.1-.9-2s-1.1-1.9-1.8-2.5-1.5-.8-1.1-1.9.6-1.1.3-2.3-2-1.8-2.5-2.9-.5-.3-.5-2 .5-2-1-2.5-2.5.8-3.3-.9-.6-.8-2.1-1-2.1-.1-2.6-1.1-.8-1.9-1.8-1.9-2.3-.4-2.5-1-1.6-2.4-2.5-2.4-.6.6-2 1.3 2.5 1.3-.5 2-4.4 1-5 .5-2.9 1.1-2.5-.8.5-1.6 1.1-2.1 2.4-.6 1.6-1.1-.4-1.4-3-.8-3.4.9-4.3 1.5-.9 1.9-1.3 2.6 1.1.5-1.8 1.8-1.4-.6-4.4 2-2 2.9-4.3 3.3-.9 0-2.6 1.9-1.5 2.8-3.3 2.8-1.1 3.1-2.8 1-2.8-1.3-1.5-2.3 1.5-.8 2.5-1 .5.4 1.6-1.3.9-2.3 2.6-2.4 1.5 1.5 2.3-.9 0-2.3 1.4-3.5 2.9-2.5 1.1-2.6-1.9-.5-3.5.3-1.8 1.1-3.3.9-1.9-.4-1.9-1-.6-2.6-.6-2.6 1.3-.6-.9-1.1-2.3 1.1-2.1-.5 1.1-1.4.3-2.1-1.1-1.3-2.3-.8-2.4 1.8-1.6-.1 2.3-2.6 2.8-3.4 1.3-2.9 1.5-4-1-.5.5-1.6.9-1.4 2.8-1.3 1.4 0 2.6.6 1.6 1 2.4.6 1.5-1.3 2-1.9 1.1-1 1.3-1.8.8-1.5-.6-1-.9.5-2.8.9-1.6 1.8-2.4.1-.9-2.4-.9-2.4-.8 0-.6-1.8-1.1-4.6 2.3-5.5 5.5-.1 5.6.4-1 1 .5 1.1 1.6.5 2.5-.8 1.9-1.1.9-1.6-1.9-.4-2.4-1.4 0-1.3-.5-2.6-.5-1.6-1.3-2.6-2.8-2.5-.3-3.1 5.1-1.3 4.6-.9c0 0 2.8-3.2 4.6-2.8s3.9 0 5.7-1.4 4.6-.7 4.6-.7l2.1 1.8s2.8 2.8 4.6 1.8c1.8-1.1 1.8 1.8 4.9 2.1 3.2.4 4.6 1.1 7.8 2.1 0 0 .9-.4.7.9-.2 1.2-1.9 30.6-1.4 30.9l.2.2 7.5.9s.1.1.6 1.6.9 2.5 2 4.5.1 8 .1 8l2 2.8s1.6.8 2.3.9.4 3.3.3 4.5-1.6.6-2.5.9-1.1 2.4-1.3 3.6-2 .9-2 .9z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfBJREFUeNq0lttLAkEUxttxt80S o5slXaAXsVeDfO5vL4Ioeoigy0ugEirYg5SRumvfxDdwmPaqNPBjoGbPN2fOnG90ltKHY81yzKw5 MUDc/xRwgQ88a70OPAHfYArCOLE4EcWgJbAJ9kCZgg6D6cBD0AXv4IOiYRaRAiiCCjgGNVAHu8zI DJ1BDzyBF/AK+uALBEkiRuAANEATnIAjZuKJtRNm0gKP4BrcgY4t5FpHZATOwDk4BVUeW1RNNsBW xHG2pZArMvJ4RA0KNCm4yg04CbXzGUuJDeiMRrpGrlhcYg2azEALrIkP4y5OgesO+beQl0LX7A2M TXoub1GNNaiKDLIMxfV6Y2MwYK30PDZBfJ5rnUUu5RCwa6qPfB+smzoqUY8yr2k5osh5hDy7eZVV +OUFBGJbQ+WwmbmHijG8fxExZjfmvKjYzBaZCYvocZ5XKHKzSphdl2bXoqOGcwr82WzBWuTRi7bZ xXluWsjAz+AS3PMJCKRIQBw2VZld7KYIzSgwol/dgCta/6932Znos/xkmj47v0h/MmskIb8ZUuAW XIAHWsrUtvqQ9twROzdBKtZbkvam9GXhXeujgEJt8cQO6EUrESJJr2OY1uHmhdwRZudGPFqZ3nkn r9nFXNvEXyxORqNzMnR3bPP+CDAATa6iryPM6TsAAAAASUVORK5CYII="
            transform="translate(212.996 187.655)"
          />
          <path
            className="territory, st3"
            d="M225.7 209.5c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 219.195 204.116)"
            className="armies, territory, st4, st5"
          >
            {getArmy("alaska")}
          </text>
        </g>
        <g id="ontario">
          <path
            className="territory, border"
            style={{fill: getColor("ontario"), stroke: getStroke("ontario"), strokeWidth: getStrokeWidth("ontario")}}
            d="M333 219.6c-.7 2.5-1.1 9.2-1.1 9.2l1.8 1.4s1.4 2.5 3.2 4.2c1.8 1.8 2.8 5.3 5.7 4.6 2.8-.7 3.9 2.5 3.9 2.5l2.1-1.4s2.1-1.2 2.5-.5 2.5 1.4 2.5 1.4 2.1-1.2 4.1-1.4.4 1.6.4 1.6l-4.1 1.9s.9 2.7 1.9 2.3c1.1-.4 1.6 4.1.4 4.9-1.2.9.4 2.7.4 2.7l.7 2.5 1.9 1.4.5 2.3h-.2c-.7 1.9-1.1 18.9-1.1 18.9s1.1-1.4 1.8-1.6c.7-.2 1.8 1.4 2.5 1.6s.4-1.4 1.1-2.1.9 0 1.6.5.5 0 1.6-.2 1.1 2.8 1.1 3.7-1.8 1.4-1.8 1.4-2.5.9-3.5.7c-1.1-.2-2.3 1.4-3 2.3s-2.1.4-3 .7-.4 1.2-.2 2.5c.2 1.2-3.9 4.4-4.8 3.5s-2.3-2.3-3.9-3.2c-1.6-.9.4-2.7 1.1-3.9.7-1.2.2-4.1-.9-6.9s-1.2-3.9-1.8-4.6c-.5-.7-1.8-2.7-2.3-4.9s-2.8 1.6-5.3.9-5.8 1.1-5.8 1.1.4-4.9-.4-5.3c-.7-.4-19.8.4-19.8.4v-2.8c0-2.3 3.9-45.4 3.9-45.4l18.3.5-2 2.6z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAglJREFUeNq0lt1LAkEUxXfWVTNl oQ/KIIQeCns1Sgh6iP7yXuqpegospCiMtC9CLVtd3c7AGRmHdd2VGvgx4M7eM/fe2TMKa/YQxqxG YMwzA0x7ZgMHZEFaWy8DD0Cfc6ARW8Rm0AJYBkXgUlAOH7TBC/gEP0QKjuKIpEAOrIEtsAPKYJ0Z yeGBFqiDJ4rJ+RX0wDBKRAlsggqogl1QYiZprhswkxYDP4ALcAkappBjlEgJHIBjsAc2WDazJ0ss owy4zbKqeFLoW5XO0TJKs0QVClQpuMgNiJC+ZUCepLV+9Vk+OQcprUwuS3MCDlmiPJ+JKYdGaIck xw0N2KMP9i5IaVnI1PfBEdN3KWDF/JYc4rNPz6AjS2ZzUZYiZWZQ4A6TDJvvlRinqE6jrWXi8pi6 RpOtBNmExrGNBZk5BayoOHYCm0kqNlHH/xhBlEjwB8FN4xyLhD6cU0DZTVvFsqMeJhSRFvIFHkEN NPkxjjPx+GONi7phlh0ji3c6c51fvK/bilooj90KWKWlOJp9RAkMWQG5yVNwBd4oMmEbQyIDLtCH HMO7AoMR+9hmBaTdn4N73YXNTPqsa4/p+4az9gw6NMMbCpyBa5bND7tPRnyxwYAtpm/eivrwtHW3 4I6iEwdHJLzfhZG5uuubbHQ37J4Xc/xTCTtVHgVHYUdfxPQgEcNCpn5XvwIMAOVGr88Eg5wSAAAA AElFTkSuQmCC"
            transform="translate(326.997 239.655)"
          />
          <path
            className="territory, st3"
            d="M339.4 261.6c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 332.92 256.238)"
            className="armies, territory, st4, st5"
          >
            {getArmy("ontario")}
          </text>
        </g>
        <g id="northwest_territory">
          <path
            className="territory, border"
            style={{fill: getColor("northwest_territory"), stroke: getStroke("northwest_territory"), strokeWidth: getStrokeWidth("northwest_territory")}}
            d="M334.8 217.1c.7-2.5 8.8-10.2 8.8-10.2s3.2-.4 4.6-1.4c1.4-1.1-1.8-4.2-1.8-4.2l.7-2.1 2.1 1.8s.7 1.4 2.8 1.4c2.1 0 1.4-2.1 2.8-2.5s2.8-3.9 2.8-3.9 2.8 1.1 5.7-1.8.7-1.4 0-2.8.7-2.5.7-2.5l-2.1-.7s1.4-1.1 0-3.2-1.8 1.1-3.2 2.1c-1.4 1.1-1.1 2.1-4.9 1.4-3.9-.7 0-2.1-.4-3.5s-4.2.7-4.9-1.4c-.7-2.1-1.8 1.1-1.4-1.1.4-2.1-.4-5.3-1.8-6s2.8-7.4 2.8-7.4 2.8 1.4 3.2-1.1c.4-2.5 1.8-2.1 1.8-3.5s-3.5-.4-3.5-.4l-.6 2.9s-4.2-3.2-4.2 0-1.4 3.2-3.5 7.4-.4 6.7-.4 6.7 2.1.7 1.4 2.8-4.9 1.8-4.9 1.8l-.4-3.9h-2.8s-.4 3.9 0 5.3-7.8.4-9.9-1.4c-2.1-1.8-4.6 1.4-6.7 2.5s-3.9.4-6-.4c-2.1-.7-1.1 2.8-5.7 2.5-4.6-.4-2.1-6.4-3.2-4.2-1.1 2.1-5.7-1.8-8.1-3.9s-7.1-1.4-7.1-1.4l-.4-2.5h-2.5l-3.2.7s-2.5 1.1-4.6.7c-2.1-.4-1.8 1.8-1.8 1.8s-2.5 1.1-5.7.7-2.8 1.1-4.2 2.1c-1.4 1.1-6.4-1.4-9.5-2.8-3.2-1.4-5.3 1.5-8.4.5 0 0-1.7 31.3-1.4 32.1s82.6 3 86.8 2.9 2.2.1 2.2.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjBJREFUeNq0lt1LAkEUxffLLBQp JbMog6iooIceegmivz2CXqyefCgKoigqpSitTFO3c+MMDLdtXZMGfgy6s3PuPTNzZ10nWXNVLy1U /cCX4557IABpkOJ/MvEn6LAPLRKLmMll0gzIgxLIUbALGqAGnsEHEcF+EhEzeRYUQBmsgDUwA8aY wQO4ALcUk74OWqAXJyICE6AIlsAq2KTIQkQmD5z4ChyDE3CjhQIlmKLANtgBG2CRGWXUmkzRwhaD yFvzidC7sS5QWWSZgQjs0qosJ/dU5h6ty1gBOMyyQ/ukDwOVRYEWbVBgEvi/rJ1rbRARmVc2vnBT 9Hy+4NPvdbAHtsC0ZU+SoxBY6yXrdAeaYplnDRBPl0lhCAFtd5k7scSz9f3A4Y8SH5aZvucM14zl OW71nAnUi3voDN/MXGP2HF7cwxGaq3389+ZZlVQXvFFaqEWMgNnfjRGEIoM1mbTBPTgF1+Atqpom FPgRrMlEDtATq6rw+IdsJKhXBnnKoNvmpNuDHJ6RWR7ItFU+4jLosyBKYayAQ3BpiqSvBofcwnnW rXRE7XLV5B1aIwJH4ABU6UZXZ+LwDujy5dC6E/pqjfq0s2mtZYUCJ6xbbWO3H5F6hxW0Tl5IkwH0 aIPchmeMfp8WVSnQsoMadP3muT5SkedYPIscV2MG51zsRy78j3t+0IeEVOdxMkmBHMc0aNUTt/yn ZfPQn0Suqm2BdQO21Rr+6bsr7gMv8cfdlwADALiztxxagSTDAAAAAElFTkSuQmCC"
            transform="translate(278.997 186.655)"
          />
          <path
            className="territory, st3"
            d="M291.7 208.7c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 285.22 203.314)"
            className="armies, territory, st4, st5"
          >
            {getArmy("northwest_territory")}
          </text>
        </g>
        <g id="venezuela">
          <path
            className="territory, border"
            style={{fill: getColor("venezuela"), stroke: getStroke("venezuela"), strokeWidth: getStrokeWidth("venezuela")}}
            d="M317.4 414.9c1.9-1.3 1.5-3.8 1.5-4.5v-3.1c0-1-.1-1.8 1-3s1.8-2.4 1.8-2.4l1.3-1.1v-2l.8-2.3s.5-1.1.6-1.6-.3-2.5-.3-2.5l.3-1.6 3.1-.9s.4.4 1.4 0 2-1.3 2-1.3l2.3-1.3s1.5-1 2-1.5 2.3-1.1 2.3-1.1.9-.3 1.5-.3 2.8-.6 2.8-.6.1-.6.9-1.1 1.3-1.1 1.9-1.3 4-.6 4-.6 1.3.9 1.4 2.1-.4 2 .6 1.9 2-.4 2.5-.6.3-1.4 1.5-.5 1.4 1.1 1.9 1.1 1.9-.4 1.9-.4l5.5 1.9s1.3-.3 1.9-.4 3.8-.4 3.8-.4 1.4.4 1.9.9 3.6 2.4 4.6 3.9 2.5 2 2.8 2.6 1.3 1.3 1.8 1.3.5 1 1.1 1.1 2 .1 2 .1.1.5.6 1.1 1.6-.6 1.9.8-.1 2.1.6 2.1 1.5-.5 1.5-.5l1.3-.5s0-1 1 0 1.8.8 2.6 1-.4.9 1.8 1.4 4.1.8 4.6.8.5-2 2.3-.4 3 2.4 3 2.4-4.3 3.6-4.9 4.6c-.5 1.1-.9 3.4-2.1 3.5-1.2.2-8.7.5-8.7.5s.4 2.1-.7 2.1-11.5-.4-11.5-.4l-1.4-4.2s-1.2.9-1.4-.9c-.2-1.8-.2-4.6-.2-4.6s-2.7 1.4-4.2 1.9c-1.6.5-3 3.2-4.4 2.7s-2.1-2.3-2.5-.9.2 5.7-.9 6c-1.1.4-1.4-.3-2.3.8s-3.3 1.3-4 .7c-.7-.6-1.2-1.3-2-1.6s-1.2-.7-2.1-.8-1.1-.5-1.8.3-2.2 2.1-2.5 2.8-1.7 3.3-1.3 4.2c.4 1 1.8.7 1.8 2.5s-.5 2.7-1.5 2.9c-1 .3-5.8 1.9-5.8 1.9s-.8-2.1-1.3-2.7-1.5-.8-2.2-1-1.9-1.4-2.7-1.3c-.9.1-3.2.1-3.8-.6-.6-.7-1.7-1.5-3.3-1.6s-2.3 1.1-3.4-.6-3-4-3.5-4.1c-1.2.2-3.7-.1-3-.8z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgZJREFUeNrElttLAkEUxvdmZhez wsoKJbCo14J66Mn+dSGIoqegC0IkmZUUpuU1d/sWvonT4HorbODHYWeH8805c/bMmkb/YWpWH55m ezoJemcBB4RBqMt633kbNMEncIMEg4QsOp4BC2AFRClqChHfeQU8glfwTmF3ECEbRMAS2ABbYBss MzI5/EiewBW4AbfgGdRBp5eQElkHu+AA7IAkIwpp69uMKA8uwQk4B/egJiNztHQpkX2QAXsgwRQG ndE8WGR6ZznfAgVaTwqZdBRnJBlG44tOcRP9zlOltcp0voGySqEtFk+DTXAEDkGKc/YQ1emwQEqg SFFXCajFkyyAFG1EvB9kWExxksWToE/TECnxQ4+BVaZvWBFD87NGPz+E/DHBKNKijE1j+KEyE+em Y6qIZERRikQDKmxQoTD9pLn5Cf2MHE46I4ooPzYrdY7WVhHJdtKi9UYU8ljONZZ3jc+eJRpjhfVf 4bM3opBqSzm2o5ZMXYuTOS5q/kKowe/ogR9sW4+ozJclNkV3BBHlp0A/DbVhS9uJH9Wd6MDDiLm8 JvLs5kUpZGs78kTVRPnhqirsdcO6PHi/a5+CY14Z3x3c7hL6B22Igo7W7zyBy/OtUOQMZMEFeGEF G92EOkxZlbYtFqvyrwuqTPM1I8nyPirqBfVvN+xY/xnG+hf05/91XwIMAKWCucat6ZyJAAAAAElF TkSuQmCC"
            transform="translate(332.997 388.655)"
          />
          <path
            className="territory, st3"
            d="M345.9 410.4c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 339.409 404.963)"
            className="armies, territory, st4, st5"
          >
            {getArmy("venezuela")}
          </text>
        </g>
        <g id="madagascar">
          <path
            className="territory, border"
            style={{fill: getColor("madagascar"), stroke: getStroke("madagascar"), strokeWidth: getStrokeWidth("madagascar")}}
            d="M659.8 534c.3 1 1 .8 1 3s.5 5.5-1 3.5-1.5-2.8-1.5-1.5.3 3.5.3 3.5 1.2 1.7-.4 1.7-1.8-.2-1.8.5.2 2.1.2 2.1l-1.1 1.1-.5 2.3s1.8.2.7 1.9c-1.1 1.8-1.4 2.3-1.4 2.3s.2-1.6-.2 1.9-.4 4.1-.4 4.1 1.1-.4-.4 1.4c-1.4 1.8-1.9 2.3-2.3 3.2-.4.9.4 1.8-.7 2.7-1.1.9-1.6 1.6-1.6 1.6l-1.1 1.1s-.4 1.4-.4 2.1-.5 1.2-.5 1.2-.5.5-.5 1.2.2 1.1-.7 1.8-.5.9-1.6 1.8-1.4-.4-1.4 1.6c0 1.9-.5 2.8-1.4 2.8s-9.4.2-10.8 0c-1.4-.2.9-7.2-1.1-8.5-1.9-1.2-3.2-5.5-1.9-6.4s.5 0 1.4-.9.9-.9 1.4-1.9 1.4-1.1 1.4-1.1-1.1-2.3-.4-2.3.4-2.7.4-2.7.4-1.2.9-2.1-.5-1.8.9-1.9c1.4-.2 2.1.2 2.1-.7s-.9-1.1-1.6-1.2c-.7-.2-1.1 0-1.1-1.2s-.5-.7-.9-1.9-1.4-.5-.2-2.1 1.2-.5 1.6-2.1c.4-1.6-1.1-2.7.7-2.7s2.3.5 4.1-.2-.2-.9 2.7-.7 3 1.1 4.1 0 1.6-.7 1.8-1.9 0-1.6 1.2-2.1 1.2 0 2.1-.7c.9-.7 1.6-1.6 1.4-2.7s-1.1-1.6.5-1.6 1.4.5 2.1-.4c.7-.9.5-.9.9-2.5s0-1.9.9-2.5c.9-.5 2.5-2.3 2.5-2.3s.5-1.6 1.2.9 0 2.1.9 2.8 1.1.2 1.1 1.1c0 .9-.4 2.7-.4 2.7l-1.2.9z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiBJREFUeNqslltLw0AQhZuk9Vbv 9wtaFBURfPRF0L8uiC+i+OgNQZSq1YLWqlVbzXpWzpRhiWmMDXwsbZI9ObMzs+tlkl2eM+rLOGPs BHH3fZAFnSDnvGMnb4AP8AnC3wS9FgJ24jwYBpOgn6IeJ7STV0EJPIAXCodJhESgF4yAObAEVsAE ncllndyBE3AGLsA9eANfcUJWpBuMgwWwDNYoNEtHOfV8g46uwDHYA4egCGraWdYRzVFkHWyAVVCg s/wvazTE+za0ffy/Dq45GlfIZ7gWKLLJsPVSwG8RagnpM8P5BCoSwsBxM0k3W1yTwRYibmZmmSBl JsiLCPnq4S4wRQFxEiQoATciBa5rgeH2o4TGwIxyklRER8Wu1yIZlnLw1QN28mmKdf1RRLvKMyIr XIpO7aiD2baoaiWNkHx0P+eRcmg6smvRAwY4BimFRCzLj5cu8uPIMDNqTMkaf5uUQtKa6hyNDl2d reOcNfCRUsiobnHH0f42vrppi+uGNfD+DyHpf+f8+Lp2ZDh5ma2jIl/yR6GQDbXMj65oR1rolp34 ilUdphCxLi45NiMTRFiXohtlTUjmeDHhCplEtmsfgF1wBB7dXifXF5FO0UMhne5GEXINqhTZB9sU K+mkinJkX3xlGBpM0YxK2TfFM0N0SpEdihR5P4zbYQO1+c1z84vaXf+1w0Zt51HnhUw7zgxJT0Bt OQUlPdMlPtd9CzAA4Qq3BQRpp+MAAAAASUVORK5CYII="
            transform="translate(630.996 545.655)"
          />
          <path
            className="territory, st3"
            d="M644.1 567.4c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 637.588 562.032)"
            className="armies, territory, st4, st5"
          >
            {getArmy("madagascar")}
          </text>
        </g>
        <g id="north_africa">
          <path
            className="territory, border"
            style={{fill: getColor("north_africa"), stroke: getStroke("north_africa"), strokeWidth: getStrokeWidth("north_africa")}}
            d="M544.6 385.4c-.9-1-1-1.4-1.4-2.1s-.6-2.1-1.9-2.3-1.1 1.1-1.5-.8-.8-3.4-1.3-3.8-1.4-.8-2.5-1.9-1.3-2.3-1.3-2.3l-2.1-1.4s-5.5.3-6.1.3-1.8.1-2.5.6-.4.8-1.8 1.4-3.6 1.8-4.3 2-3.5.4-3.5.4 0 1-1.1 1.8-2.6 1.6-3.9 1.5-1.4-.6-2.4-.4c-1.8.4-3.1 1.6-3.8 1.5-.6-.1-1.8.4-2.9.8s.1.5-2.3.5-3.6 0-4.4-.1-1.4.3-2 .4-1.5.3-1.3.4c-1.4 0-2.1 1.1-2.1 1.1l.4 4.6-3.2 3.5s-.7 2.8-1.4 4.9c-.7 2.1-1.8 4.2-1.8 4.2l-1.4 3.9s-1.6.8-1.4 1.4.4 1.9-.1 2.3-1.1 0-1.8 1.3-1.1 2.4-1.1 2.9.6 1-.3 2-1.8 1.1-2 3.3-1.3 4-.3 5.3 1.6 2.3 1.6 3.6-.4 1.3-.3 3.3.4 1.9.4 3.3-.1 3.3-.4 4.9-.8 2.1-1.1 4-2.6 2.6-.9 4.3 1.5 3.1 2 4.5 5 1 5 3.9 3.4 3.3 3.6 4.8-.6 3.6 2.4 4.9 2.8 3.1 3.4 3.6 3.4.9 4 1.6 1.5 2 2.1 2.6 1.3 1.6 3.4 1.5 2.4 0 5.8-.4 5.8-.5 6.6-.6c.8-.1 2.8.5 4.1-.1s1.1-1.8 2.9-2.1 2.4 0 3.5-.3 5.5-.3 6.1.3 1.4 0 2.1 1.6-1.5 4.1 3.3 3.9 7.5-1 8.1.1-1.5 2.8-1.1 4.3.9 1.9.4 2.6l.6.3c.5 1.1.5 1.6 1.2 1.9.7.4 2.7-1.2 2.7-1.2s1.6 0 3.2.4 1.8-.4 3.4-.7c1.6-.4 1.9 1.2 1.9 1.2s1.2.9 2.7 0c1.4-.9 1.1-1.2.5-2.7-.5-1.4.4-1.8.7-5.7.4-3.9-1.2-1.9-1.2-1.9s-.5-1.2-.4-3.7.9-.7 1.4-1.8 1.2-1.1 2.1-1.8c.9-.7 2.1-.7 3-1.2s1.4-1.6 2.8-2.1 2.8-1.2 5.1-2.3 1.8-2.1 1.8-3 2.3-3.4 2.3-3.4-.5-2.1-1.4-3.4c-.9-1.2-.4-2.7-.4-3.5 0-.9.4-1.4.9-2.1s.2-1.1.2-1.1l.9-1.8s.5-1.4.5-2.7-.7-.7-1.4-.9c-.7-.2-.2-.4.9-.9s.7-1.8.9-2.8c.2-1.1-.4-5.5-.5-6.4-.2-.9-3.9.2-4.8-.2-.9-.4-1.4-1.1-1.4-1.1s-.7-2.1-.9-3.2-2.7.2-3.5 0c-.9-.2-.2-1.4-.5-2.7-.4-1.2-1.8-.7-2.7-.7s-2.3-.7-3.5-1.6-1.6.4-3 .5c-1.4.2-1.4-.2-1.9-1.1s-2.3.5-3.9.4c-1.6-.2-1.2-.9-2.1-2.3-.9-1.4-1.8-.4-3.7-.9s-1.2-.7-1.4-2.1-1.4-1.2-1.4-1.2-.2-1.6-.4-2.8c-.2-1.2.2-3.2.2-3.9 0-.7-.4-3.4-1.6-3.9s-.4-1.8-.4-1.8-.5-1.8-.4-2.7c.2-.9 1.4-1.9 2.3-1.9.9 0 1.4-1.1 1.4-1.1s-1.4-2.1-2.1-3.4c-.7-1.2 1.2-1.1 1.2-1.1l.9-1.1s.4-.5 1.9-1.4 1.1-2.7 1.1-2.7z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhpJREFUeNq0lklLA0EQhWcmk7hM cAsmghuIiggevQj+dkHEi9vFQ0BF3HfRqFFjzPhKXktTdsaJ0YaPDpmkXm1dPb6XbvlqlxWr/cc/ Jz0PQAg6QJbfieE3UOMeW6QWMcbFaAQGwBDooWAdVMAluAMvRAQbaUSM8TwogDEwBWZACeQYwQXY BScUk/0KPIP3JBER6AJFMAGmwRxFRh2RXNDwAdgAm+BYC4VKMEuBebAAZsE4I4pUTfqZwmc6MUB7 8vzIFgpVFHlGIAKLTFWexgMVecDURZYDgdVxElFVahSqKApM0SwF+kCmSe18q0EiptNj4SWdr+BU 6hdaXkVMzRz3fIKAq1m6wQib4gYccq+ZFITM6SQpWPlPu+ymGQa9xobJYQeLOMM0RVZ+vRaFsurg fhUzy/YscW81isTzF6jC5/5AwBnevy+7r/XAa2fFWsQImDFRaUPI6ayJRA7OOSizv59c0zSlwDdn TSRyQm85VXfANb1pJRpx6pFOlum0OP95ou0feTwjRbZyzjGzmglUOa/WwCrYN7Mro8Jt0Ggnp0DO EtJnwNyE70pgGWxzpNR1JMYjGdH3JKaIr2rUYL6rzL1cWOtgifsZUxW7RGI+vGONHiha4ee65bnc hnvM/xZYoYC5tBpJ169vDbtBDjsz9Cb52aPIr65f17DrJH1WQ3jtvki4LiZ7tpk7qN7uK1GaF7zU L3cfAgwA1IyzvCmBSZMAAAAASUVORK5CYII="
            transform="translate(502.997 414.655)"
          />
          <path
            className="territory, st3"
            d="M515.8 436.7c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 509.296 431.338)"
            className="armies, territory, st4, st5"
          >
            {getArmy("north_africa")}
          </text>
        </g>
        <g id="greenland">
          <path
            className="territory, border"
            style={{fill: getColor("greenland"), stroke: getStroke("greenland"), strokeWidth: getStrokeWidth("greenland")}}
            d="M429.1 209.9s.6 3.9-.3 5.5-1 .8-1.5 3.1-.1 3.3-1 4.6-.6-.9-1 2.8-.1 4.5-1 4.9.3 1.8-1.3 1.8-2 1-2.4-.4.3-2-1.3-2.1-2.4 1.6-2.6-.1.4-2.4-.9-2.9 1.3 3.6-2.9-1.3-3.4-8.3-3.4-8.3-1.3-1.4-1.3-2.3.9-3.6-.3-5.1-2.3-4.5-.9-5.4 2.8-.6 3.1-2.6.3-1.8.5-2.8.8-1.4-.3-1.5 0 .4-1.9-.1-1.6-1.3-2.1-1.4.4.8-1.3.1-2.9-1.1-1.1-1.8 2.9-.9 3.6-.6 1.1 1.6.9-.3-4.4-2.9-4.4-4.1v-2.3c0-1.3-.3-1.9-1.3-2.9s-.8-1-1-2.6-.3-1.5-1.1-2.5-1 .4-1.6-1.4-.6-2.1-1.9-2.1-1.1.8-2.1-.6-.8-1.6-2.4-1.5-2.9.9-3.1 1.4.4 1-1.3 1.1-2 .1-2.9.1-1.8.4-1.8-.1c0 0-1-1.5-2.6-1.1s-2 1.5-2.5.3-1.5-1.1-1.6-1.8-1.6.1-.1-1.5.5-2 2.4-1.9 1.5.3 2.5-.3 2.4-.6 1-.8c0 0 .5-.8-.9-1s-2.9.5-2.9-.5-1.3-2.1.5-2.1 2.8.5 3.6-.4.9-.6 2.1-.5 2.5.8 2.9-.3 2.4-1.1.8-1.6-2.5-.4-2.1-1.1 1.4-.9 1-1.8-2.1-1.6.4-1.8 3.8 1 4.1-.4-1-2.5 1.3-2.5 4.6-1.1 4.8-1.9-.5-1.6 1.6-1.1 1.8 1.6 2.9.3-.1-1.8 2.1-1.3 2.5.8 3.4.1-.8-.9 1.4-.6 1.8 1 2.1-.9-1.4-1.6.8-2.1 2.3 0 3.3-1.4.1-1 2-1.4 2.1 0 1.3-1.4-2.5-2.1 0-2.4 3.9-.5 4.1-1.3c0 0-.1 1 1.4.6s1.3-.9 2.1-2 .6-1.4 1.5-.8-.1 1.1 2.1 0 .5-1.1 2.8-.8 2.1.1 4.8.3 1.3.5 2.8.9 1.1.3 3 .3 1.5-.4 2.6.4.6.9 2.9.9 2.9-.6 3.3.8-.6 1.5 2.1 1.9 3.6-.1 2.1 1-4.6 1.3-3.8 2 .8.5-1.6 1-5.9 1-3 1.4 4.9-.9 5.6.4-1 1.4 2.3 1 1.9-1.1 4.5-.6 2.1 1.3 3-.4-1.5-2.5 1.4-1.9 2.3.6 4-.4 2-3 2.8-.6.6 2.9-1 3.6-1.5-.4-2 1.4-.4 2.3-1.6 3.3-1.9.1-1.6 1.9.3 1.5-.1 3.3-1.3 2.3-.1 3.3 1.1 0 1.9 1.5 1.1 1.5.4 3.3-.9.9-1.1 3-.5 3.4.4 2.8 1-2.4 1.1-.6.6 2.9-.9 3.5-1.4-.3-1.6 1 .6 1.6-.5 2.6-.1 2-1.4.9-2-2.9-3-1.8-2.4.1-1.3 1.5 1.9 1 2.1 1.5.1 1 .5 1.8.1 1.1 1.1 1 1.4.4 1.1 1.3-.4 1.4.4 2.3 1 .9.4 1.3-.8.5-1.6 1-.8 1.3-1.3 1.4-1.5.8-1.6-.5-.3-2.9-1-3.5-1.9-2.3-2.1-.8 0 2-.4 2.8-1.9-.3-.4 1 2.1 1.6 2.1 1.6 1.4.8.8 1.4.1.9-1.8 1.1-1-1.6-2.8.4-3 2.5-3 2.5l-.9-1s-.8-2.1-1-.8 0 1.3-1 3.4-.5 2.6-1.6 2.8-2-.8-2.6.1.3.6-.9 1.5-1.5 1-2.3 1 .4-2.1-1.1.1-.6 2.5-1.9 2.8-1.5.3-2.6.3-1.8.1-2.9.1-2 .1-2.8.5-1.5 1.3-1.5 1.3v.6h.2z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfxJREFUeNq0lttLAkEUxnfW3UwT owtd6EYPhb0W2UNP0f/dQ2+h+BQovQRSZEpCappt7vZNfBPDsDclB34MOrvnm3PmzDkrrOQhjFkf gTHHGohas4EDssA1npeGPTAG38CPEosSsWm0AFbBFihSUNCYNNwDLdAFA4r6aUQyIAc2wCE4BiWw SY/UkB68ggZ4AI+gDUZgEieiBHbBKbgAJ2Cfnrjasx49aYI6uAM18GQKOSECe+AcXIEzsM2whZ3J ClgzwmlRaKhC52hnoDyQAtec5e8810XM2WU1W/KsvsAz5yDDlxe4mzIFyvRoiR6KhAx0uck8w9hm Mox1Ebl4xBBdggMK2Fa6IeiJQ0864AX0ZchUGOROlsEOsyo3hYAeugKTpMTIZC3NkNBi684goNso Mt1VNgp7igowjdCCno22NZ8hzDjOYwRxIsE/GPd4Pzxlz45bnFGgx5rWU7bsuMUpRXxW4iaLZouX 8c+TMf9s8KFBWMlOEBjyAtZZlbu8mL83XnfXZcFb541X/UOkEJBFsQJuwT14o4ili0yINLjIUuMY tSswmBgCN6BKj8Yq5KYn8uA/2A88tROtso4M+hSoUqCi9RM/qWkldUU1PlnSa1ENy0roEVH9Xfdc evhOoU6YgJWiT0R9qYR9sXhRGSlS1iCRooRE3qsfAQYAvOCi+zNs0J4AAAAASUVORK5CYII="
            transform="translate(420.997 163.655)"
          />
          <path
            className="territory, st3"
            d="M433.3 185.5c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 4.9-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 426.846 180.048)"
            className="armies, territory, st4, st5"
          >
            {getArmy("greenland")}
          </text>
        </g>
        <g id="iceland">
          <path
            className="territory, border"
            style={{fill: getColor("iceland"), stroke: getStroke("iceland"), strokeWidth: getStrokeWidth("iceland")}}
            d="M474 212.5s2 1.9 2.5.9-.6-2.3.9-1.1 1.4.8 1.9 1.4 3.5-1.5 2.4.5-1.9 2.8-1.1 2.6c.8-.1-.1-.8.9.5 1 1.2.9 2.2 2.3 1.1l1.3-3.9s3.5.1 3.3 1.4-1.1 1.1.8.1.9-2.8 2.1-1.6 1.9 2.3 2.4 1.1-1.1-2.4.4-2.1 1.6 1.6 2.5 0-.1-2.5 1.3-2.3.8.6 1.8-.3c1-.9.8-1.8 1.8-.9s1 1.3 1 1.3 2 .2 2.5.5c.5.2-.3-1 .3 1s.6 2.6 1.3 2.4 1-1.1 1 .5-1.1 2.1.4 1.9c1.5-.2 1.9-.4 2 .8s.8 2 .8 2 .1.9 0 1.4-.4.7-.1 1.4.5 1.6 0 1.9c-.5.2-1.3.7-2.1.9s-1.4.8-1.6 1.4c-.3.6.8.2-.4 1.6-1.1 1.4-.8 1.6-1.5 1.9-.8.3-1.6.8-1.6.8l-3.4.5-.8-1.4s-.5-1.1-1-.6.1 1.5-.4 1.6-1.8-2.1-1.8-1.1.6 2.8.6 2.8.1 1.5-.5 1.7-.6 1-2.3 1.1c-1.6.1-1.8.9-2.6 1s-1.1 1.9-2.8.6c-1.6-1.2-6.1-3.3-7-3s-1.3.6-3 .1c-1.8-.5-2.5.6-2.9-.1s-.5.4-.1-1.4c.4-1.7 2-2.6 2-2.6s.6-.4.5-1 0-.9-.8-1-.5-.5-.9-1.5-.8-.9-1.8-.6-1.3 1.4-2.4.1-1.6-1-1.1-1.7c.5-.8.4-1 1.6-1.3s1.4 1 1.9-.5 1-2.1 1-2.1-.5-.3-1.4-.1-.6 1.1-1.6-.9-2.1-2-2.1-2-.3 0 .4-1 1.3-1 1.9-2-.5-1.9.4-2.8 1.1-.3 1.1-.3l-.2.4z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgxJREFUeNrElllLw0AUhdssdY8b 7lItVNEHX0TxyTf/uSCI4pPggiCKWrUoNdWqqWY8I2fkMjS1jaKBjyFNOueeO3fuJJv5/spao30p a2w6SdIzB3igA/gN3teT18EreANxkmCSkMOJe8EQGAcBRbNCRE8egmtwDx4pHLci5IIuMAoKYB4s gDE6k5d2cgMOwTE4BbfgGbw3E9JOusE0WAZrYBHk6ci33q/T0Tk4ANtgD1yAmnTmWaI+nWiRDbAC JpjCpDUaBMNMbx9/j8AlR2ULOZywQCdaZJYOnRbW06S1ynQ+gIpJoSvc5Bj9KlgHc0yX20Z1eiyQ MihRNDbRmLEHzIAljr3ieSuXyUiexaOD7jRBmpR4LOMiGU5Yk+/2pP7PAJgCI7ZQhvkdZyR5umvH jRTrpMgkRT8DdkQkAfdKkMKNFOrgPEVWcE46MunLWbs/jZDLSu3n6BpHsp1EHFVKIcVyrrG8a7xX jmiMIes/5L1KKWTa0gnbUSRTF/HHE770+gOhF+6jK27Yuu2owodlNsU4hYiZ55LzvJiAHSsS7epM dOB2xGIeE+fs5iUp5FoRKVE1AY8LU4XNTtiYC6+79g7Y4pHx1cHdBtafOPoU9Kx+pwQx1zekyC7Y BPvgjhWcaST0zpRVOdbFy6b8nwVVpvmITjZ5HpXsgvq3E/ZPvxn+9Cvo17/rPgQYAA+8ueInrOgq AAAAAElFTkSuQmCC"
            transform="translate(479.997 211.655)"
          />
          <path
            className="territory, st3"
            d="M493 233.4c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 486.456 227.993)"
            className="armies, territory, st4, st5"
          >
            {getArmy("iceland")}
          </text>
        </g>
        <g id="great_britain">
          <path
            className="territory, border"
            style={{fill: getColor("great_britain"), stroke: getStroke("great_britain"), strokeWidth: getStrokeWidth("great_britain")}}
            d="M466.5 294.2s-.4.5-1.8.5-1.6-.2-2.5.4-1.9.7-2.8.9c-.9.2-1.9 1.2-1.9 1.2s0 .7-1.2 1.1-1.1.2-2.3.2c-1.2 0-.9-1.1-1.1-1.8 0 0-4.2.4-2.9-.3s2.3-.3 1.4-.9-2.3-.8-.8-1 1.9 0 1.9-.5-1 .6 0-1 1.3-1.6 1.9-2.1.3-2 1.1-1.8 1.9.5 1.9.5l.5-1s-3.1-.1-3.4-.6c0 0-1.6-1.1-2.1-1.1s-1.6.1-1.3-.4 1.1-2 1.1-2-1.6-1.3-1-1.8.8-.4.8-1.3-1.1-1 .1-2.3 1.5-1 2.4-1.8.9-.9 1.5-.3.6 1.6 1.8.3 1.3-2.1 1.3-2.1-.5.1 1.4-.9.4-1.9 3.1-1.5 2.3.5 2.9.4 1-1.8 1.4-.4-.5 1.6 1.3 2.1 2.5.3 2 1.1-.6.8-.1 1.5.9 1.1.9 1.8-.4 1.1-1.3 1.5-.8-.1-1.9 1-1.8.9-1.8.9-.3-.6-1-.1-.4 1.3-1.5.5-2.5-.8-2.5-.8-.5 0-.4.8.8 3.3.8 3.3 1.1 2 .8 2.9-2.3 1.4-.6 1.5 1.5-.3 1.5.9 0 1.8 1 1.6 1.5 1.1 1.4.9zm12.2-10.9c-.5-.6-.3-.5-.4-1.1s.1-.7.1-1.3.1-.9.4-1.7c.3-.8-1.4-1.5-1.4-2.1s-1.1-1.4-1.2-1.8c-.2-.4-.7-.8-1.3-.7s-.6.4-1.3.8c-.7.4-.7-.2-1.2-.6s-.4-1-.4-1.9c0-1 .1-.5.4-1l1-1c.6-.6.3-.4.3-1.1s0-1.1-.3-1.9c-.3-.7-1-.2-1.2-.9-.3-.7-.4-.5-.8-.8s-.6-.1-1.6-.2-.3-.6-.4-1-.1-.5-.3-1.5c-.2-1-.6-.3-1.1-.2-.5.1-.7.1-.9-.8-.2-.9 0-.5-.1-1-.1-.4-.2-.4-.8-1.4-.6-1 .1-.4.8-1 .7-.5.6-.8 1.2-1.2.6-.4 0-.6-.2-1.3-.2-.7-.5-.9-.5-.9s-.6.2-1.7.2-1-.2-1.5-.9.1-.7.9-1.3.5-1 1.3-1.9 1.2-.8 2.2-1 .5-.7 1-1.8c.4-1.1.6-1.2.9-1.9.3-.6.8-1.4 1-2.6s1.6.8 4.6-.2 3 0 3 0 1.5 2.5-1 3.5-1 5-1 5h.7s.9-.7 1.6-.8.6.4 1.5.4.7-.5 1.8-1.2.8.8.8 1.4c0 .6 1.4 2.4 1.4 2.4l-.4.6s-.6.4-.6 1.3c0 1-.3.7-.4 1.1-.2.4-.5.4-1 .7-.4.3.1.4.3 1.3.2.9-.1.4-.5.5s-.9.1-1.2.7c-.4.6-.1.7-.6 1.4s-.4.4-1.6.8c-1.1.4-.6.4-.4 1.7s1.1-.4 2.7-.6 1.2 0 2.3 0 .6.1 1.3.6c.7.5.2.8.5 1.4.4.6.7.3 1.1.9s0 1.2 0 2.1v.8s1.1 3.2 2.5 4 .9.8 1.5 1.3 1.8 3.4 2.1 3.9c.4.4.4.8.5 2.4.2 1.6 0 1.2-.2 1.9s-.3.5-.5 1.5c-.3 1 0 1.1 0 1.5s.5.6 2.3-.3 1.1-.6 2.2-1 .9-.4 1.9-.2.9.4 1.9 1.4.4 1.1.6 1.9c.3.7-.1.6-.4 1.3-.3.7-.3.6-.7 1.5-.4.9-.2.7-.5 1.2-.4.5-.6.3-1.7.5s-.9.9-1.4 1.4-.4.7-.4 1.1c-.1.4.4 1.2.4 1.2s.8.4 1.2.8c.4.4.3.8-.3 1.7-.5.9-.7.4-1.8.9-1.1.4-1.4 0-2.5-.1s-1 .4-2.5.9-1.4.1-2.6 0-1.1-.1-2.2 0-1.1.4-2.4 1.2c-1.3.8-.8 0-1.2-.4-.4-.4-.7-.4-1.3-1.1-.6-.6-.6-.4-1.1-.2-.5.2-1.7 2.2-2.5 2.6s-.9.2-2 .2-.8 0-1.3.1-.9 1-1.6 1.8-.5.3-1.9.4c-1.3.2-1.2-.1-1.4-.4-.2-.4.2-.4.6-1l1.8-2.7c.6-.9.8-.4 2.1-1.2 1.3-.8.3-.4.9-1.7.6-1.3.7-1.3 2-1.8 0 0 .6-1.2-.6-1.8s-1.6-.4-2.8-.9-2-.3-1.8-.9c1.1-1.3 1.4-1.9 1.8-2.6s.1-1.3.6-1.3.8.3 1.4-.1.8-.6.8-1.4-.1-1 .1-1.8 1-1.4.4-1.9-.1-.4-.9-.6-1.3-.8-1.3-.8l.3-1 .2-1.8s.2.1 1.4.6 2 2.1 2 2.1c.4 1.4.8 1.4.5.7z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfNJREFUeNrElk1PwkAQhulSWj6M QROq0Rov+Ackcjf+b07e/Dh64mIAo5BUQhT5bJ1N3kkmEyClGGzyZNvu7rw7s7PTOrn0l6PaRLWp Jm/qZwqER7joWxAzYg6xZJPoJiED40VQJQLiEP0jok8MiQmwovE2QnmiRNSIcwjYto77HETaRA/3 th0QP8QyjRCLhMQ10SAuIXqiPPqA8VfiiXgmuqvE3DUiF8QNcQuxAO99MeeIOIXRK+IYfXbxHS3m qj1hT6zIHdoQ741IDF6UTY4KKGAMZ6L1bMx7lhch9LDCJkSa8KyCcY4KNT9z0pSJA9xbbyIp5IpJ Ray+gXCFmGxSHBODsSEyL0L4Ik5/o4QCbHwgwpX24tBLG0WOghGH0Z6TM2TXtiJarAZbVdh22JiH FdSRwn6KqrHuXPqwwWfOkx65OB988t0dhFbayhKeTJdBzi9E7RrhOclgb60t9mgmapctK9MdhKaw 0YbNmfRojir8JgpjnEEoxtwBbA31OUpQ5vsokP0MYiwibUw4MnnldoJ3ZWRMOWUGxig3tr49EvfE C/HJhVULWTe/0fqoXSU1zlELWwqRB6IFsXe511poCfe/MKgAIUeFMcZixsisHoy3INbVodffIxbq iFSN/uLD96+f8r3+nOz1d+tPfyB/BRgA7iG4YBgQqbsAAAAASUVORK5CYII="
            transform="translate(465.997 264.655)"
          />
          <path
            className="territory, st3"
            d="M479 286.8c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 472.497 281.393)"
            className="armies, territory, st4, st5"
          >
            {getArmy("great_britain")}
          </text>
        </g>
        <g id="scandinavia">
          <path
            className="territory, border"
            style={{fill: getColor("scandinavia"), stroke: getStroke("scandinavia"), strokeWidth: getStrokeWidth("scandinavia")}}
            d="M579.1 237c-.6-.1-1.5-.5-1.9-1.3s-1.3-1.6-1.9-1.4-.4.4-1.6.4-1.9-1.8-2.9-1.1-.3 1-1.5 1.3-2.6.4-3.9.4-1-.3-2.4 0-2.4 1-2.9-.3-.6-.9-.6-2.1.8-2.1 1-3.3-.5-2.3.4-3.4 1.5-1.4 1.9-2 .8-1.4.9-2.3.1-.6.1-1.5-.4-1.6-.9-2-.4-.4-1.5-.5-.8-.9-1.9.4-2.1 1.4-2.3 2.4.5 1.4-.1 2.6-.8 1.1-1 1.6.3 1.3-.3 1.8-.9.5-1.8 1-1.5.1-1.6 1.6-.4 1.1 0 2.1.6 1.1.9 1.9.8 1.1.8 2.6.4 2 .4 2 .5 1.8.4 2.6-.5 2.4-.9 3.3-.8 1.4-1.4 2-.4.8-1.1 1.5-1.6 1-2.3 1.4-.8 1.6-.8 1.6v2.4s.6 1.6-.5 2.1-1.4.6-2.1 1.8c-.7 1.2 0 2-.9 2.8s-.6.9-2.1.8-1.8-.1-2.3-.8-1.1-1.8-1.9-1.9-.6.1-1.1-.1-.1-.8-.9-.8-1.1.5-1.1 0v-6l-1.9-2.9.6-1.6-.8-1.3-.9-.5s-1.4.5-1.5 1-.1.9-.4 1.4-1.4 2-2.3 2.1-2 .3-2 .3-.4 1-1.1.6-.5-.3-1.4-1.3-1.1-2.1-1.1-2.6.3-.6-.4-1.1-.6-.5-1.3-1.1-1.5-1.1-1.4-2.3.4-2.3.6-3.4-.4-2.3-.4-2.3l-.5-.9c-.5-1.1 0-.9-.9-1.8s-1.6-1.2-1.1-2.7c.5-1.4-.4-2.3 1.1-2.7 1.4-.4 1.2 1.6 1.6-.9s-.7-1.8.7-3.4c1.4-1.6 1.6-1.9 1.6-1.9s.9 0 1.2 1.2c.4 1.2.4 2.3 1.1 1.4.7-.9.9-1.9 1.4-2.7s1.4-1.6 1.4-1.6-1.6-2.7.4-2.5c1.9.2 1.9.5 2.5-.2s.4-.7 1.6-1.1c1.2-.4 1.4-.2 1.6-1.2.2-1.1.7-1.1 1.4-1.8s.7-1.1.9-2.5-.2-1.2 1.4-3.4 1.6-1.9 2.1-3.4c.5-1.4.5-1.2 1.1-2.1s1.2-.5 1.8-1.2.7-1.6.7-1.6l.9-1.6s-1.8-.7-.2-1.4 1.8-.9 3-1.2c1.2-.4 2.1-.4 2.1-.4s1.1 1.7 1.3.4c.2-1.2-.5-1.4.5-2.2 1.1-.8 1.7-.7 2-.4s.2.5 1 .4c.8-.2 1.7.9 1.9-.4.3-1.2-1.1-2.2.5-2.9 1.7-.7 2.6-.1 3.1-.6s-.3-.8.8-1.3 1.4-.3 2.5-.6c1.1-.4 1.1-1.5 1.7-1.6.5-.1 1.2 0 1.8.5s-1 1 1.1.6 4.9-1.7 5.7-1.1c.8.6.1 1.7 1.1 1.7s2.1-.4 2.7-.1.4.6 1.2 1c0 0 .9 4 .3 4.5s.8 3.6 0 4.1-1.1 6.3-1.1 8.9 1.4 6.8 1 8.9.6 5.1.6 5.1.6.6.6 2.3.9 2.5.9 2.5.4.1.5.7.1 1.4-.2 1.7-.8.7-.8 1.6.3 1.3-.1 1.8-.6.6-.7 1.6-.3 2.5-.1 3.1 1.5 3.1.6 2.8z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhtJREFUeNqslstLw0AQxps0Tdoo UoX6qg+EKnq1WM/i/+3Jm4+jp17EVrRCLKK1Vpv4LXwrw5DaNLrwY0mymW9ndnZ2nUK25qjetET1 mQz89t0FHghAie+M8U8wYp8IZhZyaXgeLIFVsEDRL/ACeqAPhsSIxrMIFUEFLIMdsAf2wQrw6ckj aIMuBU3/BN7BOIuQFdkAh+AYHICtFI8eafwWXIFr0EkT8yaIbIIjcAKaYI0hlGu0yHAao7sMr8fv d1rMU2tiPTEip+zNc8jvjhpvwjhHSnxnM9F4NrBrVhQh9DnDFkVa9GyO45yUsDsiaULhtfEmkkKe +KnM2Te5NtKTac3l2A1mXsTwRTb9XSVksmybfSWjiA69tFG2kbBxN+5WwTqo5RDRYjXaqtoEssZ8 zqDBvRJkqBqT9mVAGw3a9KVHHvfIstgreYVSbeUJT67mMudl7Xrhc5LD3kRb1qMRP7RZVj7+IPQh 6mCPtn88+mQVvheFMc4hFPPfJ9rq632UsMz3WCB7OcSsiLQxtJEpKrcTvguZMWHGDIxZbkx9uwTn 4AY828KqhYybb+wD1q6KGueoiY2FyAU4o9iDXGstNKb7rxxUopCjwhhzMgNmVpfGzyjW0aHX55EV uhOpGrF21bjjFzh2poNv2lFujNe5y+uirBTEdsh9lOvLSZlURVkp/NflRB9utsL7Itxf/3XdmnaJ nOkC+S3AAAC8vV9vras0AAAAAElFTkSuQmCC"
            transform="translate(534.996 203.655)"
          />
          <path
            className="territory, st3"
            d="M548 225.8c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 4.9-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 541.507 220.356)"
            className="armies, territory, st4, st5"
          >
            {getArmy("scandinavia")}
          </text>
        </g>
        <g id="japan">
          <path
            className="territory, border"
            style={{fill: getColor("japan"), stroke: getStroke("japan"), strokeWidth: getStrokeWidth("japan")}}
            d="M829.4 335.3c0-1.2.5-4.4-.2-4.6s-.7-.7-1.9-.5-2.7-.5-2.7-.5-.4-1.2 1.8-2.5c2.1-1.2 3.4-1.9 3.4-1.9l-1.1-.7s-2.3-.2-1.2-.9c1.1-.7 1.2-1.6 2.1-2.7.9-1.1 3-6.5 4.2-8.7 1.2-2.1 4.1-1.4 4.1-1.4l1.9-4.9s-1.6-3.7 1.1-4.9c2.7-1.2 2.8.2 3.5-2.8s2.8-2.5 3.2-3.5c.4-1.1.7-1.1.2-2.8s-1.9-3.4-1.9-3.4-.7-2.7-.7-4.1-.4-3.7.9-4.2-1.1-3.4-1.1-3.4.7-1.1-.2-1.8c-.9-.7-1.4-1.6-1.4-2.5s.2-3.2.2-3.2.9-1.4 1.6-1.6 1.4.2 1.4-1.6-.9-4.4-.9-4.4-3.7-5.5-4.4-5.8c-.7-.4-.7-.7-.2-1.8s4.1 4.2 6.5 4.6c2.5.4 4.8 0 4.8 0l2.3-1.1 4.6.2s1.9.2 2.3 2.1c.4 1.9 2.8 1.2 1.6 3s-1.1 2.7-2.3 2.5-1.1-1.1-1.9-.9c-.9.2-1.6 0-1.6 1.9s1.4 2.1.2 3.7-.7 2.3-2.5 2.3-3.4-.2-5.1.2c-1.8.4-2.7-.9-2.7.7s0 1.9.9 2.1 1.6 0 1.2 1.1c-.4 1.1-1.4 1.8-.7 2.1.7.4 1.6-.5 1.6.4l3 .2.5 1.8s.4 0 1.4.2 1.8-.7 2.1.5c.4 1.2.9 1.8.9 1.8s.5 0 .7 1.2.4 1.6.4 2.5-.9 3.7-.9 3.7-.7.7-.5 2.1.9 0 1.1 1.8c.2 1.8.2 2.3.2 3.5s-.2 1.1.9 1.9 1.4 1.8 1.4 1.8.9.5.9 1.8v2.3s-.5.2-1.2.2-1.6-.2-1.6-.2-.2.5-.5 1.8c-.4 1.2-1.9 1.9-1.9 1.9s0 1.8-.7 1.9c-.7.2-1.2.2-1.9.4s-1.2 0-1.6.9c-.4.9 0 1.1-.9 1.2-.9.2-1.8-1.4-1.9.9-.2 2.3 1.2 3.2-.5 3.7s-2.8.9-2.8.9.4 1.4-.9 1.1c-1.2-.4-2.7-1.6-2.7-2.5s-.2-1.4-.2-1.4l-2.5 1.6s.4.9-1.4.9-2.5-1.9-2.1 0 1.1 3.4 1.2 4.1c.2.7 1.2.2 1.1 1.2-.2 1.1.2 1.1-.5 1.8s-2.1.9-2.8.9-.9-.2-2.3 0-2.1 6.8-2.1 6.8l-1.3 1.1-1-.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNqslllLAzEUhWemm9pS tYuKK+KCPuiDKP4Af7jgm1h8Eqx9EapoFfShVqXbjCdwrlxi080GPtJOkntyb5Kb+N7g4lu1LpFV 9zXgagtAHKRAwupvDLdBE3RA6BLz+xg3RtMgB5ZAloI+jRnDdVAD76BB0XCQiDZeAOtgB+yBRXok xXjwAsqgAu7BK/gGXZeI+Z0EeRreBwdgF6zRk4Tq36YnVXALLsE1eLSF4pYXGQqcgWOwRdG0Y03m 2a7D6VHoS0IXVwLTYJmzP2Gdo3eBY/0kvCllq8NQPoGWmYwspOlYBIfglCHKc/CgHRijp6sModkE D6zN/yhgZ2NsBRxRaIEe+N5wRSJhxm2wnpLxgfJkluEqskPgjVZEqEg7c7KOgXI7oQ7dqAJiI8Wt vq2i8ceY741fZKJZCmVtTyZVRCipt/ykRZyL1SurjlskabZk+2qRno1jCtSZ0+r6nDgbRxQJmYmr TJo1nvxfT5r8WGanRq+UPUDA5KpnJssKT7xJMVHMcjfBdFJgqpC04/cJkQiYpHgFLsANeKOIp0W6 xOeJn6FITIlEipBrWFcC56BEj5oSctsTM+iT90FbZsK6xe/CBy+pO+VBSd0noeuEx1Si22Q27nUr jn0z2ndExnG/e/+944d9qfz7tTLsm2vod9ePAAMAfUOh/K4sVpQAAAAASUVORK5CYII="
            transform="translate(840.996 281.655)"
          />
          <path
            className="territory, st3"
            d="M853.2 303.4c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 846.7 298.03)"
            className="armies, territory, st4, st5"
          >
            {getArmy("japan")}
          </text>
        </g>
        <g id="yakursk">
          <path
            className="territory, border"
            style={{fill: getColor("yakursk"), stroke: getStroke("yakursk"), strokeWidth: getStrokeWidth("yakursk")}}
            d="M810.1 170.4c-.5-1.1.8-1.3-1.1-2.3s-2.6-.8-3.8-1.1-.9-.6-.4-2 2.1-1.5-.1-2-2.1-1.4-3.8-1.4-1.3 0-2.1.4-1 .4-1.4.9.4 1.1-.5.9-.4.1-1.3-.9-.6-1.4-1.8-1.3-.3-.1-1.9.3-2.1.4-3.3.5-3 1.6-3 1.6.1.3-1.3.4-.5-.6-2.4.8-1 1.5-2.5 1.4-.8-1-2.4-.3-1.8.4-1.8 1.4-1 1.6-1 1.6 0-.4-.4-1.6-.9-.8-.8-2-5.3-2-6-3.8-.6-1.5-.9-3.1-3.3-2.4-3.8-2.3-1.9 1.6-2.5 2.4-.9 1.4-1.9 2.1c-.9.9-1.7 1.4-2.4 1.9l.3 2.6c0 .5-.1 2 1 3.1s1.5.6 2 1.1-.1 3.8-.3 4.5-.6.8-1.1 1.6-.1 1.4-.5 2.9-.9.9-1.3 2.4 0 1.4.5 2.4.5 1.9.5 3.4-.3.6-.9.8-1.3.6-2.5.8-2.6.6-3.3-.1-1.3-.9-3.5-.6-.6 1-.9 2-1 .9-2.5 1.1-1 .4-1.1 2 1.8 2.6 2.8 3 1.3.6 1.6 1.3 1.5.4 3 1.8.3 1.6-.8 2.6.6 4.5 1.4 5 1.1 1.3 1.5 4.3 1.5 3.3 1.5 3.3.9.5 1 3.6.9 5.8.9 5.8 4.9-1.5 6.1-2.3 1.1-.9 1.5-2.6.5-4.6 1.9-4.9 1.1 1.8 1.1 1.8c.1.8 1.5.5 3 .8 1.1.2.6-.8.4-1.7-.1-.4-.1-.8 0-1.1.4-1 12.3.1 12.3.1.4-1.1 1.2-1.8 2.6-3 1.3-1.2.3-3.4.4-3.9s1.8-1.9 2.6-4.9 1.8-.8 1.8-.8 2-1.8 2.7-3 4.6-1.1 5-.9c.4.2.2 1.9.8 3.2.6 1.2.3.5 1.3.4 1.1-.1 1.8-.4 2.7-.4s.5 1.4 1 1.6c.4.2 2 0 2.5-.1s1.4-.8 2-1.3.2-2.3.3-3.1 1-1.1 1.2-1.7c.3-.6 0-2.3-.1-3.1s-.7-1.8-1.3-1.9-3.1-.4-4.1-.4c-1-.1-1-4.8-.5-7.8.4-3 .2-2.3.6-2.8.4-.5 1.9-.8 2.5-.8s1.2-1.1 1.3-2 .8-.7 1.1-1.6c.4-.9 1.5-.4 2.7-.6 1.2-.2.4-1.5.4-2.9l-.5-1.5z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe5JREFUeNq0lt1LAkEUxXdm/SCT pQzKIISCwl6NEoIeoj/dCKLoIYKylyAq0yhIQ7Nt3c7GGZim/TS68GMfdrxn752ZcxVWcgjjqYdv PGMTRL2TIAeKIG+sDxK7YAw+wSRKLEpEMmkZVEAVOBQUTBYk7oNH8ALeKDpJI2KDGbAIVsEGqIMl VqQiqKALrsA1uAE9MAJenIgSWAEN0ASboMZK8tpal5XcgktwDM7AnSmUM1qkBHbAPtgCy2xb2J7M gwWjnRaFhqp1Oa2iPFvUoECTgiV+gIjZu6KWK9irD3DPp29rbXLYmgOwyxbN8p1IOIF5dqHENvZ4 GMZKRFURlLwN9sA6RW0rXQhWkmMlT6ADBkHLJBcVKVJnBWV+YZaQ/F2NearqNEqtEofH1AnZ5LTV hOaRxoLClAJWXB6ZwWayiv3o47+HjHDVv4YfJqI7aqjJZUju8hK6SkxqL17BA8/4+xRCvuZnXT5d /TLqXubQ3pNuuxkTJm6DQ3DOW+/ZIWUW6GEVXiaRIORTYEhjPAFHtP5vk9RFPFqCTXedo4hejW8w 4Yf1KXAKWuACPDPfL2/yjFHqGc46MhjQDNusoMWZ0lHmGHb5pDYV12KmYqbpKKaY7/pepJrzSXMi 6p9Kpn8sIqUHiRS3O9ItvgQYADvkni6JMM3MAAAAAElFTkSuQmCC"
            transform="translate(761.996 177.655)"
          />
          <path
            className="territory, st3"
            d="M774.6 199.6c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 768.055 194.164)"
            className="armies, territory, st4, st5"
          >
            {getArmy("yakursk")}
          </text>
        </g>
        <g id="kamchatka">
          <path
            className="territory, border"
            style={{fill: getColor("kamchatka"), stroke: getStroke("kamchatka"), strokeWidth: getStrokeWidth("kamchatka")}}
            d="M818.4 289.5c1-.8.8.1 1.6-1.8s.6-2.5 1.3-3.1 2-2.9 1.9-4.5-.6-1.5-.3-3 .5-1.5.8-3.5-.3-1.8.4-4.1.8-2.9.4-3.8-.6-1.9-.6-3.4.1-2.8 0-3.3-.3-1-.6-2.4-1.4-2.4-1.4-2.4-.3 1-.8-.6-.4-1.1-.6-2.1-1 .5-.6-2.9.3-4.5.3-4.5-.1-3.4-2.4-3.4-3 .6-3.3-1.3-1.3-2.3-2.8-2.5-1.8 0-2.5-.4-.4-.6-1.6-.6-.5.5-2.3 0-1.8.8-2-.5-.1-2.1 1.6-4.9 1.6-3.4 1.9-4.8-1.3-.8 1-2.8 1.6-2.6 4.3-2.6 3 0 4.9-.9.4-1.9 2.6-.9 2 2 3.3.9 1.6-1.9 2.3-1.9 3 1.4 3 1.4 1 .5 1.9.3 1.6 1.6 2.5-.1.5-2.3-.4-2.8-1.9 1.8-1.4-1.3 1-4.1.6-5.1-3-4.5.1-2.4 2.4 2.5 3.5 3.1.6.6 1 3 4.1 1.9 3.6 4.9-.5 3.9-.8 5.1-1.6.4-1.3 5.5.8 14.3 5.3 18.3 5.6 4.5 6.3 2.8 1.3-2.5.9-4.5-1.4-2.8-.6-4.1 1.4-2.3 1.5-3.4.4-2 .3-3.3 0-2.8-.3-3.8-.5-2.6-.6-3.6-1.1-2.8-1.5-3.6-1.5-2.6-1.8-3.9-.8-1.8.5-3.5-1.1-2.8 1.8-2.4 2.8.8 4.3.5 3 .6 3.5-1.1.1-1.5 1-2.8 1.3-1 2.3-2.5-.5-2 2-4 4-2.8 4.6-3.5 1.9-1.1.9-2.1-1.1-1.9-2.5-2.8-2.1-1.5-2.8-1.6-1.5-.4-.9-.9 1.6-1.4 2.6-1.4 1 1 2.5.3 2.1-1.3 3.1-.5.4.1 1.1 1.6-.8 1 1.3 2.1 3.9 1.4 4.5 1.4.3.8 1.8-.1 1.3-.5 2.3-1.9 1.6-1.6 1.3-3.4-1-2.9-1-3.4l-1.1-1.9s0-.9-1.8-.9-2.8.1-2.8-.5.5-1.8-.6-1.8-1.8-1-2.5-.1-1.3 1.9-2.1 1.4-1.9-1.8-1.9-1.8.3-1.3-.1-1.8-1.5-1.6-1.5-1.6l-1.6-.8s-3.4-3.4-4.6-3.5-2.4.1-2.8-.9 1.8-1-1.4-1.5-3.3 0-4.3-1.4.4-1.8-2.1-1.9-3.6.3-5.8-.6-2.1-1.8-3.1-.8-.5 1.1-1.9 2.3-.6 2.1-2.8 2.1-1.8.3-3-.3-1-.9-2.5-1-1.1 0-2.6.1-.3 1-2.6-.1-2.4-1.4-4.1-2.3-2.3-1.1-3.1-1.1-4.5-.4-5.5.5c0 0-1.3 1.4-1.3 2.8s.8 2.7-.4 2.9c-.6.1-1.1 0-1.6 0s-.9.1-1.1.6c-.4.9-1.1.7-1.1 1.6-.1.9-.8 2-1.3 2s-2 .3-2.5.8c-.4.5-.2-.2-.6 2.8-.4 3-.4 7.7.5 7.8 1 .1 3.4.3 4.1.4s1.2 1.1 1.3 1.9c.1.8.4 2.5.1 3.1-.3.6-1.1.9-1.2 1.7-.1.8.4 2.6-.3 3.1-.6.5-1.6 1.2-2 1.3s-2 .3-2.5.1c-.4-.2 0-1.6-1-1.6s-1.7.4-2.7.4c-1.1.1-.7.8-1.3-.4s-.4-3-.8-3.2c-.4-.2-4.3-.4-5 .9-.7 1.2-2.7 3-2.7 3s-1-2.2-1.8.8-2.5 4.4-2.6 4.9 1 2.7-.4 3.9c-1.3 1.2-2.1 1.9-2.6 3-.4 1.1-.4 2.5-.1 2.9.3.4 1.4 2.9 1.1 4.9s-.9 8.1-.6 9.3c.3 1.1.4 4 1.1 4.8.8.8 1.1 1.4 1.5 2.1.4.7 4 1.9 4.6 3.4s.3 1.9 1.3 2.5c1.1.6 2 1.9 2.1 3.2.1 1.2.1 3.1 1 2.8s1.9-1.5 2.2-1.9c.4-.4 1.7-.8 2.8-.4s1.4.4 2.6.3 2.2.2 2.2.2.9 1.3 1 2-.4 1.2 1.1 1.1c1.6-.1 1.9-.2 2.1 1.6.2 1.8 1.1 2.7 1.1 2.7s.3 1.9.2 2.3-.7 1.5-.4 2.7c.3 1.1.9 2.3.4 3.1-.5.8-1.4 2.6-1.4 3.3s-.2 2.6 0 3.2-.5.2-.3 2.1c.3 1.9.4 2.3.4 3s-3.9.5-2.1 2.7c1.8 2.1 2.1 4.7 4.1 4.6 1.9-.1 2.8 2.7 3.1 3.7s1.1 1.7 2.3 1.8c1.2.1 1.4 1.9 2.4 2.1s.6 1.1.4 1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgdJREFUeNqslktLAzEUhSdpp1Vb RlR8S8GFUreKFgQX4k8XBFFcCT5BKEofWkWrLfUx44mcQExnpjPVwEcWTe+59yY5GeEMHsKazRFY c2yAqN8kyII8cK31KvAH6IFP4EeJRYlIBi2CSTAHPAoKBlOBX0AdPIJXivpJRDJgFMyAZbAKymCW FemhKmiAc3AJbkATdMFXnIgWWALroALWQImVuMbaD1ZSBWfgEJyAW1soa7VIC2yBXbAB5tm2sD2Z AFNWOx0KdXTrskZFLlu0ToEKBceYgIjZu7wRS+3VO7jjHGSMNnlszR7YZosK/E0MOIEuuzDGNjZ5 GHpaRFehSt4EO2CFohkn2RCsJMtK7kENtFXLJBflKVJmBUVmmGZI/q/EOHP6NEqjEo/H1AvZ5KTV hMaR1oLckAJOXByZwmbSiv3qY5jh/euQltm9c/6rWGCLBIZFNDgPKxSarDTMrk6zU170FuamCQX6 kpWGbasbeg2uwIO2hBQiPu2+ymTrTP7XjdaZF+hhHo+iHHDqAv63Q2M8Age0/h+TzIQsVkFHaBE5 Q0ivMfFZ8QsFjsE+OAUtdqjPm3y+Bc8koIjDYF2LNs3wghXs802paXO03xO9cS0uUHv0xCALrM4e ca+jH3fDhfGATYNFMG6872ZSid55MeCiuhFfKqm+WERCDxIJbnfkcf8WYAC3TaxoJmGX1QAAAABJ RU5ErkJggg=="
            transform="translate(811.996 194.655)"
          />
          <path
            className="territory, st3"
            d="M824.6 216.6c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c0 4.9-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 818.072 211.143)"
            className="armies, territory, st4, st5"
          >
            {getArmy("kamchatka")}
          </text>
        </g>
        <g id="siberia">
          <path
            className="territory, border"
            style={{fill: getColor("siberia"), stroke: getStroke("siberia"), strokeWidth: getStrokeWidth("siberia")}}
            d="M683.9 193.6c.6 1.8 1.1.8 2.3 0s.3-.6.4-2.1-.4-1.3-1-2-.4-.1-2-.1-1.1.3-2.3.4-.8 0-2.6-.4-1.1-1.4-1.1-2.1-.5-2.1-.5-2.1-1-.4-1.5-1.4 0-1.1.1-1.6.3-1.1.1-2.6-.5-.5-1-1.3 0-1.3 0-1.3l1-1 1.8.6 1.1.4 2.3.8s.1.3 2.1 2.5 1 .3 2.5.4 1.1-.6 1.1-.6-2-1-2-1.5.5-1.3.5-1.9-.1-2-.4-2.5-1-.9-1.5-1.4-1.3-1.9-1.3-1.9-.4-.8.5-3.3 1.1.9 1.1.9l.8.4 1.5 1.3s1.3-.3 2-.5 1.9 1.8 1.9 1.8 2.3.3 2.8.3 1.5-1.4 1.5-2.4-2-.1-2-.1l-3-.6s-3.9-1.1-4.6-2.1.1-1.5.1-1.5l2-2.5s1.4-1.4 2-1.4h3.3s.9-2.1 1-3.8 2.3-.5 2.3-.5 1.6-.5 2-1 2.5-2 5.9-4 3.4-1.1 4.9-1.3 2.9-.1 3.4-.4 2.1-1.4 2.6-1.6 3-1.5 3-.9.3 2 .5 2.5 1.6-.6 3.3-1.9 1.1-1 1.9-2.1 1.5-.4 2.6-.3.8 1.9.9 2.6 2 2.1 3.1 2.9 4.3-3.8 4.8-1.4 3.3 3.3 3.3 4-1.3 2.3-2.1 3-1.6 1.6-2.1 2.8 0 .8 0 1.8-.8.3-1.9 1-1.1 1-2 2-1.4.5-2.3.9-.6 1.5-.9 2.4.5.8.5.8 1.3-.9 1.9-1.3 3-1.6 3.6-2 2.3-1.8 3.6-3.3 3.3-.8 4.3-1 1.6.4 1.6.4 1.3.1 2.4-.5 4-1.3 4.6-1.3 2.3.3 3.1 1 2.4 1.8 3.3 2.4l1.4-.1.3 2.6c0 .5-.1 2 1 3.1s1.5.6 2 1.1-.1 3.8-.3 4.5-.6.8-1.1 1.6-.1 1.4-.5 2.9-.9.9-1.3 2.4 0 1.4.5 2.4.5 1.9.5 3.4-.3.6-.9.8-1.3.6-2.5.8-2.6.6-3.3-.1-1.3-.9-3.5-.6-.6 1-.9 2-1 .9-2.5 1.1-1 .4-1.1 2 1.8 2.6 2.8 3 1.3.6 1.6 1.3 1.5.4 3 1.8.3 1.6-.8 2.6.6 4.5 1.4 5 1.1 1.3 1.5 4.3 1.5 3.3 1.5 3.3.9.5 1 3.6.9 5.8.9 5.8-4.1 7.7-2.9 11c1.2 3.4 2.8 9.5.9 11.7-1.8 2.2-2.8 2.2-3.4.9-.6-1.2.3-1.5-1.8-1.8-2.2-.3-1.8.6-3.4.9-1.5.3-2.2 1.8-3.4.6s0-1.5-1.8-.9-.9 2.8-3.2 3.2c-2.3.5-2-.3-2.9 1.2s-1.4 2-1.7 2.8-.9.6-.3 2 2.2-.6 2 2.2c-.2 2.8-.5 4.5-.5 4.5s-1.1-.8-1.1 1.1c0 1.8.8 1.7.5 3.2s-1.1.6-.6 2.5c.5 1.8 1.7 1.8 1.7 1.8s.3-1.8.9-.3c.6 1.5-.2 2.5.9 2.9s0 .3 1.7.9c0 0 .7 0 1 .9s1.2 2.4.3 3.5c-.8 1.2-1.5 3.3-.6 5.4s2.5 2.3 2.4 3.5c-.2 1.2-.4.9-.5 2.6-.2 1.7.2 2.8-.2 3.5s-.6 1.8-1.2 2.1-1.4-.3-1.9-.6-.2-2-1.1-1.3c-.9.7-1.1 1.6-1.8 1.2s-.7-1.2-1.4-1.4c-.7-.2-2.1.3-1.4-1 .7-1.3 1.5-1.5 1.6-2.4s.5-1.6 0-2.5-.8-1.9-1.5-2.1c-.8-.2-.8-.6-1.7-1.5s-1-1.9-1.7-1.7c-.7.2-1.8 2.1-3.5 1.8-1.6-.3-2.2.4-2.8-.7s-.8-1.5-1.4-1.6-.9-.2-.8-.9c.2-.7.2-.4.2-1.6s.1-3.9-.8-5.2-.9-1.4-.9-1.8c0-.5.5-.7-.3-1s-1.9-2.4-2.2-3.2c-.2-.8-1.4-.8-1.8-.8-.4 0-1.3-2.5-1.3-2.5s-3.9.1-3.8-.8c.1-.9.5-1.8.6-2.2s.7-2.8.1-3.6-1.7-1.6-2.3-1.7-1.7-.4-2.3.5-1.2 1.5-1.5 1.4c-.3-.2-.8-.1-.9-.9-.2-.8-.5-3 .6-4.6s.8.5 1.5-.2c.7-.8 1.1-2.2 1.1-3s-.5-1.5.5-2.5 1.8-.7 2.2-1.6c.5-.9 1.2-1.1.7-1.9-.5-.8-1.4-1.6-1.5-2.7-.1-1.1.3-1-.4-1.7s-1.2-1-1.3-1.8 1.4-.5-.1-1.3-1.9-.2-1.7-1.6c.2-1.4 0-2.5.5-3.3s-.3-3.2-.6-3.6-1.1-1-1.5-1.5-.3-1.8-.6-2.1c-.3-.2-1.5-1.2-1.8-1.6s-.3-.7-.6-1.5-1.5-1.3-1.8-1.7-2.7-1-2.8-1.4c-.2-.4-.2-1.3-.1-2.1.2-.8.4-1.9.2-2.8-.2-.9-.3-1.8-.4-3.2-.1-1.3-.6-1.9-1.6-1.9s-1.5.5-1.5 0c-.1-.5-.6-2.1-.6-2.5s-1.4-4-1.7-4.2-.3-.3-1.2-1.1c-.8-.8-1.5-1.4-2.1-1.5s-1-.8-1.1-1.5c-.2-1.4-.5-3.3-.3-3.5z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgdJREFUeNq0lslLw0AUxpvphm0t uOCGiAWVehXFkzf/b8GDF4sH9eByEIpLrShYl5qkSfymfAPjOEmTigM/pqST97335uXNOLnk4Riz bUTGHGvE9lyAAiiDYsxaadgHLucwrYig0RqYBgugTkHHEBiAV3AHnkCfQlGSSB5MgDnQABugCeYZ kTm+wD04Aaf8/W5GVTAikALLYAvsgk2wwkiKFhGfEUinpsAZuAbPwFMRFbSIilwsBfbBNlhk2uL2 RHo7yTWzfF9FKFMZ6CKCCxuMQAqsggr/iysQwTVLTGfElD2AT7U/eS0KucE7YA+sM0X5EeWrspCn DSn6ATpMmay6SHBhmSJN7kGNL6QdUqjElEkH11iZw4oUWiR1VlE9YQ+ShrRVpZNNOl3Oad4qodKY ArkkZ0XKDpBV6IezIvc/wzHzaGt2fx2RTUQ1Oo9z9Afjv+wI7Y8eeOQ8jlCsHRWJyw/oArTZ5MKM IiHfa9NOh3aHX6ruiayIGX5U1QzlHLKN3IJjcARuVGvRRQLisBvXOatzJO7QMgUOwTnbysAWicfe 4zOKCkX0HhZpxj3mXgkcgBYbpKv21RQJeLq9cfaVN5w9PldruuBSi6BFwb6+p7YUpD0dXVaR3OQr 7kGXAkGaNjLqnFfne49V9GI7dtP0qlE3Fv2mMrBdILI0xKS7V5SmHX0LMAAaOqMAXhQelgAAAABJ RU5ErkJggg=="
            transform="translate(713.996 200.655)"
          />
          <path
            className="territory, st3"
            d="M726.4 222c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 719.885 216.618)"
            className="armies, territory, st4, st5"
          >
            {getArmy("siberia")}
          </text>
        </g>
        <g id="ural">
          <path
            className="territory, border"
            style={{fill: getColor("ural"), stroke: getStroke("ural"), strokeWidth: getStrokeWidth("ural")}}
            d="M665.8 265.9c1.1-.5.2-1.5.2-3.3s-.5-1.9-.7-3.2c-.2-1.2-.5-1.6-.7-2.5s1.6-1.8 2.3-3.2 0-1.9-.2-3.2c-.2-1.2-1.8-1.2-1.8-1.2l-3.2-2.1-1.4-.7s-.2-1.4 0-3 1.1-2.1 1.8-3.4c.7-1.2.7-2.7.7-3.5s-1.8-1.2-1.8-1.2V226.5c0-1.3-.7-3.5-1.2-4.4s.5-2.5.5-2.5-.9-1.9-1.1-2.8c-.2-.9 1.1-4.8 1.1-4.8l1.9-4.8 1.2-2.1s0-3.2.5-3.9.4-4.1.4-4.1-.7-6.7-1.4-7.2l.7-2.3-1-.9-.4-2.5-2.5-.6.3-3.4s1.5-1.5 2.1-1.5-1.5-2.1-1.8-3 0-1.3.5-1.5.3-1 .1-2-.1-1.1-.1-1.1l.9-2.5 2.9 1s.6 1 1.3 1.1 1.3 0 1.8 0 .3.1 1 1.6.8 0 1.9.3 1.1 1.4 1 2.1-.8 1.4-1.4 2.5-.5.8-1.5 1.9 1.5 1.9 1.5 1.9.3 1.5.9 2.4.1.3 1.1.8 0 .9 0 2.3.8.3.8.3.5.6.9 1.9.1.5 1 2.4 1.3-.1 1.3-.1.8.6 1.3 1.6 2.4.6 2.4.6 1-1 1.8-1.6.5-.4 1.5-.8 0 .1.7 1.9.4 3.1.5 3.8c.1.8.5 1.5 1.1 1.5s1.2.7 2.1 1.5c.8.8.8.8 1.2 1.1.3.2 1.7 3.8 1.7 4.2s.5 2 .6 2.5.5 0 1.5 0 1.5.6 1.6 1.9c.1 1.3.2 2.2.4 3.2.2.9 0 2.1-.2 2.8-.2.8-.1 1.7.1 2.1.2.4 2.5 1 2.8 1.4s1.5.9 1.8 1.7.3 1 .6 1.5 1.5 1.4 1.8 1.6c.3.2.2 1.5.6 2.1.4.5 1.2 1.2 1.5 1.5s1.1 2.8.6 3.6-.2 1.9-.5 3.3c-.2 1.4.2.8 1.7 1.6s0 .5.1 1.3.6 1.1 1.3 1.8.3.6.4 1.7c.1 1.1.9 1.8 1.5 2.7.5.8-.2 1-.7 1.9s-1.2.6-2.2 1.6-.5 1.8-.5 2.5-.4 2.2-1.1 3c-.7.8-.3-1.4-1.5.2s-.8 3.8-.6 4.6.6.8.9.9c.3.2.8-.5 1.5-1.4.6-.9 1.7-.6 2.3-.5s1.7.8 2.3 1.7 0 3.2-.1 3.6-.5 1.3-.6 2.2c-.1.9 3.8.8 3.8.8s.9 2.5 1.3 2.5 1.5 0 1.8.8c.2.8 1.4 2.8 2.2 3.2.8.3.3.5.3 1s0 .5.9 1.8.8 4 .8 5.2-.1.9-.2 1.6l-2.5.2s.7 4.2 0 4.6c-.7.3-3.8.8-3.8.8s-.1 3.3-.2 3.8-1.6 1.5-2 2.1c-.3.5-.7.5-.3 1.2.3.7.5 1.5.4 2s.5 1.3-.7 1.5-1.7.7-2.4.1c-.7-.5-.9-1.7-1.7-2.2-.9-.4-1.2-.4-1.3-1.3s-.4-2.2-.4-2.2-1.1-1.6-1.6-1.6-2.7.5-3.2.2c-.4-.3-2.5-.1-3.3-.8s-.9-1.2-1.8-.8-2.7.5-2.7.5l-1.6-1.1s-.9-.3-1.7-.9c-.9-.5-1-1.8-1.3-2.4s-1-1.4-1.4-1.7c-.4-.3-.9-1-1.4-1.5s-1.2-.9-2-1.1-1.4-.3-1.6-1c-.2-.7 0-1.2-.4-1.3-.4-.1-1.5-.5-1.5-.5s-.1-1.5-.7-1.8c-.5-.3-1.6-1.2-2.3-1.5s-1.4-.4-1.6-1.3c-.2-.9-.5-1.2-.5-1.2s-1.3-.9-1.5-1.4-.9-1.6-.9-1.6l-1.4-1.5-1.6-.5-2.6-.2z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfBJREFUeNq0lslLw0AUxptpYt2I uC+IKKjo1QUPohf9vwUPXuxRRD1YKC5VXKB1wbRJ/Aa+kXGcbC0O/BjI8r6892a+iVNKH44x20Zs zIlBbNcFcEEFeAnPysBt8AU6ILKJ2V4UDDoMxsAM8CnoGAIycBM0wAt4o2iUJlIGA2AKLIFVsAam mZE5ZAYP4AJcgWvwCD51IcfIYBDMgw2wA9bBAjPxLCJtZlIH5+AEnII7EKjSuZqYxwykwCHYArMs W1pPRsE4KbFsLfAKQlUeNfv88gOwCxa1DARFTATfrZCIwZ/YH9mzuKxlIRu8DfbACgXKGcu3pAm6 JGYmMqMPKayCyF4sg32wybJ5OQTMJd9HZONvwbPsjdAy8bmK/IIC+sLpB5NgDoyoOMJofF+XAuYe +7WBRU4HKDocU/nfh0gwu15HbBNRRhdwjnsI/ieO0G406UPNLoUS4wjN6Bo0ujp3a1RQJOJ7dcZp MO6Pragv8ehBE2CowHKOuLtvaJDSKGv6jlcjJA7t3ufsatZhK5EpcAzOuNs7tkxkw95ZS4924xoe FmvBA9ZeCRyBKrhnqWKbSEjfaXFuq6/hHPC6ekYeUJdaBlUKJh5aRU9H81SsaadimMdGss753Od7 lldl/bHk+lPJa4hp/15xHjv6FmAAHpWprQxoe+wAAAAASUVORK5CYII="
            transform="translate(674.996 232.655)"
          />
          <path
            className="territory, st3"
            d="M687.5 254c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 680.95 248.61)"
            className="armies, territory, st4, st5"
          >
            {getArmy("ural")}
          </text>
        </g>
        <g id="afghanistan">
          <path
            className="territory, border"
            style={{fill: getColor("afghanistan"), stroke: getStroke("afghanistan"), strokeWidth: getStrokeWidth("afghanistan")}}
            d="m707.6 296.8-.1-.2c-.7-.5-.9-1.7-1.7-2.2-.9-.4-1.2-.4-1.3-1.3s-.4-2.2-.4-2.2-1.1-1.6-1.6-1.6-2.7.5-3.2.2c-.4-.3-2.5-.1-3.3-.8s-.9-1.2-1.8-.8-2.7.5-2.7.5l-1.6-1.1s-.9-.3-1.7-.9c-.9-.5-1-1.8-1.3-2.4s-1-1.4-1.4-1.7c-.4-.3-.9-1-1.4-1.5s-1.2-.9-2-1.1-1.4-.3-1.6-1c-.2-.7 0-1.2-.4-1.3-.4-.1-1.5-.5-1.5-.5s-.1-1.5-.7-1.8c-.5-.3-1.6-1.2-2.3-1.5s-1.4-.4-1.6-1.3c-.2-.9-.5-1.2-.5-1.2s-1.3-.9-1.5-1.4-.9-1.6-.9-1.6l-1.4-1.5-1.6-.5-2-.1-.5.5c-1.1.5-.5.5-1.4.8-.9.4-4.1.4-4.2 1.6-.2 1.2-.4 1.6-1.1 3-.7 1.4-.9 1.8-1.8 1.9-.9.2-1.2 0-2.1-.2-.9-.2-2.5-.9-2.5-.9l-1.4-.2-1.2-1.2s-.7.5-1.4.9-2.3 1.8-2.3 1.8-2.5.7-3.2.7-.7-.2-1.4 0-1.9 0-2.5.7c-.5.7.7 1.4-1.9 1.6-2.7.2-2.7.2-3.4.2s-1.9 3.7-1.9 3.7 1.4 1.2.4 1.6c-1.1.4-1.8 1.4-2.3 2.1s-.9 1.2-.7 2.1 0 1.4.4 2.5 1.2 3.2 1.2 3.2.7.4.5 1.4c-.2 1.1-.7 1.6-.2 2.5s1.6 1.2 1.6 1.2l1.1 1.4s1.4-.4 1.4.9c0 1.2.2 1.8.4 3.2 0 0 1 1.4 1.7.9s1.9-1.4 1.9-2.5-.2-1.4.7-1.6 1.4-.2 2.3-.5c.9-.4.5-.4 1.6-.4s.9-.5 1.4.5c.5 1.1-.2.4.2 1.9.4 1.6.5 1.4.7 2.5s0 .7-.4 2.1-.4 1.6-1.2 1.9c-.9.4-2.7 1.2-2.8 2.7-.2 1.4 0-.4.2 1.9s.2 3 .9 3.4.9.2.9 1.2c0 1.1-.5 1.4.7 1.6s2.1-.2 2.1-.2 2.3.4 1.8 1.8-1.6.5-.9 2.1c.7 1.6.9.4 1.1 2.1.2 1.8-.5 2.3.4 2.3s2.5.7 2.5.7l.2 2.3.4 1.4s-2.3-.9-1.9.7c.4 1.6.7 1.6.7 1.6s2.3-.2 2.3 1.4-.4 2.1-.2 3 1.1.2.9 1.4c0 0-.1 1.9.8 2.5.9.5 1.8.6 2.3.4.4-.2 1.3-1.6 2.1-1.5s1.4-.4 2 .2c.6.5 1.2.4 1.7.5s.9.3 1.7 1c.8.8 1.1 1.3 1.3 1.5.2.3.2 1 .5 1.6s1.3.7 1.5.8 1.9-.2 2.4.2 1.7 2 1.8 2.4 1.3.9 1.3.9 2.7-.3 3.2-1.5c.4-1.2 2.7-2.7 2.7-3.5s0-2 .5-2.1 2.8-.9 3.6-.8 2.3.4 2.7-.5c.4-1 .3-3.8 1.8-3.9s2.4-1 3.4 0 3.7 2.5 3.7 2.5 3.7.5 4.9-.8 2.3-2.9 2.3-3.8.3-1.2.3-2.2-.9-3.7-.9-3.7-.8-1.2-1.4-1.4c-.7-.2-1.6-1.3-1.6-1.3s-.8-2.1-.8-2.9.4-4.5 1-4.6c.5-.1 2.1-1.1 2.9-1.1s2.3.1 2.7-.2c.4-.3 1.2-4.5 1.6-5.5.4-1.1.7-2 1.4-1.8.8.1 2.2 0 2.1-1.8-.1-1.8-.3-5.4-1.1-6.6s-1.3-1.4-.9-2.5 1-1.4 1-1.4l-.8-1.5z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgdJREFUeNqslktLAzEUhSdpp1Vb RlR8S8GFUreKFgQX4k8XBFFcCT5BKEofWkWrLfUx44mcQExnpjPVwEcWTe+59yY5GeEMHsKazRFY c2yAqN8kyII8cK31KvAH6IFP4EeJRYlIBi2CSTAHPAoKBlOBX0AdPIJXivpJRDJgFMyAZbAKymCW FemhKmiAc3AJbkATdMFXnIgWWALroALWQImVuMbaD1ZSBWfgEJyAW1soa7VIC2yBXbAB5tm2sD2Z AFNWOx0KdXTrskZFLlu0ToEKBceYgIjZu7wRS+3VO7jjHGSMNnlszR7YZosK/E0MOIEuuzDGNjZ5 GHpaRFehSt4EO2CFohkn2RCsJMtK7kENtFXLJBflKVJmBUVmmGZI/q/EOHP6NEqjEo/H1AvZ5KTV hMaR1oLckAJOXByZwmbSiv3qY5jh/euQltm9c/6rWGCLBIZFNDgPKxSarDTMrk6zU170FuamCQX6 kpWGbasbeg2uwIO2hBQiPu2+ymTrTP7XjdaZF+hhHo+iHHDqAv63Q2M8Age0/h+TzIQsVkFHaBE5 Q0ivMfFZ8QsFjsE+OAUtdqjPm3y+Bc8koIjDYF2LNs3wghXs802paXO03xO9cS0uUHv0xCALrM4e ca+jH3fDhfGATYNFMG6872ZSid55MeCiuhFfKqm+WERCDxIJbnfkcf8WYAC3TaxoJmGX1QAAAABJ RU5ErkJggg=="
            transform="translate(661.996 297.655)"
          />
          <path
            className="territory, st3"
            d="M674.6 319.5c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 668.078 314.087)"
            className="armies, territory, st4, st5"
          >
            {getArmy("afghanistan")}
          </text>
        </g>
        <g id="middle_east">
          <path
            className="territory, border"
            style={{fill: getColor("middle_east"), stroke: getStroke("middle_east"), strokeWidth: getStrokeWidth("middle_east")}}
            d="M652.7 343c-.2 1.1.5 1.6-.9 1.9-1.4.4-2.5 1.4-2.5 1.4s1.6 1.6-1.8.9c-3.4-.7-2.8-1.2-4.2-1.6s-1.2.4-2.3-.4c-1.1-.7-1.4-.4-1.8-1.4-.4-1.1-3-2.5-3-2.5s-.9 0-1 .9 1.8.9-.4 1.3c0 0-1.3.1-1.9.3s-1.3-.3-1.9.3-.6.9-1.5 1-.8 0-1.8.1-1.8 1-1.8 1 .3.5-1.4.4-2.3.3-2.3.3 0 1.5-1.4.5-2-1-2-1.5.6-1 1.1-1.5c0 0-.5-1.5-2.3-1.1-1.9.4-3 .3-3.4.9s-.9 1.9-1.6 1.9c-.7.1-2.7.3-3.3-.4-.5-.6-1.5-2.6-4-3.3s-4.6-1.4-5.5-.8-.1 1.4-1.9.9-3.5-1.3-4-1-2.1 0-2.1.6.8 1.6-.3 1.8-2.3.6-2.9.9-.3.5-2.5.5-4.5.4-5.4-.4-1.3-1.6-1.6-2.1-1.4-1-1.4-1h-1.3s-1.4.4-1.9 1-.5 1-1 1.4-.5.3-1.1 1-.1 1.1-.6 1.8-.9.1-1.1 1 0 .5.1 1.4.8.9 0 1.9c0 0 1.1 2.2 1.5 3.3s1.9 1.6.8 2-2.5.4-2.3 1.4 2.6 3.4 3.3 4.6.2 3.9 1.3 4.9 2.9 1.9 3.5 1.9 2.5-1.4 2.8-.1-.3 3.6.5 3.8 2.5 1 2.9.4-1.3-2.4 0-2.9 0-3 2.7-1.8 2.7 2.1 4.2 2.3 2.7-.4 3.7-.2c1.1.2 2.3 1.2 2.7 0s1.2-1.9 2.1-1.9c.9 0 2.8-.5 3.2.5.4 1.1-.5 2.3-.4 3.4.2 1.1 1.2 1.4.9 7.4s1.1 9 .2 9.5c-.9.5-2.1 2.1-1.8 3 .4.9 1.8 3.9 1.9 6 .2 2.1.9 2.7 1.1 3.7.2 1.1-1.2 1.2.2 3s4.4 2.8 4.2 4.1c-.2 1.2 1.9 1.8 2.8 3 .9 1.2 2.3 4.8 2.7 6.4s1.6-.7 2.3 1.9c.7 2.7 2.8 2.3 3.4 4.2s2.5 3.8 3.5 4.3 4.3 1.3 4 3 2.8 3.5 2.8 4.8-.3 3.8-.3 3.8-.2 0 .8 1 1.8 1.8 2 3.3 1.3 1.3 1.3 1.3 9.8-1 13-2 7.3-2.8 7.3-3.8 0-.8 1.5-1.3 2.5-2.5 2.5-2.5l1.5-1.3s.3-2 1.5-1.8 2.8 1 2.8 0-.8.3 2.3-4.8 3.5-6.8 3.3-7.8-.3-1 .8-1.8 1.5-3.3 1.5-3.3l-.5-2.3 1-2.3s1.4-3.9.2-4.4-1.1-.9-1.1-2.3-1.9-1.9-1.9-1.9 0 .5-1.4 0-3.2-2.1-3.2-2.1-1.6.7-1.8-.4.4-2.7-.5-2.1c-.9.5-1.9.4-2.5 1.1-.5.7.7 1.8-2.5 1.8s-3.9 1.1-4.6-.2c-.7-1.2-.7-1.2-1.1-2.7-.4-1.4.7-.7-.9-1.8s-1.9-1.1-1.9-1.9-.5-1.4-.5-1.4-1.2.7-1.8-.7.7-2.3-.7-3.5-1.4-1.4-1.9-2.5-1.1-1.8-1.1-1.8-1.2-.7-.7-1.4.2-.9 1.8-1.1 1.9-.5 2.7-1.1.4-.9 1.6-1.1c1.2-.2 1.4-1.2 1.9.2s.4 1.9.4 3.9-.2 3.4.4 4.4.9 1.6 1.1 2.3c.2.7.4 1.2.4 1.2s.2.2 1.1.2c.9 0 1.1-.7 1.4.2s0 .5.5 1.2.4 1.1 1.2.7c.9-.4 1.1-1.2 1.9-.9.9.4 1.6.5 1.6.5s1.2.2 1.2-.9-.2-1.6.4-2.3c.5-.7.9-2.5 1.9-.2 1.1 2.3.5 2.7 1.1 3.5s.9 1.6 1.9 1.2c1.1-.4 1.6-.4 2.3-1.1s1.4-1.1 1.4-1.1-.2-1.8.9-2.1c1.1-.4 2.3-1.4 2.3-1.4l1.2-1.4 1.1-1.4h2.7s-1.1-4.1-1.3-5.6-2-1.7-1.4-2.9c.6-1.2 1.2-2.8.3-3.7-.9-.9-2.5-1.8-2.5-3.1 0-1.2.5-1.2-.3-2.5-.8-1.2-1.2-2.6-1.2-3.4s0-1.6-.5-2.8c-.6-1.6-2.4 0-2-2.8.9-6.6.9-8.2.8-8.2l.3-2.3s-1.2-.4-1.3-.9c-.1-.4-1.3-2.1-1.8-2.4-.5-.4-2.1-.2-2.4-.2s-1.1-.2-1.5-.8-.4-1.3-.5-1.6c-.2-.3-.5-.8-1.3-1.5-.8-.8-1.1-.9-1.7-1s-1.1 0-1.7-.5c-.6-.5-1.1-.1-2-.2s-1.7 1.4-2.1 1.5c-.4.2-1.4.1-2.3-.4-.4-.1-1-.2-1-.2l-.2 1.7z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfNJREFUeNq0lltLwzAcxdu0szi7 gRfUgYg+OOarCPsCfm/BB0EcPgleXoThZSqKm7rp6lpPxgnEkNZ208CPQlty/pfkJK6TPVzjaY7E eGZOYnsvgA8CULL8KyeOwCf4AnGamE1EcNIQLIBVUKWgqwnIiXugA57BG0Xj30Q8MAuWwSaogwZY YUb6kBncg3NwCa7AAxiAUZqIzKAM1sAOaIJtsM5MSoZIxEza4AwcgRNwbQr5mliJGUiBPbALaixb Wk/mwaJRUodCfVU6X8siZImaFNhgZiJjgaj+BdpcsldDcMNnoprps8l1lqhGAS/HEpf/zLHMajHI XnXBiyyb4M8BU26wByGjzDtUP2sMss6gx0kIrR9VrqJqSg/yCIUMssGgA0eLVgnNTCjgZAUrcjpA UaEfwQrnf4Zr1vE/RpIlkvzB5BH3R6TmExZHtZpcAQG1T3pKSGgf5ea5BY/gYwKhmE7cpml2GPR4 t+pNkpunwo1UtnzPEujTs47BIV157F+epZY+Ta/CZag2rJtSIlPgAJyCJ9qMo4uMKKRsxiPCMMlE m3zI2iuBfdACdyxV4lgMcMSzoMvT7l1bJcpdB+SVh9SFlkFLO0/itB2urFu66hJ9aCvldJzoZDQv EUrMds5PdcYXubFMdVspcvfKde/6FmAARdKemBjqvq0AAAAASUVORK5CYII="
            transform="translate(616.996 365.655)"
          />
          <path
            className="territory, st3"
            d="M629.2 387.2c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 622.747 381.793)"
            className="armies, territory, st4, st5"
          >
            {getArmy("middle_east")}
          </text>
        </g>
        <g id="india">
          <path
            className="territory, border"
            style={{fill: getColor("india"), stroke: getStroke("india"), strokeWidth: getStrokeWidth("india")}}
            d="M701.4 335.5c0 .9-1.1 2.5-2.3 3.8s-4.9.8-4.9.8-2.7-1.5-3.7-2.5-1.8-.1-3.4 0c-1.5.1-1.4 2.9-1.8 3.9-.4 1-2 .7-2.7.5s-3 .7-3.6.8c-.5.1-.5 1.3-.5 2.1s-2.3 2.3-2.7 3.5-3.2 1.7-3.1 1.5c.1-.2-.4 2.3-.4 2.3s0 1.7-.8 8.2c-.4 2.7 1.4 1.2 2 2.8.5 1.2.5 2 .5 2.8s.5 2.2 1.2 3.4c.8 1.2.3 1.2.3 2.5 0 1.2 1.5 2.2 2.5 3.1.9.9.3 2.5-.3 3.7s1.2 1.4 1.4 2.9 1.2 5.5 1.2 5.6c.8.1 1.4-.9 2.1-1s3-.9 3.4.4.2 3.2.5 3.9c.4.7 2.7 1.6 2.7 1.6h1.4c.7 0 1.1-.9 1.2.4.2 1.2-.2 1.8.2 2.5s2.7.7 2.7.7 2.3 0 1.2 1.1-1.8 1.2-2.1 1.9c-.4.7-1.1.9-.2 1.2.9.4.7-.5 1.4.7s.5.9 1.1 1.6c.5.7-.4.9 1.2 1.1 1.6.2 2.1 0 2.1 0l.7-1.8s.9-1.2 1.6.2c.7 1.4 0 1.4-.2 3.2s-.4 3.5-.4 4.8-.8 1.9-.6 3.2c.2 1.2.4 2 .4 3.4s1.4.9 1.4 2.1-.2 1.6.5 2.3c.7.7 1.5 2.2 1.5 3 0 .7.7 1 .7 2.2s-.1 2.4.7 2.7 1.9.6 1.9 2 1.2 2.9 1.2 2.9.6 1.3.6 2 1.2 1.1 1.2 1.8 1.4 0 2.3 4.8c.9 4.8 1.4 1.8 2.8 5.8 1.4 4.1 2.1 5.1 3 5.1s1.9-.4 2.1-1.2 0-.9.9-1.2c.9-.4.7-.2.9-1.2s-.7-1.2-.4-1.9c.4-.7-.5-2.1.9-2.1s2.5-1.2 2.5-1.2-.5-.7-.5-1.6-.7 1.8 0-2.1 1.1-4.6.9-6.9c-.2-2.3-1.1-1.2 0-4.2s1.6-1.6 1.6-3.9 1.1-4.8 1.2-6.2c.2-1.4.7-.4.7-1.9 0-1.6-.9-2.5.2-3.5 1.1-1.1 2.5-1.4 2.5-2.7v-2.7c0-.9.4-2.7.4-2.7s2.3-.2 1.8-1.2c-.5-1.1-.4-2.3 0-3.2.4-.9 1.4-4.6 2.9-3.6s2 1 2 1 1.4-1.4 1.3-2 .5-1.8.5-1.8.3-1.8.8-1.9 2.9-.3 2.9-.3-.4-3.8.5-3.9 1.4.1 1.6-.9 1-2 1.5-2.2.7-2.6.7-2.6l1.8-.6s.5-3.9 1.2-4.6 1.7-2.5 1.7-2.5-2.5-7-2.9-7.4-9.8-.5-9.8-.2c-.1.3-1.2 1.8-1.6 1.8-.5 0-1.7-1.3-1.7-1.3s.4-3.6.1-4c-.3-.4-2.9-1.4-3.2-1.2s-.9 2.2-1.4 2.2-3.7-1.8-4-3 .6-1.2-.8-1.3-.3 1.4-2.4.9c-2.1-.5-2.3-.8-2.6-1.1s-1.2-1.5-2.3-1.5-3.2-1.2-3.4-1.5c-.2-.4-.5-.8-.8-1.2s-.3-1.7-.8-2.1-2.1.9-2.5 1-1.7-.5-1.5-1.2c.2-.8.6-1.8 1.1-2s1.4-1 1.5-1.5.4-.8.5-2c.2-1.2-.5-4.1-.7-5s-.2-3.8-.2-3.8.1-1.1.1-1.4.2-1 .2-1-1.4.4-1.7.5-3.4.1-3.7.1-2-.9-2.1-1.2-.2-2.1-.4-2.4-.2-1.4-.5-1.1l-1.4 2 .1.2c-2.2.2-3.3-.1-3.4-.3z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiVJREFUeNq8ll1PE1EQhvejdW0L xGgFVKIx0QRvIeoF8YLwy73RKzDRxBAhGlERkRptqFA+dn1P8pxmONB2WwmbPDkNZ5l3Zs7M7Imj ck8crEWwlvrnfnueqrgmKuydiCNxjFAxSLCfSILh63BDTIsp9ttiV/wWh+AE87IiqaiJ2+Iext36 iN8RApviG7/d+lMcIFQMEvECc2JBLIoHCM4EkfzA8GexJt6KbbEfRpUGKaoj8EysiCXxhL/dEpOi gVhT3EF80pyXi6ZrRSomoirpcBEsi+cYr+FAbCJPKQQnOAFNk85DiuPUiiS8+BDjiwg02OtXeT76 uyLjLFzKvou//nxSE8WseCpeiMekJC3ZBik2nGhH7IgWaSu8lxki8+I+USVR+ScmfU0cdJV4k0zF iYlkylRQdUij9uutBk7O43QWGW9tV48jEA1yNhlhzIwidMbZJLqC57JFCrrdDs9zIsUlCPiR0/ZC SfBCd9A0HfLk9MiWWKdXuj4SL/DHTNWDEYW8jRbT2fGL0dLreDvL6pRf3TdTCYFT0uMieCneiD1E emPDe9Jhzej6WjBa4sB4ziG3SdOqeC0+mdnVG5A5KfpqDOUITiOWmdq3TrX4prwXr8RHvinnRn1E yE7oC0ZOyGv40aqw1+bdDfFOfEBg15bvOJ/fGbr5iDJdR2SLiPYvqs5xLhI2kh2i7Rjjxf9eicIz 6SKYj3MlGna5G+mC90+AAQDqzqm2iPXrfQAAAABJRU5ErkJggg=="
            transform="translate(704.996 376.655)"
          />
          <path
            className="territory, st3"
            d="M717.2 398.9c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 710.736 393.493)"
            className="armies, territory, st4, st5"
          >
            {getArmy("india")}
          </text>
        </g>
        <g id="siam">
          <path
            className="territory, border"
            style={{fill: getColor("siam"), stroke: getStroke("siam"), strokeWidth: getStrokeWidth("siam")}}
            d="M788.4 388c-1.9-.4.4-1.9-3.3-2.4s-3.4 9.1-3.1 10.1 1.3 1.5 3.5 1.3 1.8 0 2.3 2.3-.3 4-.3 4 .8-.3 2-.8 3 .8 3.8 4.3 1 3.5 2.3 5.5 1 3 1.5 5.8-.5 6-.8 7.8-3.5 5.3-3.5 6.3-3.3 3.5-3.5 4.5-1.5-.8-1.5-.8-1.3-3.5-1.8-4.5-1.3-1.5-1.3-1.5l.3-2.3s-1.3-.8-2.3-.8-1-1-1-1l-2.3-1.8s-.3-.3-1.5-.5-1 0-1.3 1-.8 1-2 2.3.5.8 1.8 2 .8.8.8 2.8 0 2.8 1.8 7.5 1.5 1.8 1.5 1.8.5.8.5 2-1 1.3-1 1.3-1.8.3-3.3 0-.5-.5-3-3.8-2.5-3.5-3.5-4.3.3-1.8 0-3 0-3-.8-4-.8-1.5-1.3-3.3 0-3.3.3-4.8-1.3-1.8-1.5-3.8-.5-1.8-.5-1.8-4.5-2.8-5.3-1.8-2-2-2-2-3.3 1-3.5-.5-6.8-8.3-7-10-.3-3.5-1.5-3.8-2.1-3-2.1-3l-.9-2.1c-.3-3.4.2-3.6.5-3.9.9-.1 1.4.1 1.6-.9s1-2 1.5-2.2.7-2.6.7-2.6l1.8-.6s.5-3.9 1.2-4.6 1.7-2.5 1.7-2.5c.7-.9 1.1-.4 1.1-.4l1.2-.9s.7-1.2 1-1.7.5-.6 1-.5.8 1.1 1.6 1.5 1.2.5 1.5.8.5 1.8.8 2.7c.3.9.5.7 1.5 1.2s.4.7.3 1c-.1.3 1.4 2.3 2.2 2.2.8-.1 2.2 2 2.8 2.6.5.6 2.3.8 3.3.7 1-.2.7-1.5.7-1.9s.7-1.9 1.1-2c.4-.1 2.3 0 3.2-.2.8-.2.5-.7.5-.7s1.1-.9 1.2-1.4.8-1 1.1-1.2 1.1-.1 1.5 0 1 1.2 1 1.2 1.5.2 1.8.2c.4 0 .7.8.7 1.5v1.5c0 .5.8.6.8.6s.5.1.7.5c.2.5.2.6.6.6.5 0 .5.8.5.8s1.5 1.4.9 1.7.7 2.7.7 2.7z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAi9JREFUeNqslt9r01AYhpMs6aYt RevmpuhUUJkX3ohjV975j4vgzXRXu1AUxKG4H8xtVVfbronvJ8+Rw2lM0+CBhwNN8r7n+07znsRR vREHs40imGc+XHU9EalYFBm/mfBYjJgLj9omTtxE26In1kQXwwvRF4fiVPwCM8zrmDjxjrgm1sUD sSFWRYsKDsQH8QUzm4/EQEyqTBbEJXFd3BMPxWNMbpdUcoDwJ/FG7IjPoVEaVGAGt8QTsSUeiTtU 1A725CotHLCInqdnRueudalXUUYFZvBcPBU3aFvGIuJgUS3M3QIiqhzRPpuL1HugQ4u2MLgrLpeI +612f5A2HfDbeMafYrLgVWGlb4pnlN9lj+Ka71Hq7Zft01fx3VqWcNMiJhv8mzqscJ7hurGOzhq6 f1uRsfJV5qxmBWE1pTpJcEOroUFUpZPMGTPRnFkXRQ363miEJsV/0i3KTMpStan4lE7iXXAvUb+h 0T91XCVDsS/eij3xoyyyZ4yc5/bQ2Uf3zxvtryQjDJeJitSLj6oKcgLRgnFbvBIfXUj6JhMwwSVy Ky2JljgQH9EaM3gtXopdcUzETFViD/wkvsfuJsTyoDVjssm1eRuDHXJr6PY1NJlgcMJpd0SaniF4 wT3nXH/H6l/Qol0MBv6iZh2/Pc6UFXFT3OfMiTCxCt6z2cds/NQ5P+tDImV/jCsYdLmnT6u+0WIn XjT5JIqD4Eu9E3DInFe9V3GD0Ivn/bj7LcAAg0yyK2ZCJggAAAAASUVORK5CYII="
            transform="translate(761.996 392.655)"
          />
          <path
            className="territory, st3"
            d="M774.6 414.8c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 768.055 409.366)"
            className="armies, territory, st4, st5"
          >
            {getArmy("siam")}
          </text>
        </g>
        <g id="china">
          <path
            className="territory, border"
            style={{fill: getColor("china"), stroke: getStroke("china"), strokeWidth: getStrokeWidth("china")}}
            d="M802.1 324c-1 .5-.1.5-.1 1.1s.9.3.9 1.1.3.8.8 1 .1.8.1 2.1.1.6 1.1.9.5.4.8 1.9 1 .5 1.5.5.5.3.9 1 0 .5-1.3 1.3 1.3.9 2.6 1.3.9 2 .6 3.4.6 1.1 1.5 2.6.1 2.4-.9 4.8.5 1.6 1.6 1.8.9 3.4.1 5 .1 1.5.1 3.6-.4 2.5-.6 4.1-.4 1.4-1 2.4-.3 2-.3 3.6-1.6 1.6-2.8 1.9-.6.1-.5 1.3-.5 1.4-1.5 2.4-.5.3-1.1 1.9-.1.9-1.5 2.1-1.4 1.9-1.4 1.9 0 1.1-.3 2.4-1.1.3-1.6.1-1.4.6-1.8 1.4-1.9 1.1-3.1 2.4.1.3.5 1.1-.9 1.5-1.5 2-1.1 1.8-2.1 2.4-1.8-2.1-3.4-2.5c.3-.1-1.6-2.1-.9-2.4s-.9-1.7-.9-1.7 0-.8-.5-.8-.5-.2-.6-.6c-.2-.5-.7-.5-.7-.5s-.8-.1-.8-.6v-1.5c0-.8-.3-1.5-.7-1.5s-1.8-.2-1.8-.2-.6-1.2-1-1.2c-.4-.1-1.2-.2-1.5 0s-1 .8-1.1 1.2-1.2 1.4-1.2 1.4.4.5-.5.7c-.8.2-2.8.1-3.2.2s-1.1 1.5-1.1 2 .3 1.8-.7 1.9c-1 .2-2.8-.1-3.3-.7s-2-2.7-2.8-2.6-2.2-1.9-2.2-2.2c.1-.3.6-.5-.3-1s-1.2-.3-1.5-1.2c-.3-.9-.5-2.4-.8-2.7s-.8-.5-1.5-.8c-.8-.4-1.1-1.3-1.6-1.5s-.7-.1-1 .5c-.3.5-1 1.7-1 1.7l-1.2.9s-.4-.5-1.1.4c0 0-2.5-7-2.9-7.4s-9.8-.5-9.8-.2c-.1.3-1.2 1.8-1.6 1.8-.5 0-1.7-1.3-1.7-1.3s.4-3.6.1-4c-.3-.4-2.9-1.4-3.2-1.2s-.9 2.2-1.4 2.2-3.7-1.8-4-3 .6-1.2-.8-1.3-.3 1.4-2.4.9c-2.1-.5-2.3-.8-2.6-1.1s-1.2-1.5-2.3-1.5-3.2-1.2-3.4-1.5c-.2-.4-.5-.8-.8-1.2s-.3-1.7-.8-2.1-2.1.9-2.5 1-1.7-.5-1.5-1.2c.2-.8.6-1.8 1.1-2s1.4-1 1.5-1.5.4-.8.5-2c.2-1.2-.5-4.1-.7-5s-.2-3.8-.2-3.8.1-1.1.1-1.4.2-1 .2-1-1.4.4-1.7.5-3.4.1-3.7.1-2-.9-2.1-1.2-.2-2.1-.4-2.4-.2-1.4-.5-1.1l-1.4 2 .1.2c-1.9 1-3 .6-3.1.4 0-.9.3-1.2.3-2.2s-.9-3.7-.9-3.7-.8-1.2-1.4-1.4c-.7-.2-1.6-1.3-1.6-1.3s-.8-2.1-.8-2.9.4-4.5 1-4.6c.5-.1 2.1-1.1 2.9-1.1s2.3.1 2.7-.2c.4-.3 1.2-4.5 1.6-5.5.4-1.1.7-2 1.4-1.8.8.1 2.2 0 2.1-1.8-.1-1.8-.3-5.4-1.1-6.6s-1.3-1.4-.9-2.5 1-1.4 1-1.4c-.1-.2-.2-1.5-.3-1.6.6.4 1.1 0 2.3-.2s.5-1.1.7-1.5-.1-1.3-.4-2c-.3-.7 0-.7.3-1.2s1.8-1.5 2-2.1.2-3.8.2-3.8 3.2-.4 3.8-.8c.7-.3 0-4.6 0-4.6l2.5-.2c-.2.7.2.8.8.9s.8.5 1.4 1.6 1.2.4 2.8.7c1.6.3 2.8-1.5 3.5-1.8.7-.2.8.8 1.7 1.7s.9 1.3 1.7 1.5 1.1 1.2 1.5 2.1c.5.9.1 1.7 0 2.5s-.9 1.1-1.6 2.4c-.7 1.3.7.8 1.4 1s.6.9 1.4 1.4.9-.5 1.8-1.2.5 1 1.1 1.3 1.4.8 1.9.6c0 0 1.1 1.9 1.8 2.1.6.2 1.1 6.5 1.1 6.5s1-.6 1.2.2c.3.8.6 2.1.6 2.1s1.3.8 1.3 1.2c0 .4-.1 1.5.3 1.7.4.2 1.8.8 1.8.8l.4 1.3s.2 1.1.7 1.2.8-.1 1.5.3.9.4 1.5.4.9-.1.9.4-.1 1.4.3 1.5c.4.1 1.2.2 1.2.2s.3.5.6.9c.4.4 1.4.4 1.6.8.2.4.3 1 .4 1.3s-.3 1.1 1.1 1.2c1.3.1 9-1.1 9-1.1l.5.9s.5.5 1.1.7 1.8-.3 2.7.2c1 .4 1.8.7 2.2.7h1.3s.3 1.2.7 1.3 2.2-.6 2.2-.6.4-.5.9-.4.6-1.1 1.6-1.2 1.5-.1 1.9-.1 2.5-1.1 2.6-.2.2 1.4.6 1.9 1.7.9 2.1.9c.4 0 1.4-.6 2-1s.9-.7 1.7-.5 1.6.7 1.9.9c.4.2.5.2 1.6.5s2.5.3 2.5.3 2.6.3 3.5.5c2.2.6 2.9.5 3.4.3z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh5JREFUeNqslktLw0AUhZOYWB9V QUUraNWFUhduRHHlzv8tiAii6EZQpCIUn63PVqu2JvFcOQPDdPpIcOBjaGdyz9w7kzNxnd6aa/Sx 0ff0cKdxD/ggw17aD2iAJoXiToJul+ABGAbjIAdGOV4FZfAKvogIRzYxm4gKngUTIA+WQAFMcY4I FMEtqIA78AzemV3USaQPDDLYIlgGqxSZMzJ5AI/gGpyDC3DFBXyC0CYiGQyBWbAGNsEKmGdGw8ae fLNMUrISOAMH4JjCdZWRr4kFzEAEtsE6mGHZAi7C1TLu59gYFyF7NsJxORQ37GNfyyLLEm1SYIGZ eZayutp/ag8z/F1jKd+YZdinZSEr2QBb3INRrjjJMfdZSnUYRDDyODFDkQJPU5YPJmmqGnnGyans PC0TWfk0+6CHDGwZWeN4xoT+lAJOpzheQptxEnqd46Soe6pmisT/FDe2icT0HN1Z0wZvieNpA8qP qimF2sZRmYgP3dPoSnTTKKFIxOdKjHPPuH9vtL6SgD40qRmi28Opi2iIYoyHYJ+O/GeSukhIJOAA fcvXrMUUU7dhaAjsglPwRItpyUQ27IP3QZOTlDfpRhlxbp21F8c9Ajvs71iq2CYSUuCFl0+Fog2O q3ukxvFL1v8E7FHgmjGitNfvNC2jwRNUZBZl9hXzVkz7IaHs3PYx0bSdyqSfRMr0bC9d288iN6Hh uRbr6PrS/gowAJ11tWyCVsjyAAAAAElFTkSuQmCC"
            transform="translate(747.996 331.655)"
          />
          <path
            className="territory, st3"
            d="M760.6 353.8c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 754.098 348.43)"
            className="armies, territory, st4, st5"
          >
            {getArmy("china")}
          </text>
        </g>
        <g id="mongolia">
          <path
            className="territory, border"
            style={{fill: getColor("mongolia"), stroke: getStroke("mongolia"), strokeWidth: getStrokeWidth("mongolia")}}
            d="M737.1 273.6s.7 0 1 .9 1.2 2.4.3 3.5c-.8 1.2-1.5 3.3-.6 5.4s2.5 2.3 2.4 3.5c-.2 1.2-.4.9-.5 2.6-.2 1.7.2 2.8-.2 3.5-.2 1-1.1 2.1-1.1 2.1s1.1 1.9 1.8 2.1c.6.2 1.1 6.5 1.1 6.5s1-.6 1.2.2c.3.8.6 2.1.6 2.1s1.3.8 1.3 1.2c0 .4-.1 1.5.3 1.7.4.2 1.8.8 1.8.8l.4 1.3s.2 1.1.7 1.2.8-.1 1.5.3.9.4 1.5.4.9-.1.9.4-.1 1.4.3 1.5c.4.1 1.2.2 1.2.2s.3.5.6.9c.4.4 1.4.4 1.6.8.2.4.3 1 .4 1.3s-.3 1.1 1.1 1.2c1.3.1 9-1.1 9-1.1l.5.9s.5.5 1.1.7 1.8-.3 2.7.2c1 .4 1.8.7 2.2.7h1.3s.3 1.2.7 1.3 2.2-.6 2.2-.6.4-.5.9-.4.6-1.1 1.6-1.2 1.5-.1 1.9-.1 2.5-1.1 2.6-.2.2 1.4.6 1.9 1.7.9 2.1.9c.4 0 1.4-.6 2-1s.9-.7 1.7-.5 1.6.7 1.9.9c.4.2.5.2 1.6.5s2.5.3 2.5.3 2.6.3 3.5.6c.4.3 2.3.9 3 .9 1-.5.9.5 2.3-1s.5-.3 1.9-2.3 3.6-2.3 1.1-2.5-2.1.5-3-.4-.1-1.1-1.6-1-1.5.4-1.9-.1.8-.9-1.1-.9-1.3.8-2.8-.1-1.6-.5-1.5-1.5.1-1.9 1.1-2.1.8 0 1.4-.5 1-.6 1-1.4 1.4-1.1 1.8-2.1.4-2.5 1.1-2.5.8-.1 1.4 1.6-.9 2.5.9 2.6 2.8.3 3.5.1.3.1 1.1 1.1.8 1.5 1.6 2.1 1 1.8 1 1.8 0 .6 1.1.4 2.9-.3 2.9-.3-.5-.6.1 1.5 1 1.6 1 3.5-.9 2.9 0 3.5 1.9.9 1.9.9 2.6-2.5 2.9-3.6 1-1.5.9-2.4-.4-.3.1-1.4.5-3.1.5-3.1-.5-.1-1-.4-.8-.1-1-1.5.3-1.4-.6-1.8-1.3-1-1.5-1.8-.1-1.3-.8-1.4-.5-.3-1.9-1.3-1.1-.5-2.1-1.1-1.3-1-1.3-1.9-.3-1.1.4-1.8 1 .8 1.1-1.5-.6-2.4.5-4.6.9-3.1 1.8-3.9c.6-.4.4 0 2.1-1.8.1.1.1.1-.9 0s-1.1-2-2.4-2.1c-1.2-.1-2-.8-2.3-1.8s-1.1-3.8-3.1-3.7c-1.9.1-2.3-2.5-4.1-4.6s2.1-1.9 2.1-2.7c0-.7-.3-.1-.5-2 0 0-.9.9-2 .6s-1.9-.7-2-1.6-1.3-1.3-1.3-1.3-1.6-.1-1.6-.6-.3-.9-.5-2.4-.1-1.9-.7-1.9-1.4.1-1.6-.1-.6-.4-.6-1.3-.1-1.6-.5-1.8-1-.4-1.4-.4-1.6.3-1.8-.3-.3-1.2-.1-1.7.3-.8.3-1.3-.3-1.4-.3-1.4-.4 0-.9-.4-.4-.9-1.1-1.1-1-.3-1.6.3c-.6.6-.9 1.2-1.3 1.3s-2.2.3-2.8.3-1.6-.4-1.6-.4l-.4-.5s-.9-.3-.9.1.3.8 0 1.3-.1.5-.8 1.1-1.1.7-1.2 1.1-.1.6.3 1.1.6.3.8.9.3.7.3 1.3.1 1.5-.4 1.9-.6.3-.9 1.1-.6.9-.8 1.3-.4.6-.1 1.3.8 1.3 1 1.6.6.8.3 1.6-.3 1.3-.8 1.8-.9 1.6-1.3 2-.3.9-.9.6-1.1-.9-1.1-1.1-.1-.5-.3-1.3-.4-1.7-.6-1.9-1.7-1.1-2.1-.3-.3 1.5-.9 1.8c-.6.3-.8.3-1 .7-.3.4-1 1.5-1.6 1.4s-.7-.3-1.6-.4c-.9-.1-1.7-.4-2.1.1-.4.6-1.4 1.4-2.1 1.1s-1.6-.8-1.9-1c-.2-.2-1.6-.8-2.3-.8-.7.1-.7.3-2.1.2-1.4-.1-2.7-.6-3.6-.6-.9 0-3.2-1.1-3.9-1s-.6.1-1.3.4c-.8.3-1.3-.2-1.6.4-.3.5-.3 1.3-1.2 1.1-.9-.1-1.4-.1-1.8-.5-.4-.4-.6-.9-.6-.9s-.6-.2-.9-.1c-.4.1-1.3 0-1.3 0s-.8-.8-1-.8-.9-.5-1.2-.4c-.3 0-1.6.3-1.6.3s-1.8.6-1.5 1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfNJREFUeNrElk1PwkAQhulSWj6M QROq0Rov+Ackcjf+b07e/Dh64mIAo5BUQhT5bJ1N3kkmEyClGGzyZNvu7rw7s7PTOrn0l6PaRLWp Jm/qZwqER7joWxAzYg6xZJPoJiED40VQJQLiEP0jok8MiQmwovE2QnmiRNSIcwjYto77HETaRA/3 th0QP8QyjRCLhMQ10SAuIXqiPPqA8VfiiXgmuqvE3DUiF8QNcQuxAO99MeeIOIXRK+IYfXbxHS3m qj1hT6zIHdoQ741IDF6UTY4KKGAMZ6L1bMx7lhch9LDCJkSa8KyCcY4KNT9z0pSJA9xbbyIp5IpJ Ray+gXCFmGxSHBODsSEyL0L4Ik5/o4QCbHwgwpX24tBLG0WOghGH0Z6TM2TXtiJarAZbVdh22JiH FdSRwn6KqrHuXPqwwWfOkx65OB988t0dhFbayhKeTJdBzi9E7RrhOclgb60t9mgmapctK9MdhKaw 0YbNmfRojir8JgpjnEEoxtwBbA31OUpQ5vsokP0MYiwibUw4MnnldoJ3ZWRMOWUGxig3tr49EvfE C/HJhVULWTe/0fqoXSU1zlELWwqRB6IFsXe511poCfe/MKgAIUeFMcZixsisHoy3INbVodffIxbq iFSN/uLD96+f8r3+nOz1d+tPfyB/BRgA7iG4YBgQqbsAAAAASUVORK5CYII="
            transform="translate(766.996 282.655)"
          />
          <path
            className="territory, st3"
            d="M780 304.8c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 773.533 299.42)"
            className="armies, territory, st4, st5"
          >
            {getArmy("mongolia")}
          </text>
        </g>
        <g id="irkutsk">
          <path
            className="territory, border"
            style={{fill: getColor("irkutsk"), stroke: getStroke("irkutsk"), strokeWidth: getStrokeWidth("irkutsk")}}
            d="M807.4 271.6c.3 1.9-.1 1-.1 1s-.9.9-2 .6-1.9-.7-2-1.6-1.3-1.3-1.3-1.3-1.6-.1-1.6-.6-.3-.9-.5-2.4-.1-1.9-.7-1.9-1.4.1-1.6-.1-.6-.4-.6-1.3-.1-1.6-.5-1.8-1-.4-1.4-.4-1.6.3-1.8-.3-.3-1.2-.1-1.7.3-.8.3-1.3-.3-1.4-.3-1.4-.4 0-.9-.4-.4-.9-1.1-1.1-1-.3-1.6.3c-.6.6-.9 1.2-1.3 1.3s-2.2.3-2.8.3-1.6-.4-1.6-.4l-.4-.5s-.9-.3-.9.1.3.8 0 1.3-.1.5-.8 1.1-1.1.7-1.2 1.1-.1.6.3 1.1.6.3.8.9.3.7.3 1.3.1 1.5-.4 1.9-.6.3-.9 1.1-.6.9-.8 1.3-.4.6-.1 1.3.8 1.3 1 1.6.6.8.3 1.6-.3 1.3-.8 1.8-.9 1.6-1.3 2-.3.9-.9.6-1.1-.9-1.1-1.1-.1-.5-.3-1.3-.4-1.7-.6-1.9-1.7-1.1-2.1-.3-.3 1.5-.9 1.8c-.6.3-.8.3-1 .7-.3.4-1 1.5-1.6 1.4s-.7-.3-1.6-.4c-.9-.1-1.7-.4-2.1.1-.4.6-1.4 1.4-2.1 1.1s-1.6-.8-1.9-1c-.2-.2-1.6-.8-2.3-.8-.7.1-.7.3-2.1.2-1.4-.1-2.7-.6-3.6-.6-.9 0-3.2-1.1-3.9-1s-.6.1-1.3.4c-.8.3-1.3-.2-1.6.4-.3.5-.3 1.3-1.2 1.1-.9-.1-1.4-.1-1.8-.5-.4-.4-.6-.9-.6-.9s-.6-.2-.9-.1c-.4.1-1.3 0-1.3 0s-.8-.8-1-.8-.9-.5-1.2-.4c-.3 0-1.6.3-1.6.3s-1.9.1-1.6.6c-1.7-.6-.6-.5-1.7-.9s-.3-1.4-.9-2.9c-.6-1.5-.9.3-.9.3s-1.2 0-1.7-1.8.3-.9.6-2.5c.3-1.5-.5-1.4-.5-3.2 0-1.8 1.1-1.1 1.1-1.1s.3-1.7.5-4.5-1.4-.8-2-2.2 0-1.2.3-2 .8-1.2 1.7-2.8c.9-1.5.6-.8 2.9-1.2 2.3-.5 1.4-2.6 3.2-3.2 1.8-.6.6-.3 1.8.9s1.8-.3 3.4-.6c1.5-.3 1.2-1.2 3.4-.9s1.2.6 1.8 1.8 1.5 1.2 3.4-.9c1.8-2.2.3-8.3-.9-11.7s2.9-11 2.9-11 4.9-1.5 6.1-2.3 1.1-.9 1.5-2.6.5-4.6 1.9-4.9 1.1 1.8 1.1 1.8c.1.8 1.5.5 3 .8 1.1.2.6-.8.4-1.7-.1-.4-.1-.8 0-1.1.4-1 12.3.1 12.3.1-.4 1.1-.4 2.5-.1 2.9.3.4 1.4 2.9 1.1 4.9s-.9 8.1-.6 9.3c.3 1.1.4 4 1.1 4.8.8.8 1.1 1.4 1.5 2.1.4.7 4 1.9 4.6 3.4s.3 1.9 1.3 2.5c1.1.6 2 1.9 2.1 3.2.1 1.2.1 3.1 1 2.8s1.9-1.5 2.2-1.9c.4-.4 1.7-.8 2.8-.4s1.4.4 2.6.3 2.2.2 2.2.2.9 1.3 1 2-.4 1.2 1.1 1.1c1.6-.1 1.9-.2 2.1 1.6.2 1.8 1.1 2.7 1.1 2.7s.3 1.9.2 2.3-.7 1.5-.4 2.7c.3 1.1.9 2.3.4 3.1-.5.8-1.4 2.6-1.4 3.3s-.2 2.6 0 3.2c.5.6-.2.2 0 2.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkBJREFUeNqslt9PE0EQx+9Xi4Kg KbYWRUwMGH0w8UEffNP4f+OLbxp9MDFGiAlSFWhQMCi0R3t+N/ksmWzu6BXd5JNNr3vz3ZnZmds4 qjfiYPajCOaJBs77PxGZmBEN844znouBOBXj8wTjCQLO8Jxoia5YQDTC+C+xI36I3wiXCpYJWYHr YkWsifviBp5FeLIrPooN8UXsiyMjWCnkfjfFIsYfiIfinriNRw3W5ni0jdB78Ul8Fnvi2IqlgVCK MSfwQjwXj8Vd0ea/WXEZj+fZlAvrEiF2xg/FHyuUBSFzBm7ixRPmFl4mJREI87jI8328PRAj65EP WRcPnolH5ORShYg9NCm5m8Fwn0NyFAol7GqNcD0Vy0akTpnE2Is5gd/xzB2aIjELndGOuMNcV8SK NQjfKrRIT5yYBdfIT5tcTSMSBZFZoRy6vhy8sSZerJpaiS8g5De9gB1fDmceZTzsmOq/iFBk7DWt nST6/6OgPQ2ZCy9UmL61x3xapyNXiPiOscuc21M3RGSTBYN/EPI9cBObQ+tRThV/o9iOw6ZYc4x5 t4+tg9AjJ3bCDrbKmuIUItbGiY9MGrhd8GzWNNA6J3BME+2JN+KV+CB+hi3IJtJ/wFwtXaF402Az lpEReS3WEduxuc5KXO8ZD8Yks2O+Q+HICdM78RKxXhj6LHhpxIJtc+xdY7xF7ysbLg9fxVvwIqM6 d4aUkLURuVqRK7+ZQ8T6ZSKTbkH+oxbefqqKdFB2V5jmulVn3cT73V8BBgAs07RqUI6xDQAAAABJ RU5ErkJggg=="
            transform="translate(755.996 239.655)"
          />
          <path
            className="territory, st3"
            d="M769 261.6c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 762.543 256.238)"
            className="armies, territory, st4, st5"
          >
            {getArmy("irkutsk")}
          </text>
        </g>
        <g id="ukraine">
          <path
            className="territory, border"
            style={{fill: getColor("ukraine"), stroke: getStroke("ukraine"), strokeWidth: getStrokeWidth("ukraine")}}
            d="M580.4 188.3c-1.2-.1-2.1-.4-2.1-.4s.9 4 .3 4.5.8 3.6 0 4.1-1.1 6.3-1.1 8.9 1.4 6.8 1 8.9.6 5.1.6 5.1.6.6.6 2.3.9 2.5.9 2.5.4.1.5.7.1 1.4-.2 1.7-.8.7-.8 1.6.3 1.3-.1 1.8-.6.6-.7 1.6-.3 2.5-.1 3.1.7 2.7-.2 2.4 1 .4 1.5.8-1.1 1.1-2 1.4-1.6.3-2.9.1-.9-.4-1.9-.3-3.1.8-4.3.5-1.8-.1-2.5.4-.3 1.5-.3 2.6.8.4.9 1.6.4 1 .8 1.8 1 .1 1 .1 2.1 1.8 1.9 2.9.5 1.9.5 2.9-1.1.3-2.8.1-.6-.9-1.3-2.6-.5-.6-1.5-1-1 .3-1.3 1.4-.4 1.3-1.3 2-.1 1.4-.4 2.5-.6 1-1.4 1.9.3 1.4.6 2.6.9 1.8.9 1.8c.5.5.4 1 .4 1.8s-.5 1.1-1 1.5l1.3.1s1.1.9 1.1 1.3 1.2 1.3 1.2 1.3 2.5 1.4 3.4 1.4 1.9-.6 2.4-.6-.1.9-.1 1.2.7 3.3 1 3.9.4 8.1.4 9.4 1.4 2.8 1.8 3.1.6 1.1.6 1.4-.8 1.4-.9 1.8.1 1.2.1 1.8-.5.8-1 1.3-.4 1.4-.7 2.1-.8.6-1.4.9-2.3 3.6-2.5 4-1.9 1-2.5 1-2.1.4-2.3.9-.2 1.5-.2 1.5l2.3 2.2c.3-.1.5-.8.8-1.2s1.2-.4 1.2-.4 1.6-.1 2.3.4.3.8.3 2.1.1 1.1.3 1.7.5.4 1.6.7.8.2 1.6.3.7.8 1.1 1.7.5 1.6.9 2.4.4 1.3.4 1.6-.3 1.5-.4 2.2-.4.8-.5 1.1-.1 1.2-.1 1.5.4.8.8 1.2.4.8.4 1.5-.6 1.8-.6 2.4.9 1.1.8 1.6 2.2 2.3 2.2 2.3l1-.8s1-.1 1.8-.9.5-1.1.5-1.1.3-2.4.6-2.9.9-.3 2.5-.6 1 0 1.8 0 1.3.5 2 .8.6.8.9 1.8.5 1.6.6 2.5.1 1 .5 1.9.8.8 1.8 1.4.4.5 1.9 1.3.8-1.1 1.3-2 .8-.9 1.3-1.1.9-.5 1.5-1 .4-.5.8-1.4-.1-1.3-.4-1.8-.8.1-1.4.1-1.4-.8-2-1.5-.1-1-.1-1 .9-1 1.8-1.6.8-.5 1.5-.8 1.3-.3 1.9-.5 1.1-.4 2.4-.6.8 0 2.1 0 1.6-.3 1.6-.3.4-.5 1-.9.9-.1 1.3.4-.3 1.3-.3 1.3l-1.5 1.5c-.9.9-1 .4-2.6.6s-.5.3-.6 1.1-.8 1.6-.8 1.6l-.5 1.3.9.5s.4.8.6 1.8.8.4 1.4.6-.1 1-.1 1.8 1.1 1.4 1.8 2 .4.9 1 2 .5-.4 1-.6.8-.3 1.9-.4 1.3.1 1.3.1l-.6 1.5s.8.5 1.6 1.4.3 1.6 1.4 1.6.8.5 1.3.9 1 1 1.9 1.8.8.5 1.5.6.4.1.8 3 .8.3.8.3-.3.8-.6 1.3-.9.8-1.4 1.3-1.1 1-1.1 1.5.6.5 2 1.5 1.4-.5 1.4-.5.6-.4 2.3-.3 1.4-.4 1.4-.4.8-.9 1.8-1 .9 0 1.8-.1.9-.5 1.5-1 1.3-.1 1.9-.3 1.9-.3 1.9-.3c2.1-.4.3-.4.4-1.3s1-.9 1-.9.8.1 1.3-.4.8-.8.8-1.4-.6-1.6-.6-1.6-.9-.6-.9-1.4.1-1 .4-1.5 0-1.4 0-2.9 0-1.6.1-2.6.8-.5 1.5-1-.3-1.8-.3-1.8-.5 0-1.6-.4-1.6-.4-2.4-1.9-.4-1.1-.5-1.8-.8-.9-.5-2.4-1-2.9-1-2.9l-1.1-.4s-.7-.4-.9-1.1.2-.9.4-1.9c.2-1.1-.5-2.1-.5-2.1l-1.2 1.1s1.8-2.8 1.9-3.7c.2-.9 0-1.1.4-1.8s.7-.5 1.8-.9 1.4-1.1 1.4-1.1.5-1.4.4-2.8c-.2-1.4-.4-1.9-.4-3.2s-1.4-.9-1.4-.9l-1.1-1.4s-1.1-.4-1.6-1.2c-.5-.9 0-1.4.2-2.5s-.5-1.4-.5-1.4-.9-2.1-1.2-3.2c-.4-1.1-.2-1.6-.4-2.5s.2-1.4.7-2.1 1.2-1.8 2.3-2.1c1.1-.4-.4-1.6-.4-1.6s1.2-3.7 1.9-3.7.7 0 3.4-.2 1.4-.9 1.9-1.6 1.8-.5 2.5-.7.7 0 1.4 0 3.2-.7 3.2-.7 1.6-1.4 2.3-1.8 1.4-.9 1.4-.9l1.2 1.2 1.4.2s1.6.7 2.5.9c.9.2 1.2.4 2.1.2s1.1-.5 1.8-1.9.9-1.8 1.1-3c.2-1.2 3.4-1.2 4.2-1.6.9-.4 1.1-.7 2.1-1.2 1.1-.5 0-1.6 0-3.4s-.5-1.9-.7-3.2c-.2-1.2-.5-1.6-.7-2.5s1.6-1.8 2.3-3.2 0-1.9-.2-3.2c-.2-1.2-1.8-1.2-1.8-1.2l-3.2-2.1-1.4-.7s-.2-1.4 0-3 1.1-2.1 1.8-3.4c.7-1.2.7-2.7.7-3.5s-1.8-1.2-1.8-1.2V227.1c0-1.2-.7-3.5-1.2-4.4s.5-2.5.5-2.5-.9-1.9-1.1-2.8c-.2-.9 1.1-4.8 1.1-4.8l1.9-4.8 1.2-2.1s0-3.2.5-3.9.4-4.1.4-4.1-.7-6.7-1.4-7.2-1-1-1.7-1.9-2-.1-3-.1-1.9-.1-3-.3-1.3-.4-2.7-.7c-1.3-.3-2.2.9-2.6 1.6-.4.7-.7 1-1.8 2.6s-1.1.4-2.5 1c-1.3.6-1.2-.9-2.2-1.2-1-.4-2.2.4-3.3.4s-1-.3-2.3-1.1c-1.3-.9-1.3-.5-3.2 1.2-1.9 1.8-1.7 1.1-3 .9-1.3-.3-1.9 1.2-1.9 1.2s-2.4 2.3-3 2.7-3.1 1.1-4 2.3-.2.8-1.9 1.7-1.3.1-1.3-1 0-.4.6-1.9 0-.6-.6-.9-1.1-.8-1.7-1.7c-.6-.9-.6-1.2-1.3-1.9s-2.1.8-3.4.6c-1.2-.2-1.1 0-2 .1s-.1.8.2 1.6.4.7 1.1 1.4c.6.7-.1 1.9-.1 2.7 0 .7-.2.8.1 1.6s.7.5 1.6 1.1c.9.6.5 1 .4 1.8-.2.8-1-.1-1.9-.2-1-.1-1.6 1.3-2.6 1.9-1 .5-1.4.4-2.4.4s-.8.6-2.4 2.1c-1.6 1.5-1.7.6-2.8.6s-.7-.6-2-1.5-.6.1-1.6.4c-1 .4.1 1.1.7 2 .6 1 .8 1.7 1 2 .2.4 0 .4-1.4 1.9s-1.1.1-2.1.1c-1.1 0-.8.1-1.9.2-1.1.1-.7-.4-.7-1.1V211c0-1.5-.5-1.1-.8-1.5s0-.8-.2-1.2-.9-1.1-1.3-1.1-1.7.1-1.9-.3c-.3-.4-.8-.9-1.6-1.2-.8-.4-1.7-1.2-2-1.6-.4-.4 0-.8.1-1.2s1.7-1.1 3-.9c1.3.2 4.2.5 6.4.5h4.2c.9 0 3-.4 4.2-.7s2.7-1.1 3.2-1.7c.5-.6.2-.8.1-1.9s-.4-1.6-1.2-2.3-.7-1.1-4.1-3.4c-3.4-2.2-3.2-.7-4.5-.6-1.3.1-1.1-.5-2.1-.8s-3-.2-4.7-.2-1.8.3-3.1-.1-.7-.8-1.9-.9c-1.1-.1-1.4.2-2.4-.2s-1.2-.9-1.9-1.1c-1.3-.7-.3-.3-1.6-.3z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAf9JREFUeNq0lstLAzEQxjfbXR9V Kr6LqCCi6EHwoAdvov+3B2+ieBIUL0JRrC0Ktlqta3f9Il9kCJt9iAZ+pDRhvswkM7PKyx/KmuVI rDnTgGvNBwEYBqG1XxuOQB98gtglpjKMa6NjYArUQY2Cisa04Q5ogifwQtE4T0QanwHLYA1sgHl6 ZIb24AFcgWtwA1rgDQxcIvr3EJim4U2wBdbBEj0Jxf6InjTAJTgB5+DWFgosL8YpcAh2wCpFxxx3 Msl1GU6PQj0TukAIjIIFnn6X8xS98x33Z8I7LGzpu/oAd5yTighTnaffB9u8g5EMAfuR6ENWGcYW H0NfilQZpgOwBxaFgFcwlwKiPWmDe9DVITOn1CeZYLhmSwrYd7rM11g3r9EXJwlF0pUVkDZqDLV5 jcovUQHKCA3J1+h7/zOUHcf/GEmWSPIHxiPmR2Ts+VmLvxTosKZ1jC0/a7GkSMxK3GDRbDIZfzzp 888rbnpJK9k5Aj0m4CWr8hMT8zvjpbshC94Mi6LpH6qAgC6Kp+AYXIBHinhSZEAUM75KkYoQSSwG lsAROKNHfRNy2xN98a/sB5E5iaisbxZdCpxR4FT0k9iV4RVW0zmwwoaV1hXNeGdJP3c1LC+nR4w7 +rv0XHv4TKF2moBXoE+4vlTSvlgi14tUBWuQKlBCnHn1JcAAOZ+ioiQkPF8AAAAASUVORK5CYII="
            transform="translate(599.996 251.655)"
          />
          <path
            className="territory, st3"
            d="M612.3 273.4c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 605.762 268.038)"
            className="armies, territory, st4, st5"
          >
            {getArmy("ukraine")}
          </text>
        </g>
        <g id="southern_europe">
          <path
            className="territory, border"
            style={{fill: getColor("southern_europe"), stroke: getStroke("southern_europe"), strokeWidth: getStrokeWidth("southern_europe")}}
            d="M567 303.3c.3-.1.5-.8.8-1.2s1.2-.4 1.2-.4 1.6-.1 2.3.4.3.8.3 2.1.1 1.1.3 1.7.5.4 1.6.7.8.2 1.6.3.7.8 1.1 1.7.5 1.6.9 2.4.4 1.3.4 1.6-.3 1.5-.4 2.2-.4.8-.5 1.1-.1 1.2-.1 1.5.4.8.8 1.2.4.8.4 1.5-.6 1.8-.6 2.4.9 1.1.8 1.6 2.2 2.3 2.2 2.3-1.1.8-.6 1.5 1.1 1.4.9 1.9-.1.5-.8 1-1 .4-1 1.5.9 1.4.3 2.4-.4.9-.9 1.6-.8 1.4-1 2.1.5.9-.4 1.6-1.1.4-1.4 1.3.1.9-.4 1.5-.5 1-1 1.4-.5.3-1.1 1-.1 1.1-.6 1.8-.9.1-1.1 1 0 .5.1 1.4.8.9 0 1.9-1.1 1.6-1.6 2-.5-.1-.9 1 .3 1.5-.5 1.8-1.1.3-1.9.4-1.1-.1-1.6 0-.8 0-1.1.6-.8.5-.3 1.3.4.8.9 1.3l1.4 1.4c.5.5.9.8 1 1.4s.1 1.1.1 1.1.6 1.9.1 2.1-1 .3-1.1 1-.3.5 0 1.4 0 .9.5 1.4.6.5 1.4 1.3 1.6.9 1.1 1.5-1.1.8-1.9.5-1.1.4-1.6-.8-.8-1.4-.8-1.4-.8.1-.8.8 1.9.8-.5.8-2.1.8-2.8 0-.1-1-1-1.3-1 .5-1.4-.3-.5-.8-.5-1.9.6-1.1.3-2.6-.6-1.1-.9-2 0-.9 0-2-.4-1.6-.4-1.6-.4-.3-.6-1.5-.1-1.4-.4-2.5-.1-1.5-.8-1.5-.3.5-1.3-.3-.5-1-1.4-1.4-1 .4-1.3-.9-.3-.6-.3-2.1v-2.6c0-.6.5-.6-.3-1.6s-.6-1.3-1.5-1.4-.6.9-1.4-.4-.9-2-1.9-2.3-.9.4-1.4-.3-.3-.8-.9-1.4.1-.9-1.5-.9-1.6-.9-2.5-.5-1.1 1-1.1 1.6 0 .6.1 1.5-.1 1.4.5 1.5.6-.5.8.6-.1 2.3 1.4 1.6 2.4-1.5 2.5-.8-.1.9.1 1.9 0 1.9.9 2.5 1.3.6 1.6 1.1.3.4.8.6.5 1.4 1.1 2.3 1.4.1 1 1.3-.4 1.6-.9 2-1.6.8-2.4.1-1.4-1.1-1.4-1.1.6-1.3-.9-.9-1.5.5-2.1.5-1-1-.8.4 1.3 1.9 1.3 1.9 1.1 0 1 1.3.4.9-.3 2.1-.5 1-1 2.1 0 1.1-.6 2-.9 1.4-1.8 1.8-.9-.4-1.3 1-.3 1.4-.9 1.6-2 .3-2.5.6.4.9-1 .5-1-.4-1.6-.5-.9-.1-1.4-.8-.1-1.8-.6-1.4-.9 1.8-1.4.4-.4-1.5-.9-1.8-.8 1.3-.9-.4-.4-1.6.4-2.4 1-1 1.6-1 .8.1 1.5.3.6.8 1.3.9 2.5-1 2.8-.3-.3 3 .4 1 .3-2.4 1.1-3.1 1.8-1.5 2.1-2 .8-1.3-.1-2.1-1.1 0-1.1-1.6.3-2-.3-2.9 0-.6-1-1.1-1-.8-1.5-1.4-1.4-1.1-2.3-1.4-.3.4-1.1-1-1.1-1.8-1.9-1.6-.4 1.1-1.1.3-.5-1-1-1.4-.8 0-1.4-.5-.6-.5-.8-1.5.1-1.4-.5-1.9-1.9-.9-1.9-.9.3-.3-1.4 0-1.8.3-2.3.6c0 0 2.4-.9.8-2.3s-2.3-3.2-1.6-3.4c.7-.2 1.6-.9 1.8-1.6s.4-2.1.1-2.6c-.4-.4-2.2-1.7-2.2-1.7s-1.1-.9-.9-1.2c.2-.4 1.1-1.3 1.1-1.3s1.1.2 1.1-1.3 0-2.3-.4-3.2c-.4-.9-.4-1.6.2-2.2.6-.6 1.3-1.6 1.5-1.9.2-.4.2-1 1.3-.8s1.4-.1 2.2-.4c.8-.4 1.6-1.3 1.6-1.3s1.3-.2 1.3.3c0 .4.9 3 1.8 2.7.9-.4 2.6-.8 3.4-1.2.8-.4.7-.9 1.8-.8s1.2.3 2.4-.1 1.8-.4 2.3-1.1 2.4-2.3 2.4-3.2v-2s3.8-.5 4.7-.6 1.8-.1 2.3-.4c.5-.4.5-1.1 1-1.1.4-.1 1.9.2 1.9.2s0 .3.4.4 1.3 1.1 1.1 1.9-.7 1.7-.9 2c-.2.4-.6 1.5-.5 1.9s1.1 1.8 1.1 1.8v3.9h9.2s.7-1.5.6-2.2c-.1-.7-.9-1.8-.9-2.1s.2-3.2.2-3.2.5-2.9 1.9-3.8c1.3-.9 2.1-1.2 2.2-1.7.1-.4.3-1.3.7-1.5s1.1-.9 1.1-.9.6-.6 1.3-1.7z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgdJREFUeNq0lttLAkEYxXfWW6Vs dLMLEfRQ2GtRQdCD9If70EtU9FBQkfRSGJoVmZa5XrYzcEaGaVd3tQZ+jOjsnD3zzZxRWMObMHq9 eUY/cIKg32wQBymQMMbLidugBTqgFyQWJGJz0gyYBUvAoaDgZHLiD1AGb+CTor/E/ERiYBJkwTrY BDmwSEeqSQcVcAuK4AG8GGK+IkpgFWyDfbAF1ugkoY1t08kjuANX4IaCr8BVjuLGEimBPZAHO2CZ y+ZXkxkwz5eQrlc0l++gq4sITpKlgzxdSMEpvoAYUDs5Js0xz6yRFPqSyxbTlsnh0hyBA75dmr+J EDswSaTDOoX6IsqF3EG74BBsUDRmhWtKTAk1QUnVxuagFEVydJDhQ1GaHD8BFlibaVVHW3PicJs6 PkWOIpQwD69tFD45hkDg+bMjxMzIzQ4IvH8RUWHnsh9XzDNFPC0iKuxHFeppydyfw9ZioMywk0HX 0AMugsA3qIInUFNCMcOi3FlzzKN0hJ3mcanli56DY3Ct8ksX6RLBoHTYqztEDHDg8nTLFC6AU574 lp8TV7sPVPDFjfzyNLqMkDIFzsAJuNeX3BRRD9XZt3kDWuxdft/UxpW4RAUKFFmPzl/cjBYLLYt8 AS75uTHsZgx7x1vaPV+jmyrdhbrjw/5bMf+xtIO2vYgQdmLI6Q48vD8CDAAew6UtP6gkMwAAAABJ RU5ErkJggg=="
            transform="translate(535.996 318.655)"
          />
          <path
            className="territory, st3"
            d="M548.6 340.3c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 542.13 334.931)"
            className="armies, territory, st4, st5"
          >
            {getArmy("southern_europe")}
          </text>
        </g>
        <g id="western_europe">
          <path
            className="territory, border"
            style={{fill: getColor("western_europe"), stroke: getStroke("western_europe"), strokeWidth: getStrokeWidth("western_europe")}}
            d="M521.4 317.4c-1.1-.2-1.1.4-1.3.8s-.9 1.3-1.5 1.9-.5 1.3-.2 2.2c.4.9.4 1.7.4 3.2s-1.1 1.3-1.1 1.3-.9 1-1.1 1.3c-.2.4.9 1.2.9 1.2s1.9 1.2 2.2 1.7c.4.4.1 1.9-.1 2.6-.2.7-1.1 1.4-1.8 1.6s0 1.9 1.6 3.4.6 1.7.6 1.7-.9.2-1.4.5-.1.4-.6 1-.4.8-1.3 1-.1.8-1 .6-.8.3-1.3-.3-.1-1.1-1-1.1-1.3.1-.9-.6.9-.8-.1-.8-.9.3-2.1 0-1.8-.1-2.3-.1l-1.4 2.5s.1.5 0 1.1-.6 1.1-.6 1.1-.4.4-.4 1.1.3.9-.5 1.6-.8 1-1.3 1.3-.5.1-.9.6-.6.5-.9 1.1-.3.6.1 1.3.6 1.4.6 1.4.4.1.1 1.3-.4 1.9-.4 1.9 0 .5.1 1.5 1 2.1 1 2.1l.6.9s.4 1.5.5 2.3 1.3.5.1 1.5-2.8 1.6-3.9 3.5-.8 3.4-1.6 4.4-.1 1.1-1.3 1.1-2.1-1.3-2.8 0-1 2.4-1.9 2.5-1-1.4-1 .4-.4 2.9-.4 2.9-.3.9-1.1.8-1-.3-1.8-.4-.8.4-1.4-.4-.8-1.1-1-1.8-.3-.9-1.3-1-1 .3-1.5-.6-.8-1.1-1.5-1-.8.6-1.8-.4-1-1.8-1.5-1.6-1.1 1-1.1 1 .1.5-1.4.4-1.8-.4-2.9-.4-1.3.8-2.3.3-1.1-.6-1.1-1.3.1-1.5-.4-2 .1-1.1-.6-1.5-.4-.3-1.3-.3-.9.1-1.8-.4-1.3.3-.9-1.1.1-1.3.8-2.3.6-1 1-2.1.5-1.4 1.1-3 .9-1.1.9-2.4-.5-1.3.3-2.1.9-.9.8-1.9.3-.8-.3-1.5-1.8-1.9-2.3-2.4-.4.1-.6-1.4-.8-1.3-1-2.1-.3-.9-.3-2-.9-.8-.9-1.4-.4-1.1.5-1.6 1-.1 2.1-1.1 1.1-.8 1.4-1.6 1.1-1.4 1.1-1.4-.1.1.6.9.9.8 1 1.3-.4.6 1.1 1 1.1.5 2.6.5 1.9.1 2.5-.1 1.3-.6 1.3-.6.5-.4 1.4-.4 1-.1 1.8.1.1.4.9.3.9.1 1.5-.3 1 .3 1.4-.9 0-1.5 1-2.3 1.4-1 2.4-1-.6-1.6-1.3-1.8-1 .5-1-.1-.1-.8.3-1.8 1.1-1.6 1.1-1.6-.1-.5-.3-1.4 1.6-1.4.5-2.1-1.6-1.1-2.4-1.1-.6 1.3-1.3-.3-.1-1.8-.8-2.5-.9-.5-1.5-1.4.3-.8-1.1-1.8-2.3-1.3-2.9-1.3-.9.9-.8-.4.1-1.6 1-2.4 3.1-1.4 4-1.5-.5-.5 1.4-.1 1.3.4 2.1.5 2.5.6 2.5.6.3-1.9.8-2.5.6-.6 1-1.6.5-1.1 1.8-1.5 2.1.6 2.1.6-1.6 1.6-.4 1-.4-2.6 2.4-2.3 3.8 2 4.1.1 0-1.9.6-2.9.6-1 1.8-1.6.9-2.5 2.3-2.8.9 0 2.1-.3 1.1 0 1.9-.9c0 0 1.2.3 1.1.8s1 3.2 1 3.2 1.3.8 2.2 2.1 1.3 2.4 1.8 2.5.7.1.8.9.2.9.6 1.4.9.4 1.1 1.2.3 1.6.6 1.9 1.3 1.1 1.3 1.1 1.6 1.3 1.7 1.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAg9JREFUeNqklktLw0AUhZtp+lKJ aK2PCoKIUhe68LlwIeIPF1y4sUsRdWGh+KjiA1of2DaJZ+SMDNNMmrYDH1OS9J65c3PPxEnFD8eY o0ZozNYgUUOADMhxdiwCHfADuiCIEnMswlKgAEpgEUwC13g+ZOAmaIA38EHRIE5ErX4ClMEm2OLv fMSCZAZP4ArcgFvwDL51IccQzIIiWAUbYJ9CJYqbo8NM6uASnIFz8ADaautcI4txChyDXbAGZpmF sNRkigsr8prcthZ4B768kDayWAB74IgZzFEgzWdMBO/lSMDgL6yPrFmoROTsgXVwCLbBfEwGZl0d 7orL7FrM6EsKqxVmGHQHHIAVbl0/AfONzBJZ+HvwKmujguQoUgFLAwroNc3zJSnztf/rL6Fl4rEG XkzzJRHqaWChpZthqsMKWPtPDGAzQw9hMbtRRxglooyuzTkcIXhPHKHdaNKHmkMKWeMIzegaNLo6 uzUYUCTg/+qM02Dcf1tRK8nQg2bYK0nftIDdfUeDlEZZ0zteDZ84PEs8zq5mHVFbZAqcggt2ezcq E1mwT+6lzGKMImlNJNSCt7n3SuAEVMEjtyqMEvHpOy3OHbUazm1eV8/IA+pay6BKQeuhldIcucBz ZJlnSoWWk4s5FWvaqegn6XD9GJ6meXpafRKf7/1sRNm3a/liSfSlktSr4r69wiR29CvAAMCSqiDx E8oyAAAAAElFTkSuQmCC"
            transform="translate(483.997 328.655)"
          />
          <path
            className="territory, st3"
            d="M496.5 350.1c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 490.045 344.692)"
            className="armies, territory, st4, st5"
          >
            {getArmy("western_europe")}
          </text>
        </g>
        <g id="northern_europe">
          <path
            className="territory, border"
            style={{fill: getColor("northern_europe"), stroke: getStroke("northern_europe"), strokeWidth: getStrokeWidth("northern_europe")}}
            d="m563 263.6 1.3.1c.8.8 1.5 1.7 2.3 2.5 0 0 2.5 1.4 3.4 1.4s1.9-.6 2.4-.6-.1.9-.1 1.2.7 3.3 1 3.9.4 8.1.4 9.4 1.4 2.8 1.8 3.1.6 1.1.6 1.4-.8 1.4-.9 1.8.1 1.2.1 1.8-.5.8-1 1.3-.4 1.4-.7 2.1-.8.6-1.4.9c-1.7 2.3-2.1 4.3-5 5-.6 0-2.1.4-2.3.9s-.2 1.5-.2 1.5l2.3 2.2c-.7 1.1-.4 1.1-.4 1.1s-.7.7-1.1.9c-.4.2-.6 1.1-.7 1.5-.1.4-.9.8-2.2 1.7-1.3.9-1.9 3.8-1.9 3.8s-.2 2.8-.2 3.2.8 1.4.9 2.1c.1.7-.6 2.2-.6 2.2h-9.2v-3.9s-1-1.4-1.1-1.8.4-1.5.5-1.9c.2-.4.7-1.2.9-2s-.7-1.8-1.1-1.9c-.4-.1-.4-.4-.4-.4s-1.4-.3-1.9-.2c-.4.1-.4.8-1 1.1-.5.4-1.4.4-2.3.4-.9.1-4.7.6-4.7.6v2c0 .9-1.9 2.5-2.4 3.2s-1.1.8-2.3 1.1-1.3.2-2.4.1c-1.1-.1-1 .4-1.8.8s-2.5.9-3.4 1.2c-.9.4-1.8-2.2-1.8-2.7 0-.4-1.3-.3-1.3-.3s-.8 1-1.6 1.3c-.8.4-1.1.6-2.2.4-1.1-.2-.9-.6-.9-.6s-.9-.7-1.3-1.1-.5-1.2-.6-1.9-.7-.7-1.1-1.2-.4-.6-.6-1.4-.4-.8-.8-.9-.9-1.3-1.8-2.5-2.2-2.1-2.2-2.1-1.1-2.8-1-3.2-1.1-.8-1.1-.8c.8-.9 1.4-3.1 2-3.4s1 .4 1.4-1.6-.3-1.6.4-2.1 1.4.1 1.8-1.3.3-1.6.3-2.3-1.8-.6.6-1.1 2.5.3 3-.8.5-.8.8-1.8.8-.8 1.4-1.8.3-1 .6-1.9.4-4.1 1-4.4.6.5 1-.5 0-1.3.8-2.3.9-.9 1.6-1.4.9-.4 1.1-1-.9-.5.9-1.8 1.6-.8 1.9-1.4.5-1 .6-1.6 0-.6.1-1.5 0-.3.1-1.8.4-2.5.5-3.1.3-1-.4-.9-.8 1.1-.9 0-.4-1.5-.6-2.1l-.6-1.8s-.5-.5 0-1.3 1.1-1.9 1.1-1.9.4-.4 1-.5.8.1 1.3-.5-.5-.8.8-.9 1.5-.1 1.5-.1l-.8 1.1-.1 1s1.4.8 1.6 2.3c.2 1.5.5 1.6.4 2.4s-.3 3.8-.3 3.8 0 1 .8 1.6 1.3.9 2 1 2.1.3 2.8 0 1.3-.4 1.9 0 1.4 0 1.9-.3 1.1-.5 1.8-.6 1.1-.1 2.4-.1 1.6.3 2.1-.3.4-.1 1-.6 1.9-1.1 2.5-1.1.6-.1 1.4-.3 1.8-.6 2.8-.3 1.4.5 2.3.6 1 1.3 1.5.9z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkBJREFUeNqkll1PE0EUhrvb3ZYW I4ihiILGSIzeSsBrw//mihujeKnGkBiBGqCxoEEolG59J3kOmUy222Wd5Mmk3dnzzvmYMxvVyo0o mG2Mg3mqgaLnsUhEU6TeO874UFyJG5EVCRYJxRi+JxbEI3Ef0RrG/4gj0RfnCGd3EaqLluiI5+Kl eCWW8KyGJ8fiq/gmvosTcSlGZYRMZEW8EW/Fa/EUj1LWDfFoX3wR78UncZgnlkwQWRUb4p1YF8uE MMzRA/EwCKt7fhCKJUFOzBMnssXsfrd5Hk3IYxNbsbcJ59mF5azuhbDBzjYR2cSzWdZFBVWZshnz +pICuRVKvBdm2P06ufE9mTZi1q6Quz7h6/N7HAdCrsqeMbdKioSh923MWCQs7s7defFYLFYQCcUW sTVvBWTGGuxgzTsrUQWhiHeXsNXB9q1HCeXZCcq0ilCurSrhqTRiat761gnzTZmOnDMm2jKPrnmw R/+6+g8h64F72Lz2PXK1fiZ+ih4HLqsglPFuD1tn4TlyYgN28MPrwlkFEd/GwCJTD9we81+bimmX rMCMduP620exIz6LU2usoZBz8y9zk97VCtZZGdvGRp7IB7GN2JGf61BohPvnLEq9NjKkgvxNXVBZ XYxvI3YYhj68j0zowCvVXzRL18XnOIhtRI5JvMvJbtHFN+0qdz3rCT1rltbyAsHflHCXxHe9ii11 leddainMIW4e9SjhAdz54yTve866fAOPRxzGoVcYlT63pgmX/nh0458AAwAlu7k5r6s+KQAAAABJ RU5ErkJggg=="
            transform="translate(529.996 277.655)"
          />
          <path
            className="territory, st3"
            d="M543 299.7c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 536.5 294.293)"
            className="armies, territory, st4, st5"
          >
            {getArmy("northern_europe")}
          </text>
        </g>
        <g id="egypt">
          <path
            className="territory, border"
            style={{fill: getColor("egypt"), stroke: getStroke("egypt"), strokeWidth: getStrokeWidth("egypt")}}
            d="M575.6 429.3c-.2-.9-3.9.2-4.8-.2-.9-.4-1.4-1.1-1.4-1.1s-.7-2.1-.9-3.2-2.7.2-3.5 0c-.9-.2-.2-1.4-.5-2.7-.4-1.2-1.8-.7-2.7-.7s-2.3-.7-3.5-1.6-1.6.4-3 .5c-1.4.2-1.4-.2-1.9-1.1s-2.3.5-3.9.4c-1.6-.2-1.2-.9-2.1-2.3-.9-1.4-1.8-.4-3.7-.9s-1.2-.7-1.4-2.1-1.4-1.2-1.4-1.2-.2-1.6-.4-2.8c-.2-1.2.2-3.2.2-3.9 0-.7-.4-3.4-1.6-3.9s-.4-1.8-.4-1.8-.5-1.8-.4-2.7c.2-.9 1.4-1.9 2.3-1.9.9 0 1.4-1.1 1.4-1.1s-1.4-2.1-2.1-3.4c-.7-1.2 1.2-1.1 1.2-1.1l.9-1.1s.4-.5 1.9-1.4.7-2.9.7-2.9 1.6.1 3.3.4 1.4 1 2.4 2 1.4 1.3 3.5 2 2.3 1.1 3.6 1.1 3.6-1.3 4.5-1.6 2.4-.5 8.4-.9 6 3.5 7.4 3 2.9 0 3.6.3 2.9 1 4.1 1 2.6.8 3.1 1 6.3 1.5 6.9 1.5l1.6-1.5 1.3.4s1 .5 1.5.5.8-.9.8-.9l2-1.3 2.3 4.4s-1 2.6-1 3.4-.1 2.6-.6 2.8-1.1-.1-1.9-.6-1.5-1.9-2.6-2.6 0 2.5 0 2.5c-.1.5 2.4 3.9 6.8 9.9s.5 3 1.4 4.5 1.8 2 2 4.3.1 1.1.5 2.3l-.3-.3c.1 1.6-27.3 0-28.9.5s-1.3 5.3-1.9 5-2.8 1.1-2.8 1.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfdJREFUeNq0lltLw0AQhZOmaatW rZd6R7GIFEUfBH0Q/O2C+CKKj1pFEC9Iq6Ci1dq0TTwLZ2Bdk96MgY+hbTpnZnZzNrbV/rKNaF6B EdsmCbsSwAVpRjtEoAHqoAn8KDE74jslMADyYB6MgqR2f8DEb6AMnkGVon4nEal+GMyCTbAF5kDG uFd1UAElcAmuwSOogVaUiFQ/BQpgHeyADXbkGiINdnILzsEROAX3plBSE3MpsA12KVLgdxkWYa7J GJgAM2BEy6eEPmV0Sa2LLJMqgT2wyLG5IQJhm0NyNTnKB+CpYmQxVRwHq2CNAjngdNiBNu8ZAgsc odoEd4zqcyAVptlykQLZLgSsiPVc0kZsy4+yHmqm04xuDwKmUJ67MSd5EsbCp/oUkBxpFrrCblJW yIL2k9wyCv01kYQV7yWbKKU7RNwiYjceY2BFPGB/ERAXqDD+2MJygyc/9CkifnZFH/Okk8gKehTx 6VlPfNpfzU7qtOwSDa8aZtldCKjqbxi/pFDHaNel4U3SKmSHtDsZfZqhMsUTcAjOwIs4sS7SIjYt YZAijnFYBVpyj+NVAsdgn0JlTie0E/WnD7be4Da0tG1Z03jnWC4ocEABOU/8qCfc0Yxuma5c5BOc juNkNM+ILO1fP5BiOePNl4nkf72txP7e9S3AAMC9p6PluYrhAAAAAElFTkSuQmCC"
            transform="translate(560.996 394.655)"
          />
          <path
            className="territory, st3"
            d="M573.2 416.3c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 566.662 410.938)"
            className="armies, territory, st4, st5"
          >
            {getArmy("egypt")}
          </text>
        </g>
        <g id="east_africa">
          <path
            className="territory, border"
            style={{fill: getColor("east_africa"), stroke: getStroke("east_africa"), strokeWidth: getStrokeWidth("east_africa")}}
            d="M575.1 454.8s-.5-2.1-1.4-3.4c-.9-1.2-.4-2.7-.4-3.5 0-.9.4-1.4.9-2.1s.2-1.1.2-1.1l.9-1.8s.5-1.4.5-2.7-.7-.7-1.4-.9c-.7-.2-.2-.4.9-.9s.7-1.8.9-2.8c.2-1.1-.4-5.5-.5-6.4 0 0 2-1.3 2.7-1s.3-4.5 1.9-5 29 1.1 28.9-.5l.3.3c.4 1.1 1.3 1 1.3 1s2 1.5 2.3 2.3.5.3.5.9.4 2.9.9 4.4.6.8 1.6 1.6.3.8.3 2.8 1 1.5 2 3.1.1.9.6 2.3.6 2 1.1 3 .8.8 1.4.8.8.4.8 1.9 2.4 2 3.4 3.5 1.1 1 1.8 2 0 .8-.6 2.9.1 2.3.8 3.3 4 .9 4 .9 3-.3 4.1-.9 1-.9 1.5-1.3 4 0 6.5-.6 5.8-3 7.3-.4-3.8 13-6 18-8.5 10-12.4 13.8-6.3 8.4-6.5 8.9-1.3 1.5-1.8 1.8-1 .6-2 1.9-1.6.8-3 1.8-1.1 2-1.1 2.8-.4 2.4-.8 2.9.5 3 .5 3.9c0 .9-.3 2.9-.3 2.9s0 .4 1.4 1.1.5 5.3.5 5.3l.3.5s-1.6 1.6-2.8 1.6-2.6 1.4-2.6 1.4-.6.1-1.9.5-2.3.3-3.4 1.8-.5 1.4.4 4.3-.4 1.1-.8 2.1 0 3.1 0 4.4-.9 1.8-1.5 2.3-2.6-1.5-3.4-2.8 0-3.3.5-4.8-1.1-3.6-1.5-4.9-.3-1.4.4-2.5.1-.9-.3-2.6-1.4-1.6-1.8-2.4-1.5-2.3-2.5-2.3-.5-1.6-.8-2.5-2-.5-2.6-.3-.8-.6-1.1-3.4-1.1-9.8-1-10.9 2.9 1 3.4.3.6-6.4.4-7.9 2.1-.9 3.6-1 1.8-2 2.4-3.3 1.3-1.1 1.9-1.4.5-1.5 1.3-2.5 1.8-2.8 1.8-4.1-1.9-2.8-4.1-2.9-1.8 1-4.9.3-3.8-.6-4.8-.9-.9-1.9-2-2.3-2.5 2.1-2.5 2.1-1.3-.4-2.5-3.4-3-3.9-3.5-4-.6-3.6-.6-4.3-2.3-1.4-2.8-2.1-.9-1.9-1.8-2.1-1.5-.3-1.9-2.4-1.5-4.4-1.5-4.4z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjBJREFUeNq0lt1LAkEUxffLLBQp JbMog6iooIceegmivz2CXqyefCgKoigqpSitTFO3c+MMDLdtXZMGfgy6s3PuPTNzZ10nWXNVLy1U /cCX4557IABpkOJ/MvEn6LAPLRKLmMll0gzIgxLIUbALGqAGnsEHEcF+EhEzeRYUQBmsgDUwA8aY wQO4ALcUk74OWqAXJyICE6AIlsAq2KTIQkQmD5z4ChyDE3CjhQIlmKLANtgBG2CRGWXUmkzRwhaD yFvzidC7sS5QWWSZgQjs0qosJ/dU5h6ty1gBOMyyQ/ukDwOVRYEWbVBgEvi/rJ1rbRARmVc2vnBT 9Hy+4NPvdbAHtsC0ZU+SoxBY6yXrdAeaYplnDRBPl0lhCAFtd5k7scSz9f3A4Y8SH5aZvucM14zl OW71nAnUi3voDN/MXGP2HF7cwxGaq3389+ZZlVQXvFFaqEWMgNnfjRGEIoM1mbTBPTgF1+Atqpom FPgRrMlEDtATq6rw+IdsJKhXBnnKoNvmpNuDHJ6RWR7ItFU+4jLosyBKYayAQ3BpiqSvBofcwnnW rXRE7XLV5B1aIwJH4ABU6UZXZ+LwDujy5dC6E/pqjfq0s2mtZYUCJ6xbbWO3H5F6hxW0Tl5IkwH0 aIPchmeMfp8WVSnQsoMadP3muT5SkedYPIscV2MG51zsRy78j3t+0IeEVOdxMkmBHMc0aNUTt/yn ZfPQn0Suqm2BdQO21Rr+6bsr7gMv8cfdlwADALiztxxagSTDAAAAAElFTkSuQmCC"
            transform="translate(594.996 448.655)"
          />
          <path
            className="territory, st3"
            d="M607.7 470.7c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 601.2 465.313)"
            className="armies, territory, st4, st5"
          >
            {getArmy("east_africa")}
          </text>
        </g>
        <g id="congo">
          <path
            className="territory, border"
            style={{fill: getColor("congo"), stroke: getStroke("congo"), strokeWidth: getStrokeWidth("congo")}}
            d="M595 514.9c-.6.3-.8-.6-1.1-3.4s-1.1-9.8-1-10.9 2.9 1 3.4.3.6-6.4.4-7.9 2.1-.9 3.6-1 1.8-2 2.4-3.3 1.3-1.1 1.9-1.4.5-1.5 1.3-2.5 1.8-2.8 1.8-4.1-1.9-2.8-4.1-2.9-1.8 1-4.9.3-3.8-.6-4.8-.9-.9-1.9-2-2.3-2.5 2.1-2.5 2.1-1.3-.4-2.5-3.4-3-3.9-3.5-4-.6-3.6-.6-4.3-2.3-1.4-2.8-2.1-.9-1.9-1.8-2.1-1.5-.3-1.9-2.4c0 0-.5-3.6-1.2-4 0-.1-2.3 2.4-2.3 3.2 0 .9.5 1.9-1.8 3s-3.7 1.8-5.1 2.3c-1.4.5-1.9 1.6-2.8 2.1-.9.5-2.1.5-3 1.2s-1.6.7-2.1 1.8-1.2-.7-1.4 1.8.4 3.7.4 3.7 1.6-1.9 1.2 1.9c-.4 3.9-1.2 4.2-.7 5.7.5 1.4.9 1.8-.5 2.7-1.4.9-2.7 0-2.7 0s-.4-1.6-1.9-1.2c-1.6.4-1.8 1.1-3.4.7-1.6-.4-3.2-.4-3.2-.4s-1.9 1.6-2.7 1.2c-.7-.4-.7-.9-1.2-1.9l-.6-.2c-1.1-.4-1.2 2.1-1.2 2.1.4 1.1 1.4 1.6.9 2.1s-1.1 2-1.8 2.9-3.3 2.1-2.3 3.3 7.6 6.4 9 9.5c0 0 .6.9 1.3 1.8s2.9-1 3.6-.4 2.8 2 3.5 2.4 4.9-.3 5.9.5 1.8.4 1.8.4-.6 4.3 0 4.9 2.1 1.4 3 .1 7.4-2 7.8-1-.6 3 .6 4 2.1 1.8 2 2.8-1.4 2-.9 3.4 1.9 1.9 3.4 1.8 1.4 1 2.6 1.3 6.1.3 6.6.6 1.8 1.3 2.1 1.9 1.8 2.9 2.6 2 1.9-5.5.5-6-2.3-.5-2.3-2 .8-4.1 1.3-4.1 1.1-.6 1.1-.6 3.9-.1 2.6-1.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAitJREFUeNq0lstv00AQh72u2wTC S6S0FUhwoagcyoGHOHLg/+bADRXBkYeQENDwqgRtgJjEacxvq2+r0crdOgUsffJj1/ubGc/O2GXt Dxfd1yd9sWk8UIglnk/EFKH6ONGUSC4WRRfOi4uMfRNDUcEY0VmTmDtC2AucEpfEFbEiLourzPkg vopfYk98RvgnorOUSLD+DIveErfFNQT7xpM9RL6Il+K1eIt4KfabRBwx9wuti01xH6EVPAvfpDJ4 sffihXginoltMQoeFZEXPQQeinviBgJdxoNRXfPRL2DYmjhrEmPAuS6MFz5My+KmuIsnfazPE0kT Qtzh/gch9B7u+rAtMODP5xB4IO5gWfcIgaZEKcBn2Y74hOAsN3vAp+d1wrWMB26OzZqTMD4DNzCy kxkrOzzcYFKvhQdNHi0SkVXO/t7lqcFs/iOstWTXyFODf3G4OI7//chNcavI62qeCttWJAgMye/h PxCqmzyZUHPeIDQ+ocjMVOVDQ60nfnd+ZCOVcSVtKVBi7IAdfyBkv8lvJrzDmxGVtG4pMKIwPqdI DvAoW4jiWOPdaTZkwRzbIePYW4Et8Ug8pccchD0WqXih5HpqapOtwmHxCYliBba4Pwx5LLLP4HdC t0NjmjA+5bqk+Pk5r1j4MR5sp5pWU3fsU8vWqWurpqSP23TF1I+EM2I9KvQadS30oCmhSvb3tr9E oVd0orpWt/lTyeYohO6YH7xkmv8RYAA5t7h5q6v1twAAAABJRU5ErkJggg=="
            transform="translate(562.996 478.655)"
          />
          <path
            className="territory, st3"
            d="M575.7 501c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 4.9-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 569.24 495.54)"
            className="armies, territory, st4, st5"
          >
            {getArmy("congo")}
          </text>
        </g>
        <g id="south_africa">
          <path
            className="territory, border"
            style={{fill: getColor("south_africa"), stroke: getStroke("south_africa"), strokeWidth: getStrokeWidth("south_africa")}}
            d="M547.1 504.1c.6.9 2.9-1 3.6-.4s2.8 2 3.5 2.4 4.9-.3 5.9.5 1.8.4 1.8.4-.6 4.3 0 4.9 2.1 1.4 3 .1 7.4-2 7.8-1-.6 3 .6 4 2.1 1.8 2 2.8-1.4 2-.9 3.4 1.9 1.9 3.4 1.8 1.4 1 2.6 1.3 6.1.3 6.6.6 1.8 1.3 2.1 1.9 1.8 2.9 2.6 2 1.9-5.5.5-6-2.3-.5-2.3-2 .8-4.1 1.3-4.1 1.1-.6 1.1-.6 3.9 0 2.6-1c.6-.3 2.4-.6 2.6.3s-.3 2.5.8 2.5 2.1 1.5 2.5 2.3 1.4.6 1.8 2.4.9 1.5.3 2.6-.8 1.3-.4 2.5 2 3.4 1.5 4.9-1.3 3.5-.5 4.8 2.8 3.3 3.4 2.8 1.5-1 1.5-2.3-.4-3.4 0-4.4 1.6.8.8-2.1-1.5-2.8-.4-4.3 2.1-1.4 3.4-1.8 1.9-.5 1.9-.5 1.5-1.4 2.6-1.4 2.8-1.6 2.8-1.6l-.3-.5s2.9-.9 2.4.1.9 4.6.9 4.6.1.8.4 1.8.1 1.1.3 2.1-.4 1.5-.5 2.3.1 1.4.3 2.4-.6 3.3-.9 3.9-1 .6-1.5 1.1-.6 1.3-1.8 2.4-.9 1.1-1.6 2.3-.1.5-1.3 2.3-.6.5-1.8.9-1.8 1.6-2.3 1.8-1.9 1.4-2.6 6 .8 5.5.4 6.4-2.8 4.3-3.1 5.3-.8.9-1.9 1.4-.8 2.5-.8 3.3-.8 3.3-2.1 4.5-.1 1.1.3 1.6.4 1.1.1 2.8-1.6.8-2.4 1.3-3.1 3.3-2.9 4.3 1.3.9 1.3.9-1.6 1.8-3.1 3.6.1 1.1.5 2.4-.9.3-1.6.3-.9.4-1.6 1-1.3.5-4.8 1.3-1.4 1.3-3.1 2.5-1.6 1.6-6.5 1.6-3.3.5-4.1.9-1.5.4-2.5.4-1.8.5-2.4.9-1.1 1.4-1.1 1.4-.5-.3-1-1.1-1.6-.5-2.5-.6-1-.3-1.9-1.4.3-1.5.3-2.1-.8-2.6-.8-3.6v-2.8c0-1.3-.1-1.3-.1-2.6s0-1.5-.4-2.3-1.4-1.6-1.6-3 0-1.9 0-3-1.3-.5-1.5-1-.9-1-1.4-2.5.1-1.4.1-2.6v-2.4c0-1-.8-1.4-1-2s-1.8-3.3-1.9-4.1-.3-1.4-.3-2.5.1-1 .3-1.9-.6-1.4-.6-2-3.3-3.8-3.3-3.8-.4-.3-.5-1-.8-1.3-1.9-2.6-.6-1.4-.5-2.4-.1-2-.3-2.6-1.4-3.4-1.4-3.4-.1-1.3.1-2.3.6-1.3.8-2.8 0-1.1.1-2 .3-.9.6-1.6 1-1.4 1-2.5.8-2.1 1-2.6.8-1 1.5-2.1-.4-.8-.3-1.8-.1-1.8-.3-2.5-2-3.1-2.5-4.5 1.8-2.8 3.5-5.5h.1c2.1-3.8-4.1-8.6-4.1-9.8z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeNJREFUeNrEls9LAkEcxXfG3SST hX5QBiF0KOxqlBB0iP7woEMQSaegH5dAisyog1ai5m5v4g2M4+66m2EDH+aw43v7/c7sG4UzeQhr NkdozYkCcc8kcEEeeNZ6JTwAPfAFgjizOBNJ0SJYAiXg01BQTAm3QRO8gXeaBmlMcmAerIJNsA0q YI0V6aEqeAY34A7cgxbogmGSiTbYAFVQAzugzEo8Y+2AlTTANTgHl+DBNnKtFmmDfXAEdsE62xa1 J4tg2WqnQ6NP3TrXqMhji6o0qNGwwBcQCXuXN7TUXvXBI+cwZ7TJZ2uOwQFbtMBnYsIJ9NiFAtvY 4mHoaRNdhSp5DxyCLZrmnHRDsBKXlbyAJ9BRLZNclKdJhRUU+YZZhuTvytQp6dMojUp8HlM/YpPT VhOpI60Fc780cJJ0ZIaYyWo20seowJt2hFEmOuz6nMMpxMd0pPGgzSxq/9IoVkcaYddk2DWYqEFG k4C/a1CnSd2Rjy3kiVBZtMKvPe1JC5hVKrMuwBlT+Se/TJMhEYwIn7O+Q+JuRtvgFFyBV379Y5Wo DftgLz1mkWvlV2iI99l7bXAC6oyUnt5X22TIu6DDeaDfxkjXrrFGBeGtUUHduE+Cf70ZZ3bHz+zf yp/+7/oWYAClEandSvMdpwAAAABJRU5ErkJggg=="
            transform="translate(567.996 544.655)"
          />
          <path
            className="territory, st3"
            d="M580.5 566.3c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 573.96 560.891)"
            className="armies, territory, st4, st5"
          >
            {getArmy("south_africa")}
          </text>
        </g>
        <g id="brazil">
          <path
            className="territory, border"
            style={{fill: getColor("brazil"), stroke: getStroke("brazil"), strokeWidth: getStrokeWidth("brazil")}}
            d="M404.4 403.6s-4.3 3.6-4.9 4.6c-.5 1.1-.9 3.4-2.1 3.5-1.2.2-8.7.5-8.7.5s.4 2.1-.7 2.1-11.5-.4-11.5-.4l-1.4-4.2s-1.2.9-1.4-.9c-.2-1.8-.2-4.6-.2-4.6s-2.7 1.4-4.2 1.9c-1.6.5-3 3.2-4.4 2.7s-2.1-2.3-2.5-.9.2 5.7-.9 6c-1.1.4-1.4-.3-2.3.8s-3.3 1.3-4 .7c-.7-.6-1.2-1.3-2-1.6s-1.2-.7-2.1-.8-1.1-.5-1.8.3-2.2 2.1-2.5 2.8-1.7 3.3-1.3 4.2c.4 1 1.8.7 1.8 2.5s-.5 2.7-1.5 2.9c-1 .3-5.8 1.9-5.8 1.9s-4.1 0-4.2.6.1 4.5-.9 5.3-3.8.4-3.9 1.4-2.1 1.6-1.4 3 2.1 2.6 3.1 2.6 2.3.1 2.4 1.1 3.6 1.1 5 1.9 4.9-1.1 4.6 1-3.9 2.5-4.1 3.9-.4 4.4 2.4 4.3 5.3-2 7.1-2.4 3.8-.4 4.3-.9.9-1.8 1.9-1.9 3.4 1 4.1 2.3.9 2.4 2.4 2.5 1 1 2.1 1.5 2.1 0 3.1.6 1 2.8 2.6 2.8 3.9-1.1 4.5.1 1.3 3 2 3.8.3 1.8.5 2.5 1.8.9 2.9 1.8 1.3 1.4 1.6 3.1 1.3 1.8 2 3.3 2 4.8 1.8 5.9-1 2.5.5 3.4 2.1 1.4 3 2.8 1.5.9 2.1 1.4 1 2.4 1.4 5 3.3 3.6 3.4 5.4.3 3-.4 3.1-1.9 1.3-2 3-3.4 2.6-3.4 2.6-2.1 1.5-1.9 2.5 5 .3 5 .9-.8 5.1-.3 5.3 3.8-1 4.3-.4-.6 4.5-.4 4.9 3.1 2.5 3.8 1.9c1.3-.4.6-.6.8-1.3s.3-.6.9-1.5.3-.9.5-1.6.6-1.4 1.1-1.9.8-.6 1-1.4.1-1.1.3-2.4 1.6-1.4 3-1.9 1.3-2 1.4-3.3-.4-.4-.4-1.8-.1-1.9-.3-3.3.1-.5.8-1.1.6-3.4 2.1-6.5 12.5-4 13-4.1 3.4-1.1 3.8-1.6 1.6-1.6 2.6-2.1.4-1.4.6-2.5.5-.8 1.1-1 .5-1 1.1-1.9 0-1.8.4-2.5 1.5-1 2.4-1.4.4-1.6 1.1-2.4 0-3.4 0-5 0-1.8.8-2.8-.3-3-.3-3l.3-1.8s-.4-2-.1-3 1.3-1.5 2.8-2.5.5-3.3.5-3.3V449s2.3-1 4-1 1.8-2.5 3.3-4 .8-3 1-4.3c.3.5-.3-.8-.6-1.9s-.1-1.6-.4-3.4-1.3-2.5-2.3-3.5-2.4-.8-3.3-1-1.4-1.9-2.3-2.1-4.3-2.6-6.1-2.9-2-.1-2.9-1.1-1.4-.4-2-.4-1.6.5-2.4 0-1.1-.3-2.3-.3-2.1-.4-2.6-1.3-.5-1-1.3-1.4-1.6-.1-2.4-.5-1.6-.8-2.4-.9-1.6.1-2.4 0-2.5-.5-3.1-.5-2.5.4-3.4.4-2.4-1.5-3.6-2 1.1-.1 3-2.4-.8-3.6-1.3-4.5-.6-1.6-1.4-4.3-.7-2.1-.7-2.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAelJREFUeNq8ll1LwzAUhru0tahl qAN1IKIXjnkrwv6A/1sQb0TxUqcIoqhMB37MubnOtb6RN5CFprabGHgIjC7v+co5KTnZq2Ts5kqM PfOQtN8F8EAA/JRv5cFDMABfILaJpYkIHhqCJbAKyhQsaQLy4A5ogWfQpWj8m4gLZsEy2AQ1UAcr 9Ehf0oNH0ASX4Bo8gT4Y2USkB3NgDeyABtgG6/TEN0SG9OQWnIMjcAruTCFPE/PpgRTYA7ugyrDZ crIIKkZIHQr1VOg8zYuQIWpQYIOeiYwCUfkLtLNkriJwzz1RyfSY5BpDVKWAm6PE5TfzDLMqBpmr N/Aqwyb4cUCX68xBSCvzLpXPKo2s0egfJ4SWjzKrqGzJQR6hkEbWaXTgaNYqoZkJBZwsY0XODlBU aMxY4fzD+msR1c8i7kmaSPIHAqqEO0pIZFkwgYjqZ1fsY5HyxGpBQZGYPasNHngRxzwZsGU32fC6 bHBJQQFp/Q33T/V/13DX501d4EVyWYYlS3knFOixKZ6AQ3AGXlQn1kVGxoQbaRNSGANLHR4xvFLg GOxTqMXopHoSsbG1yYfqpFp37ZN3huWCAgcUUPMktt1wffRW2Ie2LNNxosloPiJ8tvC0OT/VjC/y YpnqtVLk7ZXr3fUtwAB8bashw4vFdwAAAABJRU5ErkJggg=="
            transform="translate(397.997 436.655)"
          />
          <path
            className="territory, st3"
            d="M410.1 458.2c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 4.9-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 403.649 452.74)"
            className="armies, territory, st4, st5"
          >
            {getArmy("brazil")}
          </text>
        </g>
        <g id="argentina">
          <path
            className="territory, border"
            style={{fill: getColor("argentina"), stroke: getStroke("argentina"), strokeWidth: getStrokeWidth("argentina")}}
            d="M396.3 495.5c.1 1.8.3 3-.4 3.1s-1.9 1.3-2 3-3.4 2.6-3.4 2.6-2.1 1.5-1.9 2.5 5 .3 5 .9-.8 5.1-.3 5.3 3.8-1 4.3-.4-.6 4.5-.4 4.9 3.1 2.5 3.8 1.9c-1.4.3-4.7 1.8-4 2.7s1.5 1.1 0 1.5-1.3.3-2.8.5-1.3.1-2.9.5-1.9.9-2.9 1-1.5-.1-2.1-.1-1.1 0-1.1.6-.1.8.5 1.3 2.4 1 2.5 1.5.1.9.1 1.8.1 1 .6 1.1.6.3.8.8-1.3 2.3-2 2.8-1.4 1.1-3.1 1.3-1.4-.1-2.5.5-1.1.8-2.4.8-1.6 0-2.9.3-2.1.5-2.1.5.5.8.6 1.5.8.9.3 2-1.4 1.6-1.8 2.1-.4.3-.4 1.3l-2.6.4s-.9-.8-1.1.4 1 2.1 1 2.1-1.8 2.6-1.5 3.3.9 1.6.6 2.1-.1.8-.8 1.3-.1 1-.5 1.5-.8 1.3-1.6 1.6-1.1 1-1.1 1l-.6 1.1s-.5.6.1 1.4 1.3.3.9 1.6-.3 1.8-.3 1.8 1.3-1.4 1.1 2.4-.8 4.6-.8 4.6-.6-.1-.4 1 .8 2.1.1 2.8-.5-.4-1.5 1.6 0 4.8.6 5.4 1.1.8 1 2-.8 1.4-.3 2.3 2.1 1.5 2.4 2.4-.3 1.5.3 2.1l1.1 1.1s-.3 1-.3 2.1-.5 1-.5 2 0 2.3.5 1 .4-1.3.9-1.8 2.1-.5 2.6-.5 1-.8 1.9-.4 1 0 1.5 1.3.3 1.5 1.3 1.8 1.9.1 2.9.1 1.3-.8 1.5.4 1.8 1.5.3 2-1.8 0-3.3.5-1.5.5-2 .6-.5.5-1.4.9-.4.8-2 .4-1 .1-2.1-.6-1.6-1.1-1.6-1.6-.8-1-.8-1l-2.9-2.5h-3.4c-.7 0-1.3-.6-1.3-.6l-1.8.1s-.4-.4-.2-1 .3-.6-.1-.6-1.2-.1-1.8-.3 0-1-.1-1.3-1.3-.3-1.9-.3-1.5-.4-2-1-.4-.8-1.4-1.7-.8-1-1.7-1.3-1.3-.3-1.4-1-.9-.9-1.3-1.6 0-1.3-.9-1.8-1.1-.1-1.2-1.3.2-1.8-.1-2.4-.1-.1-.6-.9-.8-.9-.9-1.8-.2-1.3-.5-1.9-.9-.8-.9-1.4-.1-.9-.1-1.4.2-1-.1-2.3-.1-1.6-.8-2.3-.7-.3-1.2-1.9-1.1-1.9-.8-2.7.5-.9.6-1.6.4-.5.5-1.4.1-.6.1-1.8-.8.3.1-2.9.9-3.1.9-3.9 1.3-.9.8-2.2-.7-1.3-.6-2.2.6-1.3.5-1.7.1-.3-.1-.8.5-.3-.3-.9-1.1-.5-1.2-1.4-.1-1.7-.1-5.4-.2-3.9.4-5 .9-1.2.9-2.1.5-2 .1-3.1-.7-1.2-.3-1.8.7-.6.7-1.4 0 .3.1-1.3-.4-.4.2-2.6.9-4.3.9-5.3.1-1.4-.2-2-.8-3.6-.8-4.6.2-.8.4-1.8.3-1.2.3-1.5 0-.6.2-1.4-.2-2.5.5-4.3.9-1.1.7-2.3-1.6-3.3-1.2-4.6.9-1.1.8-2.9-.3-4.3.2-5.3.7-4.4.5-5.3l.2-.1c.4-2.9-1.1-5.4-1.1-5.4s1.5-1.6 2.4-1.9 1 1.6.8 2.6.1 2 1.3 3.1 2.4 2.4 2.9 3.3 1.8 1.6 2 2.6.6 2 1.9 3 2-.1 2.3-.9-.1-2.5.1-4.3 2.5.3 2.5.3.9 1.9 1.3 2.5 2 .4 2.8-.4 1.3-.6 1.8-.6 1.5 1 3.3.8 1.9-.4 3.4 1 .3 2.1 1.6 3 1.4 0 2.3.4.4 1.5 1.8 2.4 5 .1 6.3.6 0 1.6 0 2.5 0 3.3-.6 3.5-1.5 2-1.4 3.4 3.4 0 4.8-.6 2-.5 3.4-1.8 5.1-3.6 5.1-3.6z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkVJREFUeNqslltrE0EYhveQQ5PY VGy0itVeWEFvlfbGK/GXe6NXKihI0aJYD7Sxkbok2sR213fgmfIxrOlm7cDD7DKz8853mG8njqq3 OOiLoK/08bxxT1O0RIOxEzETfxAr5onOE0pYfAkui2uiz3gmhuJIHIMTzRcRSkVHXBU3EXD9Js8R IrviK8+u/y5+I1acJ+RF1sUD8VBsILoWWHTA4p/ES/FafBPj0Lr0HyK3xLZ4Ih6J+wivimXRQ3Ag brCBZRM/Z9XUCjWCmHhLthDZ4r3DeGy8kJIcTvQSDIxrj0mYU2tRzEfXjSXbWNZjXhy42r8nbLiL VW7uD9w6LhNyE++Kx7hrA5Gk4jFJyVI3fyL2xQgXFomZ2CSF1zG/U1EkCrwyYMMuQ69gbZwEk3rQ WlDExtl9f1vcIxTtyAS4SRa57FnhPa4hFK7V92v5Xbdw1x36VlS/2XJ1tuHEBLKLNV2TZRfWEkqF S8Ff4if9adWqXNIKqoItuGcBn5nadeBT8j9EfHnKvFhiBo+oU7YwLtpyztCe2OEsTa1FBSVjSIEc 1hDzGx7hmV0qhCtDRRpMLExi9OkbFRLDxznDkqfilThEKEpLdjShb1MoO8G8OPgmJ8YZLnshnouP JFYeVu8cd30xi+WI+pLUNmfDbmyEy9+KZ+IDBbX0NxFhvhP7zEIn+Dn88TUYy5j7XrwR7xAZ2tSu +ytf49TPSOEdhPawbFx2d6h7ObEW7WP1xAgUF3HdCmM0RTSve9067wK50CXyrwADAPtOt60mFOld AAAAAElFTkSuQmCC"
            transform="translate(347.997 510.655)"
          />
          <path
            className="territory, st3"
            d="M361.1 532.8c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 354.64 527.43)"
            className="armies, territory, st4, st5"
          >
            {getArmy("argentina")}
          </text>
        </g>
        <g id="eastern_united_states">
          <path
            className="territory, border"
            style={{fill: getColor("eastern_united_states"), stroke: getStroke("eastern_united_states"), strokeWidth: getStrokeWidth("eastern_united_states")}}
            d="m326.2 264.3 6.3.1c.7.4.4 5.3.4 5.3s3.4-1.8 5.8-1.1c2.5.7 4.8-3.2 5.3-.9s1.8 4.2 2.3 4.9c.5.7.7 1.8 1.8 4.6s1.6 5.7.9 6.9c-.7 1.2-2.7 3-1.1 3.9s3 2.3 3.9 3.2c.9.9 4.9-2.3 4.8-3.5-.2-1.2-.7-2.1.2-2.5s2.3.2 3-.7c.7-.9 1.9-2.5 3-2.3s3.5-.7 3.5-.7 1.8-.5 1.8-1.4c0 0 10.3-.3 11.8-1.2 1.6-1 1.8-.8 1.8-.8s-.7-3.9-.4-4.2c.4-.3 1.1-.5 1.9-1.2.7-.7 1.8-.8 2.8-.6 1 .2 4.5 2.3 4.1 4.2-.4 1.9-1.9 5.6-.4 5.7 1.6.1 2.8-.1 3.1 1 .3 1.1.5 1.9 1.1 2 .5.2 2.4-.5 2.4-.8s-.8 1.1-1.4 2.3-1.7 2.2-1.7 2.2c-2.1.9-2.5 3.6-3.3 2.5s-1.8-1.1-.9-2.8 1.5-1.4 1.3-2.9.8-1.6-.5-1.8-.6-.1-2.1.4-1.4-1.1-2.6.9-1.6 1.9-2.5 2.4-.5 1.1-1.1 1.9-.9 1.1-1.4 1.8-.6.6-.6 2 1.1 3.6 1.1 3.6-.6 1.8-1.4 2.1-.9-.9-4.1 2.9-2.9 4.1-4.9 5-1.8 1-1.9 1.5-1.5 1.1-.8 2.3 0 1.4 1.1 1.9 2.3-.5 2.1 1.1-1.4 3.3-3.4 4.5-4.6 5.1-7.3 5.8-3.8 1.5-3.6 2.8 0 2.8-1.4 2.8-.5.6-.5 3.6.3 3.9.9 5 .9 1.1.9 2.9 0 3-.1 3.5 1 .4-.9 1.5-3.5 1.8-4.3-.1-2.3-1.4-2.4-2.9.5-5.1.5-5.1-1.9-.5-2.1-1.5-1-3.4-1.5-3.8-1.5-1.3-2.5-.8-2.8 1.5-3.4 1.4.9.1-2.6-.9-5.1-1.5-6.6-1.6-5-.1-5.6 0-6.6 1.5-7.4 1.5-6 1.3-7.4 2.4-1.3 3-2.8 3.6-2 .9-2 .9-1.5 1.8-1.6 2.8-1.4 2.8-2 3.1-.8.3-.4 1.4c0 0-2-1.3-2-2.1s1.5-2 1.9-3.6 1.1-3.1 1.1-4-.1-3.5-.1-3.5-1.3-4.6-.9-5.4-1.4-1-1.4-1-.6-1.9-.1-2.5 2.4-.6 2.9-.9 2.3-.8 2.3-.8 1-5.5 1-6.1.8-4 .8-4.6 3.4-1.9 3.9-2.1 2.3 1.1 2.4-.3 0-4.5.1-5.4.5-1.5 1-1.8 11.4-.1 11.9-.6-.6-36.8.2-37.3z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjBJREFUeNqslklLA0EQhWdLos4Q l+CCUQOiIoJHL4J/3Zsnl6OK6MF9AzEhGo2ZGV/LKymaSZwkNnwUZEK9rqWr23XyLdeyZqWWzeWg 13cPBKAECvzNOP8CbdpU0ZeQCBjHIZgCc6BM0Q5ogCfwCj6IEU3yColABCpgCayCdTALiozkEZyD Wwoa+wxaIP5LyIiMghmwDNbAJoUWMyJ6pPNLcAiOwE2WWGCJFiiyBbbBBqgxstCq0STT2eJGpujP fL+2xQIrmoiRGJEdpi2igGdlwGMaQ7UJT3WiiexdahZY0VSYrg2KTAC/Sy1d1TQhU+vQsUntJ7hj PdNA7S5kmjZpox4iWQ00BhbYeS9M34u0v6QjYI5XSEXVI+/SjVSjHREfktMSC7vOlIXqmzOA2DSY Z+p/Nuyp+pR5TsoDRKPrVqKfFUZV1BGJWHEIEfHjs17jtL5E9J8r5dkxbV2njaUZnC5DctDV5ki6 oG1L6kRERkpjCDHxVbd9SUTmcD2AU3AFmt2m8B8rYQRvpC0blog6PFxn4ATc6/HRh0iL6brh9fGb GV/9MSYuz0KZXRPk6MKEGzMCB2APHFMstoVSFfYXz0NEUT/jakmtLjMi+2CXYg8sSZolFDP8Jv9U oJBrpTHhZt5Z8Fs636WY3ElJ1jXhKKFrq3Y1jhWZHE6/F1+33PtqZlU5SqpqrDgs+sBXedbbYYRM UERHNNTjJOty07NQ0t35j+dWnkdkXw/IbwEGAIxFwpD+HE9vAAAAAElFTkSuQmCC"
            transform="translate(332.997 295.655)"
          />
          <path
            className="territory, st3"
            d="M345.9 317.8c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 4.9-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 339.41 312.343)"
            className="armies, territory, st4, st5"
          >
            {getArmy("eastern_united_states")}
          </text>
        </g>
        <g id="western_united_states">
          <path
            className="territory, border"
            style={{fill: getColor("western_united_states"), stroke: getStroke("western_united_states"), strokeWidth: getStrokeWidth("western_united_states")}}
            d="M326.2 264.3c-.9.5.1 36.6-.4 37.1s-11.4.4-11.9.6-.9.9-1 1.8 0 4-.1 5.4-1.9 0-2.4.3-3.9 1.5-3.9 2.1-.8 4-.8 4.6-1 6.1-1 6.1-1.8.5-2.3.8-2.4.3-2.9.9.1 2.5.1 2.5 1.8.3 1.4 1 .9 5.4.8 5.1-3.4 0-4.4.1-2.3-.9-2.6-1.4-.8-1.1-1.9-1.1-3.4-2.8-4-3.3-8.4 0-9.4 0-2.4-2.4-2.4-2.4l-3.9-2.1s-6.6 0-7.8.1-1.8-3.4-1.8-3.4c-.5-2.1-.8-1.6-.8-3.5s-2.9-5.5-4.3-7.5-1.4-7.4-1.1-8.8-.3-6.4.6-8.5.9-5.1 1.5-8-.1-2.3 1.4-5.9 1.4-1.3 1.6-4.4 1.3-1.3 1.4-3.9.6-3.9-.3-5.1c0 0-.3.8.8 1s58 .8 61.8-.2z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlpJREFUeNqslttrE0EUh/eSTUyi tbS01luLWEVfhVbQN/2/++SblxdBRIugbWrTENtKbNPc1t/AN3IYknUbHfgYspk9vzlzLjtxVG7E wexHHsx/NVD0fyIqoiYy844zPhQXYiQmRYJFQgmGr4olsSYWEI0w/lMcih/iF8JTBWcJpaIuVsU9 8VA8EjfwLMKTtvgoPotvoit6RrBQyIvcEU/EU/FYrONRxrohHu0h9F58El/EkTi3YukMkbtiW7wU z8QDvHNCDdY0xTWxzLHe5Iid8VNxZoUqQUy8J1uIbPG7wf/xjDg2EVnmeRdvT8TYeuQMVNmZ92Qb z5qsiwuyMiV2NQx3SJJeKJRg0B3RC/FcbPAsKVlnsdmQy8DveOaSJk/MwivEYYO5XlLEimUc3yYs EZ44MQsWxS2xModIFJzMOuWw5svBG6vixaaplXgOIb/pBez4cvjjUYWHq6b65xGKjL2qtZNE/3/k tKcBc+6FctO3jphHZTryDBHfMdrMQ5t1A0R2WXDxD0K+B+5ic2A9GlLFBxTbedgUS44J73awdRJ6 5MT67ODrtKZ4CRFro+9PJg3cznnWMA20TAZOaKL74o14JT6I47AF2UD6D1iNj159SpePzcbGRuS1 2EHs0MY6FBrjfo9FGa0pRnwUbOqMzGphfAex/fDoK8FOvdCeSfsunwrXWq5T1A1E2gTexeSteGdE xpf5lLu+d5s+2KSt3EfwlBRuEfiWydjxPJcTf/vJEFgxHnVI4T4MZ2VqmeuW/d5k9LCUXQ98nRjm utcVCZe+PLrxW4ABAIbswX/oKmt9AAAAAElFTkSuQmCC"
            transform="translate(274.997 281.655)"
          />
          <path
            className="territory, st3"
            d="M288 303.7c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 281.539 298.293)"
            className="armies, territory, st4, st5"
          >
            {getArmy("western_united_states")}
          </text>
        </g>
        <g id="quebec">
          <path
            className="territory, border"
            style={{fill: getColor("quebec"), stroke: getStroke("quebec"), strokeWidth: getStrokeWidth("quebec")}}
            d="M359.7 259.2s.7-3.7 1.9-4.6 1.9-5.7 1.4-6.7c-.5-1.1-1.4-1.4-.7-3s.4-4.2 2.1-3.7c1.8.5 3.5.4 3.9-.9.4-1.2-.2-1.2 0-2.3s1.1-1.4 1.8-1.6c.7-.2 1.2.4.7-2.1s0-1.4-.7-3.2-.2-.7-.9-2.3c-.7-1.6-1.2-4.1.5-4.2 1.8-.2-.2-2.3 1.1-2.8s3.5.2 3-1.9-3.2-6.4-1.4-6.5c1.8-.2 4.3.7 4.3.7l6.3.4s-.6 2.4 1.3 2.6 2.1 1.4 2.8 1.8 1.6 1.3 1.4 1.8-.3 1-.1 1.9.8 2.1.3 2.4-1 1-.9 2 .5 2.5.5 2.5 1 1.4 2.3.8.9-1.1 2.5-1.9 1.6.9 2.6-.8.9-1.9 1.1-2.5 1.5-2.3 2.5-1.8-.3 5 .7 6.6c1.1 1.6 2.5-.6 2.6.2s.3 1.6.4 2.3-.8 1.1 0 2.1.9 1.3.8 2 .4 1.4.4 1.4 1.4-1.3 2 .3.1 2.4 1.3 2.4 2.4 1.8 2.4 1.8l.5 2.6 2.9-2 2.8.9s-3.8 1.8-3.1 3.6 4.6-2.1 4.6.3-.5 4.9-1.4 5.1-2.4.9-2.6 1.5-1.9 1.7-3 1.9.6 1.3-1.8 1.6-3.1.3-3.6.3-.5.5-1.1 1.6-.1 1.5-.8 2 2.3 0-1.6.9-4.5 1.1-4.5 1.1-.3.4-1.5.4-1.8-.6-1.8-.6-.3-.6-2-.6-3.4 1.6-3.4 1.6-.5.6-1.5.8-2.4 1.4-2.4 1.4-1.4.4-1 1.9 1.8 2.9 2.6 1.9 2.3-5 4.1-4.6 4.4 1.1 3.9 3.9-.6 2.3-.3 3.6 1.3 2.1 1.1 3.4-1.3.9.1 2 2.9 2.9 3.4 1.3 1.1-2.8 1.8-2.5 2.4-.5 1.1 2-1 2.6-2.1 3.4-1-1.3-3 1.8c0 .3-1.8 1-2.4.8-.5-.2-.8-1-1.1-2-.3-1.1-1.5-.9-3.1-1s-.1-3.7.4-5.7c.4-1.9-3.1-4-4.1-4.2s-2-.1-2.8.6c-.7.7-1.5 1-1.9 1.2-.4.3.4 4.2.4 4.2s-.2-.2-1.8.8-11.8 1.2-11.8 1.2c0-.9 0-3.9-1.1-3.7-1.1.2-.9.7-1.6.2s-.9-1.2-1.6-.5-.4 2.3-1.1 2.1c-.7-.2-1.8-1.8-2.5-1.6-.7.2-1.8 1.6-1.8 1.6s.4-17 1.1-18.9h.2v-.8z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={26}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAaCAYAAABCfffNAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjpJREFUeNqslk1PU0EUhjv3ttZS BQMi4BcbTHCrgY0r4w934cYQE01cSPyKQYkograW1rbQ6zvJM+ZknFvahkmeTHpn5rxzzpk5U1eZ rLmo962I+nMXl40FauISvcPwUPTFqRiNEysTyTB4Ga6JG2JeVDHcFgfiWJwgmhRLieSiIZbFLYz7 fkOs4NFAfBO74p3YE0eiY8RKRYLAbfFAPBTrCK4kPPmMyGvxVnwU30XPCuUJgTtiWzwRj8R9RJcQ mRNNcZVvq2JNLGK4JbpWpGpyEDzYQmCL3w3GXeR5yFsTgSW+H+HlL3EWdu+I86rxYBuPmmaOS+Qz Y7wO3ughB6ITi/gQ3BOPCdE6AtmEd8gZW/6kfcUjf8SLzNyDBXOaGhMKWKEaIduARdLhsmhSnX4a AZsj7/1dsUn465WEMVeZvYWNzpvjXrOeXFRLlaDKRYuUxrGSqKyztlA4B/SFFUkOzijQpq61g61s 3OCUIiPuyB6F84B78s+TPh93mdSJK+kEXvgo/KBgvucJ8IW0yKOJ4UJd58xXS0pK7MEAo36Tz8Qr BE/jKnwGjodqDpE8EgkvY8H8HlF4I16IHfHJVuI84fIJC4dhJ0weRQnukr8vGH8qnhOulln7n0jY 2U8en0MWeH6zsE8oPhCel4Roh2+t+OC4Me/7FYrcGi/jTQrfAoZ8cvfZzD4b6qXeeTemPGTkxP6Z WCZXXYz6h+kPDMtOpJvwrbA1KSes9uIWs/wlOu8PXjFNGforwADxgreFN5zlOAAAAABJRU5ErkJg gg=="
            transform="translate(371.997 236.655)"
          />
          <path
            className="territory, st3"
            d="M384.2 258.7c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 377.747 253.29)"
            className="armies, territory, st4, st5"
          >
            {getArmy("quebec")}
          </text>
        </g>
        <g id="central_america">
          <path
            className="territory, border"
            style={{fill: getColor("central_america"), stroke: getStroke("central_america"), strokeWidth: getStrokeWidth("central_america")}}
            d="M264 319.1s.6 3.5 1.8 3.4 7.8-.1 7.8-.1l3.9 2.1s1.4 2.4 2.4 2.4 8.8-.5 9.4 0 2.9 3.3 4 3.3 1.5.6 1.9 1.1 1.6 1.5 2.6 1.4 4.3-.4 4.4 0c.1.1.2 2.8.2 3.6s-.8 2.4-1.1 4-1.9 2.8-1.9 3.6 2 2.1 2 2.1c-.5 2.8-.9 5.5.3 6.6l.1 2.3 1.5 2.6s2.3 3.3 5.1 2.4 1.5-.3 3.9-1.4 1.6 1.3 2.9-1.3.4-2.8 1.8-3.3.6-1 2.4-.5.1.6 2.4.8 2.5-2.4 2.3.5-.5 3-.8 3.8.4-.1-.5 1.5-1.4 1.8-2 2.1-1 .6-1 1.8.3 2-.9 2.5-2.3-.1-2 1.3-.1 1.8.9 2.4 1.8.8 2.4 1.9.9 2.5.6 3-.1 2.1-.9 2.5-1.8.1-1.8 1.8.8 2.9 0 3.3-2-.5-2.3.4-.4 1.6-.5 2.4-.8.9-.8 1.4v1.6c0 1.3-.9 2.3.4 2.5s1.9.6 2.5.3 1.4-.5 1.9-.9 1.3-1.4 2-1.4 2.3.4 2.3.4.8 1.9.6 2.5.4.5.3 2-.1 2.6-.4 3.1l-.9 1.5c-.3.5 0 .5-.3 1.3s.1 1.9-.5 1.4-.3-.5-.6-1-.6-1.1-1.4-2.4-.6-.5-2.1-1.3-1.4-1.6-2.4-1.1-.6 1.4-1.8.6-1.5-.8-2.1-1.8-.5-.9-.9-1.6-1.4-.3-1.4-1.6.4-1.6 0-2.4-.8-1.1-1-1.8-.4-.1-.4-1.4v-2.6c0-.5-.5-2.5-.5-2.5l-.6-1.3s-.1-.1-.6-.9-.5-.4-.9-1.6-1.3-2.8-1.5-3.8-1.6-2.3-5.8-3.8-3.9-1.9-7.4-2.6-4.8-1.4-4.8-2.9 0-2-.9-2.5-1.8-.6-1.4-1.5 1-1 1.6-2.1.8-1.4.8-2.3.4-1-1-1.6-4.1-3-4.1-3 1.6-.4-1.9.1-3.8 2.5-4.8 1.3.8-5.6-.5-6.3-1.1.3-1.9-1.4-.1-3-.5-4.4 0 .8-1-3.9.9-3.4-1.4-6-5-2.4-5.3-4.5c.2.1.3-5.6.1-6.1z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAehJREFUeNq8lltLw0AQhdNt0ngJ 9YaXqoi+lPgqQv+A/1sQX0TxUasIomipFm+1WJvaxLNyFrZLkqYluPCx0KZ75sxsZ1Kw0lfB2M0V GXvqIXGfC2ADFzgxz8qD+6AHfkCYJBYnInioBxbBGihTsKAJyIPboAleQYei4SiRIpgGK2AHVIEP VulIX9LBE6iDa3ALnkEXDJJEpIMZsAn2QA3sgi06cQyRPp3cg0twAs7Bgylka2IOHUiBA7APKkxb Uk0WwJKRUotCXyp1tubCY4pqFNimM5FyQVT9XO0sWasAPHKPVDFtFrnKFFUoUMxwxeUzs0yzugyy Vh/gXaZN8GGXln3WwGOUWZeqZ4VBVhn0nwmh1aPMW1ROqEEWIY9B+gzatbRolVBpQgErLViRsQOM KzQUrLD+YeUtovpZwD2KE4lyEFBXuK2ERFoEE4iofnbDPhYoJ4kRjCkSsme1QIN/xCEnPbbsOhte hw0uGlNARn/H/Vv9vmjYdfhPndf6kRgxGUM2Q9kUz8AxuABvqhPrIgNjwoUUKWkXJNIImfM2BU7B IYWazE6sk4CNrcVIIopY/K6r8cm0XFHgiAJqnoTmPNHz2tAOeOFlWAdTeUxG8yVCjuFlsAHm8pzx SQMp97eV3N+7fgUYADQWsEItaKqaAAAAAElFTkSuQmCC"
            transform="translate(281.997 343.655)"
          />
          <path
            className="territory, st3"
            d="M294.2 365.3c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 287.705 359.873)"
            className="armies, territory, st4, st5"
          >
            {getArmy("central_america")}
          </text>
        </g>
        <g id="peru">
          <path
            className="territory, border"
            style={{fill: getColor("peru"), stroke: getStroke("peru"), strokeWidth: getStrokeWidth("peru")}}
            d="M347.1 472.5c.9-.3 1 1.6.8 2.6s.1 2 1.3 3.1 2.4 2.4 2.9 3.3 1.8 1.6 2 2.6.6 2 1.9 3 2-.1 2.3-.9-.1-2.5.1-4.3 2.5.3 2.5.3.9 1.9 1.3 2.5 2 .4 2.8-.4 1.3-.6 1.8-.6 1.5 1 3.3.8 1.9-.4 3.4 1 .3 2.1 1.6 3 1.4 0 2.3.4.4 1.5 1.8 2.4 5 .1 6.3.6 0 1.6 0 2.5 0 3.3-.6 3.5-1.5 2-1.4 3.4 3.4 0 4.8-.6 2-.5 3.4-1.8 5.1-3.4 5.1-3.4c-.1-1.8-3-2.8-3.4-5.4s-.8-4.5-1.4-5-1.3 0-2.1-1.4-1.5-1.9-3-2.8-.8-2.3-.5-3.4-1-4.4-1.8-5.9-1.6-1.5-2-3.3-.5-2.3-1.6-3.1-2.6-1-2.9-1.8.3-1.8-.5-2.5-1.4-2.5-2-3.8-2.9-.1-4.5-.1-1.6-2.1-2.6-2.8-2-.1-3.1-.6-.6-1.4-2.1-1.5-1.6-1.3-2.4-2.5-3.1-2.4-4.1-2.3-1.4 1.4-1.9 1.9-2.4.5-4.3.9-4.4 2.3-7.1 2.4-2.6-2.9-2.4-4.3 3.9-1.8 4.1-3.9-3.3-.3-4.6-1-4.9-.9-5-1.9-1.4-1.1-2.4-1.1-2.4-1.3-3.1-2.6 1.3-2 1.4-3 2.9-.6 3.9-1.4.8-4.6.9-5.3 4.2-.6 4.2-.6-.8-2.1-1.3-2.7-1.5-.8-2.2-1-1.9-1.4-2.7-1.3c-.9.1-3.2.1-3.8-.6-.6-.7-1.7-1.5-3.3-1.6s-2.3 1.1-3.4-.6-3-4-3.5-4.1-3-.4-2.3-1.1c-1.9 1.3-1.8 3.8-2.5 5.6s-1.4 2.6-2 4.6.4 1.5 1.1 3.6-.3 1-.6 2.3-.1 5.3-.1 5.3.9 2.6 1.4 3.1 2.5 2.8 2.5 2.8-.3 1.6.3 3.6 1.4 1.3 1.9 2.3 2.5 3.1 3.1 3.6 2 2.6 3.4 3.1.4 2.4.3 3.4 1.4 3.3 1.9 4.3.8.3 1.3 1 1.9 1.8 2.8 2.3 1.8.6 1.8.6 1.3 1.1 2.1 1.8 2 .9 2.8 1.1 2 3 2.6 3.6c0 0 2.8 1.1 3.4 1.3s.8-1.1 1.6-1.2z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={25}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfpJREFUeNq0lt1LAlEQxfdLTZGN Cissgh4KX4yIInqL+sODHoJIegr6eAmkyIyC1BLd3O3cOBeGy+7qYl74cUXXOTNz78ysbaUv29jN FRl7qpG45YAcKHC3YwQCMAA/IEwSsxO+UwJFUAFrYB544vmIhjugBT5Aj6LhOBHtfRlUwQ7Y4+c5 41kVwSu4Aw/gEbRBH4ySRNTnPFgCW6AODilUobhcASNpgltwCa7BkynkGVGUKXAKDsA2WGYUTsyZ LNCpVeALe0roW6fOEwJFpqVOgToN5GME4i6HtqXOagieuUeuSJPyZh8cg12wwj87Y26nFlJOlpjG Ni/DQIqUmKYTcATWE1KUJuYRFckbeAFdlTKHD+R4Tas85CwC5plugBozU7CEIdsovKwC0obPVPu6 iJ0MHSCLUF52CceazbLNPM5iRWki0T8YD1gfgbbnxHTU2CaXQaDDntbRQo748ZNVqptcVqGQnbjJ ptmi05ZrHJLHwvS5exPeuJC9SvWsK3DBrvzXv1wj1C/uBRZWUQjZCSkyBc7BDXhn9VtSZMQ09Rhm TkTjGgNLGx8y91rgDDTYUgb64F3DqxG96lIw0N6I7tonXZ7fvYigIeZJmFbhLtOk5sgmZ0pNdOWp JmPSGF40hpI97YyPmxVewhvLVG8rWd69Jnrv+hVgAPPzpYoUe0sSAAAAAElFTkSuQmCC"
            transform="translate(345.997 453.655)"
          />
          <path
            className="territory, st3"
            d="M358.4 475.3c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c0 4.9-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 351.9 469.84)"
            className="armies, territory, st4, st5"
          >
            {getArmy("peru")}
          </text>
        </g>
        <g id="western_australia">
          <path
            className="territory, border"
            style={{fill: getColor("western_australia"), stroke: getStroke("western_australia"), strokeWidth: getStrokeWidth("western_australia")}}
            d="m862.5 599.9.2-.3s0-5.7.2-7.1c.2-1.4-.4-1.2-1.1-2.3-.7-1.1.9-42.2.7-43.1-.2-.9-29.9.4-29.9.4l-.6-37.7-2.1-1.2s-1.6-1.1-2.5-1.6-1.6 1.9-2.3 2.3l-2.8 1.6s-.5 1.8-.9 3-1.9.2-3.9.9c-1.9.7-.2.7-.7 2.5s-.5.2-2.1.2-.7.7-1.8 2.1c-1.1 1.4-1.2.4-2.7 1.6-1.4 1.2-.4 1.2-1.2 3s-1.1.9-2.1 1.6-2.8 2.5-3.9 3.5c-1.1 1.1-1.6.5-3.7.4-2.1-.2-.9 0-2.5.2s-1.2 1.2-2.3 2.1c-1.1.9-1.6 1.2-2.8 2.5s-.5.5-2.5.7c-1.9.2-1.1.2-3 1.4s-.2 1.6-.4 3-.5 1.4-1.1 2.7 0 1.6.5 3 1.6.5 1.6.5-.4 2.1 0 2.8-.2 0-1.8 0-.7.5-.7 1.8v1.2s-.5.2-1.1 1.2 0 .9.2 2.1c.2 1.2.4 1.8.9 3s1.1.9 1.9 2.8c.9 1.9.4 2.1.4 3.9s0 1.2.2 3.5 1.2 1.6 1.2 1.6 1.2.9 1.9 1.4.7 1.1 1.1 2.8c.4 1.8-.5 1.4-.9 2.5s0 .7-.2 2.8-.9 1.2-1.6 2.1c-.7.9-.5.9-1.1 2.3-.5 1.4 0 1.1.9 1.8s1.9 1.2 3 2.1c2.4 2.7 5.1 2 8.1.4 1.6-.9.9-1.1 2.1-1.6s.9-.4 1.6-.7c.7-.4 1.2-.9 2.3-1.9 1.1-1.1.4-.2 1.6-.9 1.2-.7 1.4-1.2 3.4-1.9 1.9-.7 2.5-.2 2.5-.2h1.6c1.6 0 .7.2 1.1.9.4.7 1.4.7 2.1.7s1.8-.2 2.7-.5c.9-.4-.2-1.6-.2-2.3s0-.9.5-2.1c.5-1.2 2.1-1.6 2.8-1.6s2.5-.4 3.2-1.1c.7-.7 1.1-.4 2.5-.5 1.4-.2 1.2-.5 2.3-1.6s1.1-.5 3-.5h3c1.9 0 1.8.2 3 .4s1.9 1.4 2.8 1.9.4.7.4 2.1c0 1.4.2 1.6 1.6 4.1 1.4 2.5 2.1 2.5 2.1 2.5s1.2-1.8 2.3-3.4.9-.5 2.5-1.1c1.6-.5.5-1.1.9-3.4s1.1-.7 2.3-.5 0 2.3-.4 3.5-1.1 1.6-1.9 2.5c-.9.9-.9 1.1-1.9 2.3s-.5 1.1-.4 2.5c.2 1.4 1.9-1.2 2.7-2.3.7-1.1.7-.4 1.6-.2.9.2.2 2.3.2 3.4s.2.9 1.1 1.4c.9.5.9 1.6.4 3s0 1.4.2 2.5 2.1 3.7 2.8 4.4.5.4 1.2.7c.8.2.5.6 1.7 1.5z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkFJREFUeNqslttLW0EQxs8lyTEm xGtjVaooUaLggw++CLZ/vCIUxYe20FYLBW/EK96jiTmn38I3MKybnKN24cc+7Dnz7czOzK7vZRu+ NctIrDnVQK/1AORABPLqH2O8DZ7AM4h7CfopAsZwCQyDj6BCUY/Gb0ADXIJ7CjsFXUIiUAYjYArM gToYo2cePTkBv8Ae2AfnlmBXISNSBFUwC+bBEoU+0aM8v23TowOwC76DnxS9AC3tWc4SzVNkBayC RTBNz0qOMxoCo/R6Bkwob69AxyUUMFyzFFmjgTIFgi4RMGv93IhZP+WZGbEHCWGovCmAcXrzmWcy 2EPEzsoCMZ7eUuyFUMj4L4AvYBl8sEKVpQxErAmO9VnJTnNM4RoZeYWIDmMfz3iac5/YCPhRxDqp 81xKas17pViR0ZhQofcDlW0V1knlDd7oEEa0U6NXBe2RiBXeISJ2QmbhAOdQPPqfI2HtmGy75tyR ZNANssU5eYeQtKY/rKmWhC5R7eSE81vFzD+P4IzpfSW2AtUyGmyQpjne2U0xo0ibxo8o9igbDq0P 86yhUUdvSxsxo/EbbIBvLNiOLdQhPmuhwqzJpYglFDEHfwi2wCb462pB8kNL3ScRG2pRfZdYxPzn hiLbYB38oDfPru4ds0cdKg/EUFXdQ3pIEu3zLvoKdpht7W73kYSvycss4Y7MzibZt+yhb9ldhuuU NuIsb4ZQ9axJVrl9Vonj3XDnusbTXkFyqUU9si/zSyjLc8vLkHWpb7t/AgwAXruzaGx40hUAAAAA SUVORK5CYII="
            transform="translate(797.996 540.655)"
          />
          <path
            className="territory, st3"
            d="M810.9 562.6c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c0 4.9-4.1 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 804.36 557.154)"
            className="armies, territory, st4, st5"
          >
            {getArmy("western_australia")}
          </text>
        </g>
        <g id="alberta">
          <path
            className="territory, border"
            style={{fill: getColor("alberta"), stroke: getStroke("alberta"), strokeWidth: getStrokeWidth("alberta")}}
            d="M253.4 214.7s.1.1.6 1.6.9 2.5 2 4.5.1 8 .1 8l2 2.8s1.6.8 2.3.9.4 3.3.3 4.5-1.6.6-2.5.9-1.1 2.4-1.3 3.6-2.4.8-2.4.8c.6 1.3 1.9 1.4 2.4 3.6s.3 1.5.9 2.4 1.8 1 2 3 .3.9 1.6 3.5.1 3.8.4 6.1 1.5 1.5 2.4 2.8l.4 1.4 48-.1 4-48.4c-.1-.1-63-1.9-63.2-1.9z"
          />
          <image className="territory"
            style={{
              overflow: "visible",
              opacity: 0.25,
              enableBackground: "new",
            }}
            width={26}
            height={25}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAghJREFUeNrElmdLA0EQhr0Wowa7 xoYFROJXEfIH/OeCIIpfFCwIYm8otiTmqu/CuzIs3uVyiC48DLnbzLszOzt7Vk/nYRnWHIlhM52k vbOBC3qB98N85TwAbRCCOE0wTcim4woYBVNgkKKWEFHO38AdeAYfFI7zCDmgD0yCJbACaqDKyORQ kdyDI3ACzsADaIEoS0hF0g/mwBqog1Uwz4g8Y37AiC7AIdgGe+DKFHMNUY+RKJENsA6mmcK0PRoB Y0Z6eyjW1Gl0jWgqTFedIouM0M6xn73CX8i03gBfLcgV0bjc+BWma5oiTo7yV3MGmPKAhXFJq34n tphcpvMa96TC1eYdtiiiBdqyzoQpNAFmwXDKnuQVU35mpB9bFMEwX07IlXQ5LO6VOgrLjKokIyrx 4bI4L0WFPFZfVRyJ74gcbvyQKIAiQrKwSrKT2DwLEWv+lTbq1CQzhm5NPm0iU+ezdZyypbQLCiWi W9zTfpe3fvnCA/YIPgsKqS7QYEs6YrNty4gSOlci1xQNuhTTC35iZk55YEN5YLXQLVdywZYfdxmN +s852KdtaB/OD6vy2CTH2VZ05WTdsDGLSDXSHbDFK6OZJhQR3Sn6KeQYF14iBHxuuhLZBZvggCkM 5SVnrs5nyC3mPBQd2edzzTur9ZiRbPI+ujUr999u2D/9ZvjTr6Bf/677EmAA3Rm2Sr0LLNcAAAAA SUVORK5CYII="
            transform="translate(274.997 229.655)"
          />
          <path
            className="territory, st3"
            d="M288 251.2c-5 0-9.1-4.1-9.1-9.1s4.1-9.1 9.1-9.1 9.1 4.1 9.1 9.1c.1 5-4 9.1-9.1 9.1z"
          />
          <text
            transform="matrix(1.0595 0 0 1 281.539 245.804)"
            className="armies, territory, st4, st5"
          >
            {getArmy("alberta")}
          </text>
        </g>
      </g>
    </svg>
  )
}

export default Map