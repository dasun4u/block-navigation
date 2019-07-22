import { Icon, Button } from "utils/components";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { Menu } from "./Menu";

type withStateProps = {
	is_open: boolean;
};

type ParentProps = {
	setState(obj: any): void;
	id: string;
	parent_id: string;
	template_lock: string | undefined;
	block: import("wordpress__blocks").BlockInstance;
	block_type: import("wordpress__blocks").Block;
	can_move: boolean;
	index: number;
	close: Function;
};

type Props = ParentProps & withStateProps;

const { withState } = wp.compose;

export const ButtonMenu = withState<withStateProps>({
	is_open: false
})((props: Props) => {
	const { setState, is_open } = props;
	const toggle = () => setState({ is_open: !is_open });

	return (
		<Popover
			isOpen={is_open}
			position={"top"}
			onClickOutside={() => setState({ is_open: false })}
			transitionDuration={0.1}
			content={({ position, targetRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					targetRect={targetRect}
					popoverRect={popoverRect}
					arrowColor={"#111"}
					arrowSize={6}
				>
					<Menu {...props} />
				</ArrowContainer>
			)}
		>
			<Button onClick={toggle} classes={["button-toggle_menu", "button-icon"]}>
				<Icon icon="menu" />
			</Button>
		</Popover>
	);
});
