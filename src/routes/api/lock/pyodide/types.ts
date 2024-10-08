interface Package {
  "name": string;
  "version": string;
  "source": Source;
  "dependencies"?: Dependency[];
  "sdist": Distribution;
  "wheels": Distribution[];
  "optional-dependencies"?: { [key: string]: Dependency[] };
  "metadata"?: Metadata;
}

interface Source {
  registry?: string;
  editable?: string;
}

interface Dependency {
  name: string;
  extra?: string[];
  marker?: string;
}

interface Distribution {
  url: string;
  hash: string;
  size: number;
}

interface Metadata {
  requiresDist: Requirement[];
}

interface Requirement {
  name: string;
  specifier: string;
  marker?: string;
}

export interface LockData {
  "version": number;
  "requires-python": string;
  "resolution-markers": string[];
  "package": Package[];
}

interface Project {
  "name"?: string;
  "version"?: string;
  "dependencies": string[];
  "requires-python"?: string;
}

export interface PyprojectToml {
  project: Project;
}
