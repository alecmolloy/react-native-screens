import type { ScenarioDescription } from '@apps/tests/shared/helpers';

export const scenarioDescription: ScenarioDescription = {
  name: 'Stack Header Selective Updates (iOS)',
  key: 'test-stack-header-selective-updates-ios',
  details:
    'Changing, adding, removing, reordering or resizing one header item leaves the other items in place without a flash, and custom items keep reacting to touches where they are drawn.',
  platforms: ['ios'],
  e2eCoverage: 'incomplete',
  smokeTest: false,
};
