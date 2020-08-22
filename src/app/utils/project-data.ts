import { environment } from '../../environments/environment';

import { IProject } from './IProject';
import { testUniqueness } from './utils';

import { PersonalWebData } from './data/personal-web.data';
import { LDODesignSmartPowerSaveData } from './data/ldo-design-smart-power-save.data';
import { TwoStageClassicalOpAmpData } from './data/two-stage-classical-opamp.data';
import { ProjectAutomationData } from './data/project-automation.data';
import {  GolemKitData } from './data/golem-kit.data';
import { DAQWAQMData } from './data/daq-waqm.data';
import { AutomatedSpaceRoverData } from './data/automated-space-rover.data';
import { ConnectedAgricultureData } from './data/connected-agriculture.data';
import { GeetData } from './data/geet.data';
import { VirtualAssistantData } from './data/virtual-assistant.data';

const getAllProject = () => {
  const projects = [
    PersonalWebData,
    LDODesignSmartPowerSaveData,
    TwoStageClassicalOpAmpData,
    ProjectAutomationData,
    GolemKitData,
    DAQWAQMData,
    AutomatedSpaceRoverData,
    ConnectedAgricultureData,
    GeetData,
    VirtualAssistantData,
  ];

  if (!environment.production) {
    const result = testUniqueness(projects, project => project.id);

    if (result.error) {
      const errorLog = [];
      result.duplicates.forEach((project: IProject) => {
        errorLog.push(`Duplicate E-id ${project.id} of ${project.name} `);
      });
      throw new Error(JSON.stringify(errorLog));
    }
  }

  return projects;
};

export const ALL_PROJECT_DATA = getAllProject();
