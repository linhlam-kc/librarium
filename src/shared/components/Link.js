import React from "react";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteUrl from "is-absolute-url";

const Link = ({ to, ...props }) => {
  if (!to) {
    return <a>{props.children}</a>;
  }
  return isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  );
};

export default Link;
