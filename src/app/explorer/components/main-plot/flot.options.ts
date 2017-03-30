export const FLOT_OPTIONS = {
		grid: {
			backgroundColor: "#FFFFFF",
			hoverable: true,
			clickable: true,
		},
		tooltip: true,
		tooltipOpts:{
			content: "<strong>%s</strong> %y.2",
			lines: {
				track: true
			},
			defaultTheme: true
		},
		xaxis:{
			mode:"time",
			timezone: "browser",
			//min: 0,
			//max: 10
		},
		yaxis:{
			//min: 0,
			//max: 10
		},
		yaxes:[
			{
				//axisLabel: "undefineds",
				//axisLabelPadding: 10,
				//show: false
			},
			{
				//axisLabel: "undefineds",
				position: "right",
				//axisLabelPadding: 10,
				//show: false
			}],
		zoom: {
			interactive: true,
		},
		pan:{
			interactive: true,
			cursor: "pointer",
			frameRate: 30,
		},
		crosshair: {
			mode: "xy"
		},
		shadowSize: 1,
		series:{
			lines:{
				show: true,
				fill: false,
				lineWidth: 2,
			}
		},
		legend: {
			split: true
		}
	};