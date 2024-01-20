<script>
	import Engine from "framework/Engine";

	/** @type {string} */
	export let passage;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a
	data-passage={passage}
	class="link-internal"
	tabIndex={0}
	tabindex={0}
	on:click={() => Engine.play(passage)}
	on:keypress={e => (e.key === "Enter" ? Engine.play(passage) : undefined)}
>
	<slot>{passage}</slot>
</a>

<style>
	a {
		background-color: transparent;
		cursor: pointer;
		color: #68d;
		text-decoration: none;
		-webkit-transition-duration: 0.2s;
		-o-transition-duration: 0.2s;
		transition-duration: 0.2s;
	}
</style>
