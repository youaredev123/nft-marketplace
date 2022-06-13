import React from "react";

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) : text;
}

export const hasAnyEmptyField = (source) => {
  for (const property in source) {
    if (!source[property]) {
      return true;
    }
  }
  return false;
}