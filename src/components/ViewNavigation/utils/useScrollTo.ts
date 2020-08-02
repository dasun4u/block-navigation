import { useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

interface Props {
	block_ids: BlockId[];
	$list: HTMLDivElement | null;
}

export const useScrollTo = (props: Props): void => {
	const { block_ids, $list } = props;

	const selected_blocks = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientIds()
	);

	const selected_block = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientId()
	);

	useEffect(() => {
		if (!$list || (!selected_blocks.length && !selected_block)) return;

		const block_index = block_ids.findIndex(id => {
			if (selected_blocks.length) return selected_blocks.includes(id);

			return selected_block === id;
		});

		if (block_index === -1) return;

		const block_height = 52;

		const block_offsetTop = block_height * block_index;

		const is_above = block_offsetTop - $list.scrollTop < 0;

		const is_below =
			block_offsetTop + block_height - $list.scrollTop >
			$list.offsetHeight;

		if (is_above || is_below) {
			$list.scrollTop = block_offsetTop - block_height / 2;
		}
	}, [...selected_blocks, selected_block]);
};