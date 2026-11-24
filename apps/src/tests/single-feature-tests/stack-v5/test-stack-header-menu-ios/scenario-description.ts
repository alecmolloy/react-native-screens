import type { ScenarioDescription } from '@apps/tests/shared/helpers';

export const scenarioDescription: ScenarioDescription = {
  name: 'Stack Header Menu (iOS)',
  key: 'test-stack-header-menu-ios',
  details:
    'Tests header item menus and title menu: action items, toggle items, singleSelection, ' +
    'nested menus, menu representation in the overflow menu, and toggle state retention ' +
    'across navigation and header item changes.',
  platforms: ['ios'],
  e2eCoverage: 'incomplete',
  smokeTest: true,
};
