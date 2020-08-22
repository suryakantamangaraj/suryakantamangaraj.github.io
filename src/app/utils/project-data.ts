import { environment } from '../../environments/environment';

import { IProject } from './IProject';
import { testUniqueness } from './utils';

import { PersonalWebData } from './data/personal-web.data';
import { TwoStageClassicalOpAmpData } from './data/two-stage-classical-opamp.data';

const getAllProject = () => {
  const projects = [
    PersonalWebData,
    TwoStageClassicalOpAmpData,
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
