import l, { icons, plugin_namespace_dash, plugin_name } from "./utils";
import Sidebar from "./Components/Sidebar/Sidebar";
import Div from "./Components/Utils/_Html";

const { Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

registerPlugin(plugin_namespace_dash, {
	icon: <Div id="bn-pinned-logo">{icons.logo}</Div>,
	render: () => (
		<Fragment>
			<PluginSidebar name={plugin_namespace_dash} title={plugin_name}>
				<Sidebar />
			</PluginSidebar>
			<PluginSidebarMoreMenuItem target={plugin_namespace_dash}>
				{plugin_name}
			</PluginSidebarMoreMenuItem>
		</Fragment>
	)
});
