import { prepareProps } from "utils/tools/prepareProps";

export const DivRef = wp.element.forwardRef<HTMLDivElement, ComponentProps>(
	(props, ref) => {
		const { children, ...rest } = props;

		return (
			<div {...prepareProps(rest)} ref={ref}>
				{children}
			</div>
		);
	}
);