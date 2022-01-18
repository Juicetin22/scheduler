import React from "react";
import classNames from 'classnames';
import "components/Button.scss";

export default function Button(props) {
  console.log(props);
  console.log(props.children);
	console.log(props.disabled);

	const buttonClass = classNames("button", { "button--confirm": props.confirm , "button--danger": props.danger });
	console.log(buttonClass);
  // if (props.confirm) { 
  //   buttonClass += " button--confirm";
  // }

  // if (props.danger) {
  //   buttonClass += " button--danger";
  // }

  return (
  	<button onClick={props.onClick} className={buttonClass} disabled={props.disabled}>
			{props.children}
		</button>
  );
}
