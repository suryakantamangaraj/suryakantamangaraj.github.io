export * from './projects/automated-space-rover.data';
export * from './projects/connected-agriculture.data';
export * from './projects/daq-waqm.data';
export * from './projects/geet.data';
export * from './projects/golem-kit.data';
export * from './projects/ldo-design-smart-power-save.data';
export * from './projects/personal-web.data';
export * from './projects/project-automation.data';
export * from './projects/two-stage-classical-opamp.data';
export * from './projects/virtual-assistant.data';

import { AutomatedSpaceRoverData } from './projects/automated-space-rover.data';
import { ConnectedAgricultureData } from './projects/connected-agriculture.data';
import { DAQWAQMData } from './projects/daq-waqm.data';
import { GeetData } from './projects/geet.data';
import { GolemKitData } from './projects/golem-kit.data';
import { LDODesignSmartPowerSaveData } from './projects/ldo-design-smart-power-save.data';
import { PersonalWebData } from './projects/personal-web.data';
import { ProjectAutomationData } from './projects/project-automation.data';
import { TwoStageClassicalOpAmpData } from './projects/two-stage-classical-opamp.data';
import { VirtualAssistantData } from './projects/virtual-assistant.data';
import { IProject } from '../models/project.interface';

export const ALL_PROJECT_DATA: IProject[] = [
  AutomatedSpaceRoverData,
  ConnectedAgricultureData,
  DAQWAQMData,
  GeetData,
  GolemKitData,
  LDODesignSmartPowerSaveData,
  PersonalWebData,
  ProjectAutomationData,
  TwoStageClassicalOpAmpData,
  VirtualAssistantData
];