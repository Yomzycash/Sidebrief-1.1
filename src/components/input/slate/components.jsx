import React from "react";
import { ButtonSpan, IconSpan, MenuDiv } from "./style";
import * as Md from "react-icons/md";

export const Button = React.forwardRef(
	({ className, active, reversed, ...props }, ref) => (
		<ButtonSpan
			{...props}
			ref={ref}
			active={active}
			reversed={reversed}
			className={className}
		/>
	)
);

export const Icon = React.forwardRef(
	({ className, children, ...props }, ref) => {
		const Icon = Md[children];

		return (
			<IconSpan {...props} ref={ref} className={className}>
				<Icon />
			</IconSpan>
		);
	}
);

// export const Menu = React.forwardRef(({ className, ...props }, ref) => (
// 	<MenuDiv {...props} data-test-id="menu" ref={ref} className={className} />
// ));

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
	<MenuDiv {...props} ref={ref} className={className} />
));
