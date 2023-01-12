import React from "react";
import Swagger from "./Swagger";
const APIS = require("api/v1/api.json");

export default function ApiDefinitions({paths = []}) {
  const api = APIS;

  function renderProperties(defObject) {
    // if there are no properties, render the format or type (this seems to apply only for timestamps)
    if (!defObject?.properties) {
      return defObject?.format || defObject.type;
    }

    return Object.keys(defObject?.properties).reduce((propertiesAcc, property) => {
      const definitionProperty = defObject.properties[property];
      const definitionPropertyRef = definitionProperty?.$ref || definitionProperty?.items?.$ref;

      const propertyName = definitionProperty?.description?.includes("Deprecated")
        ? `${property} deprecated`
        : property;
      // if the property contains a ref, call again extractDefinition
      if (definitionPropertyRef) {
        return {
          ...propertiesAcc,
          [propertyName]:
            definitionProperty.type === "array"
              ? [extractDefinition(definitionPropertyRef)]
              : extractDefinition(definitionPropertyRef),
        };
      } else {
        // if property value is an array, render what type the elements are
        if (definitionProperty.type === "array") {
          return {
            ...propertiesAcc,
            [propertyName]: [definitionProperty?.items.type || definitionProperty.type],
          };
        } else {
          // if the property value is an object that contains the properties key
          // call again renderProperties function in case it has refs inside
          // otherwise render the property type
          return {
            ...propertiesAcc,
            [propertyName]: definitionProperty?.properties
              ? renderProperties(definitionProperty)
              : definitionProperty.type,
          };
        }
      }
    }, {});
  }

  function extractDefinition(ref) {
    const definitionArray = ref?.split("/") || [];
    const def = definitionArray[definitionArray.length - 1];
    const defObject = api.definitions[def];

    // the response has no schema
    if (!defObject) {
      return null;
    }

    // the response schema is type array - encounter only 2 times and seems to always have the items prop
    if (defObject?.type === "array") {
      return {
        items: extractDefinition(defObject.items.$ref),
      };
    }

    return renderProperties(defObject);
  }

  const endpoints = Object.keys(api.paths)
    .filter((path) => paths.some((entry) => path.startsWith(entry)))
    .filter((path) => !path.split("/").includes("internal"))
    .map((path) => {
      return {
        path,
        operations: Object.keys(api.paths[path])
          .filter((method) => method !== "parameters")
          .filter((method) => !method?.tags?.some((tag) => ["private", "system"].includes(tag)))
          .map((method) => {
            const apiMethod = api.paths[path][method];
            const parameters = apiMethod?.parameters;
            const responses = apiMethod?.responses;
            const bodyParameter = parameters?.find((parameter) => parameter.name === "body");
            let body;

            if (bodyParameter) {
              body = bodyParameter.schema?.$ref
                ? extractDefinition(bodyParameter.schema?.$ref)
                : renderProperties(bodyParameter.schema);
            }

            return {
              method,
              ...apiMethod,
              body: JSON.stringify(body, null, 2),
              parameters: parameters?.filter((parameter) => parameter.name !== "body") || [],
              pathParameters: api.paths[path]?.parameters || [],
              responseMessages: Object.keys(responses || {}).map((response) => {
                return {
                  code: response,
                  ...responses[response],
                  schema: JSON.stringify(
                    extractDefinition(responses[response]?.schema?.$ref),
                    null,
                    2
                  ),
                };
              }),
            };
          }),
      };
    });

    console.log(endpoints)

  return <Swagger documentation={{ apis: endpoints }} prefix="https://api.spectrocloud.com" />;
}
