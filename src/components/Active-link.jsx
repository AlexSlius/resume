import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children);
  let className = child.props.className || "";
  props.href = props.href.replace(/\/$/, "");
  let linkRout = router.asPath.split('?')[0];
  // let queryRout = router.asPath.split('?')[1];
  let linkMenu = props.href.split('?')[0];
  let queryMenu = props.href.split('?')[1];
  let lastCharLinkMenu = linkMenu[linkMenu.length - 1];

  if (props?.onQuery?.length > 0) {
    let queryNameQuery = router.query?.[props?.onQuery];

    if (queryMenu.includes(queryNameQuery)) {
      className = `${className} ${props.activeClassName}`;
    }
  }

  if (!(props?.onQuery?.length > 0)) {
    if (lastCharLinkMenu == '/') {
      linkMenu = linkMenu.slice(0, linkMenu.length - 1);
    }

    if (linkRout == linkMenu) {
      className = `${className} ${props.activeClassName}`;
    }
  }

  delete props.activeClassName;

  return <Link legacyBehavior {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
