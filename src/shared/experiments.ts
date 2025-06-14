import type { AssertEqual, Equals, Keys, Values, ExperimentId, ProviderSettings } from "@roo-code/types"

export const EXPERIMENT_IDS = {
	AUTOCOMPLETE: "autocomplete",
	POWER_STEERING: "powerSteering",
	AUTO_CONDENSE_CONTEXT: "autoCondenseContext",
} as const satisfies Record<string, ExperimentId>

type _AssertExperimentIds = AssertEqual<Equals<ExperimentId, Values<typeof EXPERIMENT_IDS>>>

type ExperimentKey = Keys<typeof EXPERIMENT_IDS>

interface ExperimentConfig {
	enabled: boolean
}

export const experimentConfigsMap: Record<ExperimentKey, ExperimentConfig> = {
	// start kilocode_change
	AUTOCOMPLETE: { enabled: false },
	POWER_STEERING: { enabled: false },
	AUTO_CONDENSE_CONTEXT: { enabled: false }, // Keep this last, there is a slider below it in the UI
	// end kilocode_change
}

export const experimentDefault = Object.fromEntries(
	Object.entries(experimentConfigsMap).map(([_, config]) => [
		EXPERIMENT_IDS[_ as keyof typeof EXPERIMENT_IDS] as ExperimentId,
		config.enabled,
	]),
) as Record<ExperimentId, boolean>

export const experiments = {
	get: (id: ExperimentKey): ExperimentConfig | undefined => experimentConfigsMap[id],
	isEnabled: (experimentsConfig: Record<ExperimentId, boolean>, id: ExperimentId) =>
		experimentsConfig[id] ?? experimentDefault[id],
} as const
