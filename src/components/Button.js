import React from "react";
import classNames from 'classnames';
import "components/Button.scss";

export default function Button(props) {
  // add different button classes to the button component depending on type of button
  const buttonClass = classNames("button", { "button--confirm": props.confirm , "button--danger": props.danger });

  return (
  	<button onClick={props.onClick} className={buttonClass} disabled={props.disabled}>
			{props.children}
		</button>
  );
}
