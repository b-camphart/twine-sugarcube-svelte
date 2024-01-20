<script>
	import PassageFooter from "src/special/PassageFooter.svelte";
	import PassageHeader from "src/special/PassageHeader.svelte";
	import UiBar from "src/special/UiBar.svelte";

	/** @type {string} */
	export let title;
	/** @type {import("framework/internal/_story").Passage} */
	export let passage;

</script>

<UiBar></UiBar>
<div
	id="story"
	role="main"
>
	<div id="passages">
		<div
			class="passage"
			data-passage={title}
			id="passage-{title}"
		>
            {#key passage}
			    <PassageHeader />
            {/key}
			<svelte:component this={passage}/>
            {#key passage}
			    <PassageFooter />
            {/key}
		</div>
	</div>
</div>

<style>

	@font-face {
		font-family: 'tme-fa-icons';
		src: url("./tme-fa-icons.woff")
	}
	#story {
		margin: 2.5em;
		margin-right: 1.5em;
		margin-left: 19em;
		transition: margin-left 0.2s ease-in;
	}

	#passages {
		max-width: 54em;
		margin: 0 auto;
	}
	.passage {
		line-height: 1.75;
		text-align: left;
		transition: opacity 0.4s ease-in;
	}
	:global(body) {
		color: #eee;
		background-color: #111;
		overflow: auto;
		margin: 0;
	}
</style>
