<script>
	let stowed = false
</script>

<div id="ui-bar" class:stowed={stowed}>
	<div id="ui-bar-tray">
		<button
			id="ui-bar-toggle"
			tabindex={0}
			title="Toggle the UI bar"
			aria-label="Toggle the UI bar"
			type="button"
			on:click={() => stowed = !stowed}
		>
		</button>
	</div>
</div>

<style>
	#ui-bar {
		background-color: #222;
		border-right: 1px solid #444;
		text-align: center;

		position: fixed;
		z-index: 50;
		top: 0;
		left: 0;
		width: 17.5em;
		height: 100%;
		margin: 0;
		padding: 0;
		transition: left 0.2s ease-in;
	}
	#ui-bar.stowed {
		left: -15.5em;
	}

	#ui-bar-toggle {
		user-select: none;
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		border-right: none;
		padding: 0.3em 0.45em 0.25em;
		font-size: 1.2em;
		line-height: inherit;
		color: #eee;
		background-color: transparent;
		border: 1px solid #444;
	}

	#ui-bar-toggle::before {
		content: "\e81d";
		font-family: tme-fa-icons;
		font-style: normal;
		font-weight: 400;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
	}

	#ui-bar.stowed #ui-bar-toggle::before {
		content: "\e81e";
	}
</style>
