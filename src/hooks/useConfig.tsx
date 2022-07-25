import { useEffect } from 'react';
import { map, camera, hero } from '../gameConfig';

function setCSSProperty(property: string, value: string) {
  document.documentElement.style.setProperty(property, value);
}

const gameProperties = [
  { name: 'map', values: map },
  { name: 'camera', values: camera },
  { name: 'hero', values: hero },
];

export function useConfig() {
  useEffect(() => {
    /* Creates a camel case CSS custom property prefixed with the name of the config object,
       e.g. --mapGridSize, --cameraRows */
    gameProperties.forEach((configObject) => {
      for (let property in configObject.values) {
        setCSSProperty(
          `--${configObject.name}${property[0].toUpperCase()}${property.slice(
            1
          )}`,
          configObject.values[property as keyof typeof configObject.values]
        );
      }
    });
  }, []);
}
