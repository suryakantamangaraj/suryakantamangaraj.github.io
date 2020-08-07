import { environment } from '../../environments/environment';

import { IProject } from './IProject';
import { testUniqueness } from './utils';

import { liveServerData } from './data/live-server.data';
import { LiveSassData } from './data/live-sass.data';
import { CakeShopData } from './data/cake-shop.data';
import { portfoliloData } from './data/portfolio.data';
import { OShopData } from './data/oshop.data';
import { LiveServerWebExtensionData } from './data/live-server-web-extension.data';
import { LargeNumberFactorialData } from './data/large-number-factorial.data';
import { techFestData } from './data/college-tech-fest.data';

const getAllProject = () => {
  const projects = [
    liveServerData,
    LiveSassData,
    portfoliloData,
    OShopData,
    CakeShopData,
    techFestData,
    LiveServerWebExtensionData,
    LargeNumberFactorialData,
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
