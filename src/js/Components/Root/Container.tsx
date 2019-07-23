import { DivRef } from "utils/components";
import { pr_store } from "utils/data/plugin";

type withStateProps = {
	height: number;
};

type withSelectProps = {
	view: ReturnType<Selectors["getView"]>;
	color_scheme: ReturnType<Selectors["getColorScheme"]>;
	moving: ReturnType<Selectors["isMoving"]>;
};

type ParentProps = {
	children: React.ReactNode;
};

type Props = withStateProps &
	withSelectProps &
	ParentProps & { setState(obj: any): void; resize: Function };

const { createRef, Component } = wp.element;
const { compose, withState, withGlobalEvents } = wp.compose;
const { withSelect } = wp.data;

export const Container = compose([
	withGlobalEvents({ resize: "resize" }),
	withState({ height: 555 }),
	withSelect<withSelectProps>(select => ({
		view: select(pr_store).getView(),
		color_scheme: select(pr_store).getColorScheme(),
		moving: select(pr_store).isMoving()
	}))
])(
	class extends Component<Props> {
		private div: React.RefObject<HTMLElement | null>;
		private container: HTMLElement | null;
		private header: HTMLElement | null;

		constructor(props: Props) {
			super(props);

			this.div = createRef();
			this.container = null;
			this.header = null;
		}

		resize = () => {
			const { div, container, header, props } = this;

			if (!div.current || !container) {
				return;
			}

			props.setState({
				height: container.offsetHeight - (header ? header.offsetHeight : 0)
			});
		};

		componentDidMount() {
			const { div, resize } = this;

			if (!div.current) {
				return;
			}

			this.container = div.current.closest(
				".edit-post-sidebar"
			) as HTMLElement | null;

			if (this.container) {
				this.header = this.container.querySelector(
					".edit-post-sidebar-header"
				) as HTMLElement | null;
			}

			resize();
		}

		componentDidUpdate(prev_props: Props) {
			if (!this.container) {
				return;
			}

			const { view } = this.props;

			if (view !== prev_props.view) {
				this.container.scrollTop = 0;
			}
		}

		render() {
			const { children, height, moving, color_scheme } = this.props;
			const [type, value] = color_scheme.split("-");
			const classes = [
				`color_scheme-type-${type}`,
				`color_scheme-name-${value}`,
				moving ? "moving" : "no-moving"
			];

			return (
				<DivRef
					ref={this.div}
					id="container"
					classes={classes}
					style={{ height }}
				>
					{children}
				</DivRef>
			);
		}
	}
);