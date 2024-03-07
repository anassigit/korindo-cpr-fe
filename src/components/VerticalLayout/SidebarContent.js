import MetisMenu from "metismenujs";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ReactSession } from 'react-client-session';
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SimpleBar from "simplebar-react";

const SidebarContent = props => {

  const dispatch = useDispatch()

  const ref = useRef();

  useEffect(() => {
    const pathName = props.location.pathname;
    new MetisMenu("#side-menu");
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }
    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");
        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active");
          parent3.childNodes[0].classList.add("mm-active");
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-show");
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show");
              parent5.childNodes[0].classList.add("mm-active");
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  function renderMenuItem(item) {
    return (
      <li key={item.menuId}>
        <a
          onClick={() => {
            // buat apa yang dilakuin kalo udah di click salah satu menu (contoh: clear cache)
          }}
          href={"/" + item.path} className={item.childList ? "has-arrow" : ""}>
          {item.icon && <i className={props.t("mdi " + item.icon)}></i>}
          <span>{props.t(item.menuName)}</span>
        </a>
        {item.childList && (
          <ul className="sub-menu">
            {item.childList.map((childItem) => renderMenuItem(childItem))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu" style={{ marginTop: "40px" }}>
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <a href="/home" onClick={() => {
                
              }}>
                <i className="mdi mdi-home" />
                <span>{props.t("Home")}</span>
              </a>
            </li>
            {/* {Array.isArray(menu?.menu) && menu?.menu.map(item => {
              if (menu.menuType === 'cpr') {
                return renderMenuItem(item)
              } else {
                
                return null
              }
            })} */}

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
